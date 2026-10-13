/**
 * Renders v1.0.0 and v2.0.0 of the Button library on one page (both
 * stylesheets loaded, v1 first) for each build flavor and checks that every
 * button is styled by its *own* version. A mismatch means a class name was
 * shared by the two versions with different rules — the SAPP-4639 failure.
 *
 * Usage: node tests/collisions.mjs   (expects `vite build` to have run)
 */
import {spawn} from 'node:child_process'
import {mkdirSync, writeFileSync} from 'node:fs'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

import {chromium} from 'playwright'

const here = dirname(fileURLToPath(import.meta.url))
const resultsDir = resolve(here, '../../results')
const artifactsDir = process.env.ARTIFACTS_DIR
const flavors = ['default', 'namespaced', 'atomic']
const port = 4173

const rgb = (hex) => {
  const n = parseInt(hex.slice(1), 16)
  return `rgb(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255})`
}
const transparent = 'rgba(0, 0, 0, 0)'

const v1 = {
  radius: '6px',
  tones: {
    default: {bg: rgb('#f0f2f5'), text: rgb('#1f2430')},
    primary: {bg: rgb('#2276fc'), text: rgb('#1a5fd0')},
    positive: {bg: rgb('#3ab667'), text: rgb('#1f7a40')},
    caution: {bg: rgb('#fbd024'), text: rgb('#8a6d00')},
    critical: {bg: rgb('#f03e2f'), text: rgb('#b4261a')},
  },
}
const v2 = {
  radius: '999px',
  tones: {
    default: {bg: rgb('#f0f2f5'), text: rgb('#1f2430')},
    brand: {bg: rgb('#f03e2f'), text: rgb('#b4261a')},
    primary: {bg: rgb('#7c3aed'), text: rgb('#6d28d9')},
    positive: {bg: rgb('#3ab667'), text: rgb('#1f7a40')},
    caution: {bg: rgb('#fbd024'), text: rgb('#8a6d00')},
    critical: {bg: rgb('#f03e2f'), text: rgb('#b4261a')},
  },
}

function expectations(id, spec) {
  const checks = []
  for (const [tone, colors] of Object.entries(spec.tones)) {
    checks.push({testId: `${id}-${tone}-default`, prop: 'background-color', expected: colors.bg})
    checks.push({testId: `${id}-${tone}-default`, prop: 'border-radius', expected: spec.radius})
    checks.push({testId: `${id}-${tone}-ghost`, prop: 'background-color', expected: transparent})
    checks.push({testId: `${id}-${tone}-ghost`, prop: 'color', expected: colors.text})
    // bleed sets `--sui-button-border: transparent`; the inset ring stays but is invisible
    checks.push({
      testId: `${id}-${tone}-bleed`,
      prop: 'box-shadow',
      expected: 'rgba(0, 0, 0, 0) 0px 0px 0px 1px inset',
    })
  }
  checks.push({testId: `${id}-dynamic`, prop: 'min-width', expected: '160px'})
  checks.push({testId: `${id}-disabled`, prop: 'opacity', expected: '0.4'})
  return checks
}

async function waitForServer(url, tries = 50) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url)
      if (res.ok) return
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 200))
  }
  throw new Error(`preview server did not start at ${url}`)
}

async function main() {
  mkdirSync(resultsDir, {recursive: true})
  if (artifactsDir) mkdirSync(artifactsDir, {recursive: true})

  const server = spawn('pnpm', ['exec', 'vite', 'preview', '--port', String(port), '--strictPort'], {
    cwd: resolve(here, '..'),
    stdio: 'ignore',
  })
  const browser = await chromium.launch()
  const summary = {}
  let safeFlavorFailed = false

  try {
    await waitForServer(`http://localhost:${port}/index.html`)
    const page = await browser.newPage({viewport: {width: 1400, height: 900}})

    for (const flavor of flavors) {
      await page.goto(`http://localhost:${port}/${flavor}.html`)
      await page.getByTestId('v2-critical-bleed').waitFor()

      const checks = [...expectations('v1', v1), ...expectations('v2', v2)]
      const mismatches = []
      for (const check of checks) {
        const actual = await page
          .getByTestId(check.testId)
          .evaluate((el, prop) => getComputedStyle(el).getPropertyValue(prop), check.prop)
        if (actual !== check.expected) {
          mismatches.push({...check, actual})
        }
      }

      // Selectors that occur more than once in the page's stylesheets (the
      // bundler may already have merged byte-identical rules): a repeated
      // selector with different declarations is a live collision.
      const sharedSelectors = await page.evaluate(() => {
        const bySelector = new Map()
        for (const sheet of document.styleSheets) {
          for (const rule of sheet.cssRules) {
            if (!(rule instanceof CSSStyleRule)) continue
            const list = bySelector.get(rule.selectorText) ?? []
            list.push(rule.style.cssText)
            bySelector.set(rule.selectorText, list)
          }
        }
        const conflicting = []
        let identical = 0
        for (const [selector, rules] of bySelector) {
          const unique = new Set(rules)
          if (rules.length > 1 && unique.size > 1) conflicting.push(selector)
          else if (rules.length > 1) identical++
        }
        return {selectors: bySelector.size, conflicting, identical}
      })

      const screenshot = `${flavor}.png`
      await page.screenshot({path: resolve(resultsDir, screenshot), fullPage: true})
      if (artifactsDir) {
        await page.screenshot({path: resolve(artifactsDir, `linaria-${screenshot}`), fullPage: true})
      }

      const ok = mismatches.length === 0
      if (!ok && flavor !== 'default') safeFlavorFailed = true
      summary[flavor] = {
        checks: checks.length,
        mismatches,
        sharedSelectors,
        v1RendersCorrectly: !mismatches.some((m) => m.testId.startsWith('v1-')),
        v2RendersCorrectly: !mismatches.some((m) => m.testId.startsWith('v2-')),
      }

      console.log(`\n== flavor: ${flavor} ==`)
      console.log(
        `  ${checks.length} computed-style checks, ${mismatches.length} mismatches; ` +
          `${sharedSelectors.selectors} selectors on page, ${sharedSelectors.conflicting.length} repeated with CONFLICTING declarations` +
          `${sharedSelectors.conflicting.length ? ` (${sharedSelectors.conflicting.join(', ')})` : ''}, ` +
          `${sharedSelectors.identical} repeated with identical declarations`,
      )
      for (const m of mismatches) {
        console.log(`  ✗ ${m.testId} ${m.prop}: expected ${m.expected}, got ${m.actual}`)
      }
      if (ok) console.log('  ✓ every button is styled by its own version')
    }
  } finally {
    await browser.close()
    server.kill()
  }

  writeFileSync(resolve(resultsDir, 'browser-results.json'), JSON.stringify(summary, null, 2) + '\n')
  console.log(`\nresults written to ${resolve(resultsDir, 'browser-results.json')}`)
  if (safeFlavorFailed) {
    console.error('\nFAIL: a flavor that is supposed to be collision-free rendered incorrectly')
    process.exit(1)
  }
  if (summary.default.mismatches.length === 0) {
    console.log('\nnote: the default flavor did NOT collide in this run (expected it to)')
  }
}

await main()
