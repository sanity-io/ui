/* eslint-disable no-console, no-await-in-loop, no-unmodified-loop-condition --
 * CLI extractor. `console.log` *is* the output channel; `await` inside the
 * route/run loops is intentional (parallelising would corrupt the perf
 * timings via resource contention); the `sawFinal` loop condition is
 * mutated by the page.on('console') event handler, not in the loop body.
 */

/**
 * Extract React Profiler perf results from each codebase (route) and component.
 *
 * Each page (?route=ui3 | ui4 | ui5) mounts `count` copies of every component
 * wrapped in a <Profiler> that console.logs { id, phase, actualDuration,
 * baseDuration, ... }. This script loads each route in a real browser, collects
 * those entries, and writes a structured per-codebase / per-component report.
 *
 * React's <Profiler onRender> only reports timings in a dev build (it is disabled
 * in production), so this drives the vite DEV server.
 *
 * Usage:
 *   npm run perf:extract            # starts a dev server, measures every route
 *   PERF_BASE_URL=http://localhost:5174 npm run perf:extract            # use a running dev server
 *   PERF_RUNS=3 npm run perf:extract                                    # median of N runs
 */
import {writeFile, mkdir} from 'node:fs/promises'
import {resolve, dirname} from 'node:path'
import {fileURLToPath} from 'node:url'

import {chromium} from 'playwright'
import {createServer} from 'vite'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = resolve(ROOT, 'perf-results')
const PORT = 4190
const RUNS = Number(process.env.PERF_RUNS || 1)
const ROUTES = ['ui3', 'ui4', 'ui5']
const FINAL_ID = 'Composition' // the last <Profiler> on every page
const PAGE_TIMEOUT = 120_000

const median = (xs) => {
  const s = [...xs].filter((v) => v != null).sort((a, b) => a - b)
  if (!s.length) return null
  const m = Math.floor(s.length / 2)
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2
}
const round = (v) => (v == null ? null : Math.round(v * 100) / 100)

/** Load one route once; return { component: { actualDuration, baseDuration } }. */
async function measureRoute(browser, baseUrl, route) {
  const page = await browser.newPage()
  const entries = new Map() // id -> { actualDuration, baseDuration } (first mount)
  let sawFinal = false

  page.on('console', (msg) => {
    let data
    try {
      data = JSON.parse(msg.text())
    } catch {
      return // not a Profiler JSON line
    }
    if (!data || data.phase !== 'mount' || typeof data.id !== 'string') return
    if (!entries.has(data.id)) {
      entries.set(data.id, {
        actualDuration: data.actualDuration,
        baseDuration: data.baseDuration,
      })
    }
    if (data.id === FINAL_ID) sawFinal = true
  })

  await page.goto(`${baseUrl}/?route=${route}`, {waitUntil: 'commit', timeout: PAGE_TIMEOUT})
  // Wait until the final Profiler (the whole-tree "Composition") has reported.
  const start = Date.now()
  while (!sawFinal && Date.now() - start < PAGE_TIMEOUT) {
    await new Promise((r) => setTimeout(r, 200))
  }
  await new Promise((r) => setTimeout(r, 300)) // let any trailing entries flush
  await page.close()
  if (!sawFinal) console.warn(`  ⚠ ${route}: did not see "${FINAL_ID}" before timeout`)
  return Object.fromEntries(entries)
}

async function main() {
  // Run the vite DEV server in-process. React's <Profiler onRender> is disabled
  // in production builds, so the timings only exist in dev. PERF_BASE_URL points
  // the extractor at an already-running dev server instead.
  let server = null
  let baseUrl = process.env.PERF_BASE_URL
  if (!baseUrl) {
    console.log('Starting dev server…')
    server = await createServer({
      root: ROOT,
      server: {port: PORT, strictPort: true, host: 'localhost'},
      logLevel: 'error',
    })
    await server.listen()
    baseUrl = server.resolvedUrls.local[0].replace(/\/$/, '')
  }

  try {
    const browser = await chromium.launch()

    // route -> component -> [actualDuration samples], [baseDuration samples]
    const samples = {}
    for (let run = 1; run <= RUNS; run++) {
      for (const route of ROUTES) {
        process.stdout.write(`Run ${run}/${RUNS} · ${route}… `)
        const result = await measureRoute(browser, baseUrl, route)
        samples[route] ??= {}
        for (const [comp, m] of Object.entries(result)) {
          const slot = (samples[route][comp] ??= {actual: [], base: []})
          slot.actual.push(m.actualDuration)
          slot.base.push(m.baseDuration)
        }
        console.log(`${Object.keys(result).length} components`)
      }
    }
    await browser.close()

    // Reduce to medians.
    const codebases = {}
    for (const route of ROUTES) {
      codebases[route] = {}
      for (const [comp, s] of Object.entries(samples[route] ?? {})) {
        const actual = round(median(s.actual))
        codebases[route][comp] = {
          actualDuration: actual,
          baseDuration: round(median(s.base)),
          perComponentMs: round((actual ?? 0) / 5000),
        }
      }
    }

    const report = {
      generatedAt: new Date().toISOString(),
      runs: RUNS,
      instancesPerComponent: 5000,
      codebases,
    }
    await mkdir(OUT_DIR, {recursive: true})
    await writeFile(resolve(OUT_DIR, 'latest.json'), JSON.stringify(report, null, 2))
    await writeFile(resolve(OUT_DIR, 'PERF.md'), toMarkdown(report))
    console.log('\n' + toMarkdown(report))
    console.log(`Wrote perf-results/latest.json and perf-results/PERF.md`)
  } finally {
    if (server) await server.close()
  }
}

function toMarkdown(report) {
  const routes = Object.keys(report.codebases)
  const comps = []
  for (const r of routes)
    for (const c of Object.keys(report.codebases[r])) if (!comps.includes(c)) comps.push(c)

  const lines = [
    '# Component perf — mount duration by codebase',
    '',
    `Generated ${report.generatedAt}. Median of ${report.runs} run(s), ${report.instancesPerComponent} instances per component. Values are React Profiler \`actualDuration\` (ms), measured in a **dev** build (Profiler is disabled in production) — treat as relative, not absolute.`,
    '',
    `| Component | ${routes.join(' | ')} |`,
    `| --- | ${routes.map(() => '---:').join(' | ')} |`,
  ]
  for (const c of comps) {
    const cells = routes.map((r) => report.codebases[r][c]?.actualDuration ?? '—')
    lines.push(`| ${c} | ${cells.join(' | ')} |`)
  }
  return lines.join('\n')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
