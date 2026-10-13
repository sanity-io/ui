/* oxlint-disable no-console -- a CLI that prints the metrics */
/**
 * Collects the metrics quoted in the report and writes results/metrics.json.
 *
 *   pnpm bench        (after `pnpm build` at the workspace root)
 */
import {execFileSync, spawnSync} from 'node:child_process'
import {mkdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {performance} from 'node:perf_hooks'
import {fileURLToPath} from 'node:url'
import {brotliCompressSync, gzipSync} from 'node:zlib'

import {transformSync} from '@griffel/transform'
import {createResolverFactory} from '@griffel/vite-plugin'
import {build as rolldownBuild} from 'rolldown'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const results = {generatedAt: new Date().toISOString(), node: process.version}

const median = (values) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)]
const sizes = (text) => {
  const buffer = Buffer.from(text)
  return {
    raw: buffer.length,
    gzip: gzipSync(buffer, {level: 9}).length,
    brotli: brotliCompressSync(buffer).length,
  }
}
const ms = (value) => `${value.toFixed(1)} ms`

// ── 1. @griffel/transform on Button.tsx: cold (fresh process, first call) and warm ──

const buttonFile = join(root, 'button/src/Button.tsx')
const buttonSource = readFileSync(buttonFile, 'utf8')

if (process.argv.includes('--cold-transform')) {
  const start = performance.now()
  const resolveModule = createResolverFactory()({})
  transformSync(buttonSource, {filename: buttonFile, resolveModule})
  process.stdout.write(String(performance.now() - start))
  process.exit(0)
}

function coldTransform() {
  // A fresh process: includes loading oxc-parser's native binding and @griffel/core
  const start = performance.now()
  const inner = Number(
    execFileSync(process.execPath, [fileURLToPath(import.meta.url), '--cold-transform'], {
      cwd: here,
    }),
  )
  return {processMs: performance.now() - start, firstCallMs: inner}
}

function warmTransform(iterations = 50) {
  const resolveModule = createResolverFactory()({})
  const samples = []
  for (let i = 0; i < iterations; i++) {
    const start = performance.now()
    transformSync(buttonSource, {filename: buttonFile, resolveModule})
    samples.push(performance.now() - start)
  }
  return {medianMs: median(samples), minMs: Math.min(...samples), iterations}
}

const cold = [coldTransform(), coldTransform(), coldTransform()]
results.transform = {
  file: 'button/src/Button.tsx (4 style calls, 1 reset, imports tokens from ./theme → VM evaluation)',
  coldFirstCallMs: median(cold.map((c) => c.firstCallMs)),
  coldProcessMs: median(cold.map((c) => c.processMs)),
  warm: warmTransform(),
}

// ── 2. Library build (tsdown + plugin) and app build (Vite): cold = fresh process after clean ──

function timed(command, args, cwd) {
  const start = performance.now()
  const run = spawnSync(command, args, {cwd, encoding: 'utf8'})
  if (run.status !== 0)
    throw new Error(`${command} ${args.join(' ')} failed:\n${run.stdout}\n${run.stderr}`)
  return {ms: performance.now() - start, output: run.stdout + run.stderr}
}

function buildTimes(cwd, args, runs = 3, clean = []) {
  const samples = []
  let output = ''
  for (let i = 0; i < runs; i++) {
    for (const dir of clean) rmSync(join(cwd, dir), {recursive: true, force: true})
    const run = timed('pnpm', ['exec', ...args], cwd)
    samples.push(run.ms)
    output = run.output
  }
  return {medianMs: median(samples), samples, output}
}

const tsdownV1 = buildTimes(join(root, 'button'), ['tsdown'], 3, ['dist'])
const tsdownV1Warm = buildTimes(join(root, 'button'), ['tsdown'], 3)
const tsdownV2 = buildTimes(join(root, 'button-v2'), ['tsdown'], 3, ['dist'])
const viteRuntime = buildTimes(join(root, 'app'), ['vite', 'build'], 3, ['dist'])
const viteExtract = buildTimes(
  join(root, 'app'),
  ['vite', 'build', '--config', 'vite.extract.config.ts'],
  3,
  ['dist-extract'],
)
const griffelStats = viteExtract.output.match(/\[Griffel\] Transform: .*/)?.[0] ?? ''
const griffelFiles = viteExtract.output.match(/\[Griffel\] (\d+) files processed/)?.[1] ?? ''

results.builds = {
  'tsdown button v1 (clean dist, fresh process)': tsdownV1.medianMs,
  'tsdown button v1 (dist present, fresh process)': tsdownV1Warm.medianMs,
  'tsdown button v2 incl. bundling the Griffel runtime (clean)': tsdownV2.medianMs,
  'vite build app, runtime mode (no plugin)': viteRuntime.medianMs,
  'vite build app, @griffel/vite-plugin extraction': viteExtract.medianMs,
  'vitePluginStats': `${griffelFiles} files — ${griffelStats}`,
  'note': 'Wall-clock of the whole CLI process (node start, config load, bundling, d.ts emit). tsdown has no persistent cache, so "warm" only differs by the OS file cache.',
}

// ── 3. CSS size: what the libraries emit, and what the page actually carries ──

const v1Css = readFileSync(join(root, 'button/dist/styles.css'), 'utf8')
const v2Css = readFileSync(join(root, 'button-v2/dist/styles.css'), 'utf8')
const rulesOf = (css) => css.match(/[^{}]+\{[^{}]*\}|@media[^{]+\{(?:[^{}]+\{[^{}]*\})+\}/g) ?? []
const union = [...new Set([...rulesOf(v1Css), ...rulesOf(v2Css)])].join('')

results.css = {
  'button v1 dist/styles.css': {...sizes(v1Css), rules: rulesOf(v1Css).length},
  'button v2 dist/styles.css': {...sizes(v2Css), rules: rulesOf(v2Css).length},
  'v1 ∪ v2 deduplicated (what two versions on one page insert)': {
    ...sizes(union),
    rules: rulesOf(union).length,
  },
  'note': 'Atomic CSS grows with distinct declarations, not with components: a second version only adds the rules whose declarations changed.',
}

// ── 4. Runtime JS size (minified, production, react external) ──

async function bundleSize(label, source, extraExternal = []) {
  const virtualId = '\0bench-entry'
  const bundle = await rolldownBuild({
    input: 'bench-entry',
    platform: 'browser',
    external: [/^react($|\/)/, /^react-dom($|\/)/, ...extraExternal],
    plugins: [
      {
        name: 'bench-entry',
        resolveId: (id) => (id === 'bench-entry' ? virtualId : null),
        load: (id) => (id === virtualId ? source : null),
      },
    ],
    output: {minify: true, format: 'esm'},
    write: false,
    logLevel: 'silent',
  })
  const code = bundle.output
    .filter((o) => o.type === 'chunk')
    .map((o) => o.code)
    .join('')
  return [label, sizes(code)]
}

results.runtime = Object.fromEntries(
  await Promise.all([
    bundleSize(
      '@griffel/react — full (makeStyles at runtime: stylis, rtl-css-js, hashing)',
      `export * from '@griffel/react'`,
    ),
    bundleSize(
      '@griffel/react — what precompiled (__styles) libraries need',
      `export {__styles, __resetStyles, __staticStyles, mergeClasses, createDOMRenderer, RendererProvider, TextDirectionProvider, renderToStyleElements} from '@griffel/react'`,
    ),
    bundleSize(
      '@griffel/react — extracted mode (__css, no DOM insertion)',
      `export {__css, __resetCSS, __staticCSS, mergeClasses, TextDirectionProvider} from '@griffel/react'`,
    ),
    bundleSize(
      '@compiled/react/runtime (ax, CC/CS style insertion)',
      `export * from '@compiled/react/runtime'`,
    ),
    bundleSize('@compiled/react — full', `export * from '@compiled/react'`),
    bundleSize(
      'styled-components 6 (current @sanity/ui runtime, baseline)',
      `export * from 'styled-components'`,
      [/^react-is/, /^stylis$/],
    ),
    bundleSize(
      '@vanilla-extract/dynamic (current, for inline vars)',
      `export * from '@vanilla-extract/dynamic'`,
    ),
  ]),
)
results.runtime.note =
  'rolldown (platform: browser, which defines NODE_ENV=production), minify, react/react-dom external (styled-components additionally has react-is and stylis external, which it ships with — its real cost is higher).'

results.libraryOutput = {
  'button v1 dist/index.js (Griffel runtime external)': sizes(
    readFileSync(join(root, 'button/dist/index.js'), 'utf8'),
  ),
  'button v2 dist/index.js (Griffel runtime bundled)': sizes(
    readFileSync(join(root, 'button-v2/dist/index.js'), 'utf8'),
  ),
}

// ── write + print ──

mkdirSync(join(here, 'results'), {recursive: true})
writeFileSync(join(here, 'results/metrics.json'), JSON.stringify(results, null, 2))

const fmt = (s) => `${s.raw} B raw / ${s.gzip} B gzip / ${s.brotli} B brotli`
console.log(
  `\n@griffel/transform on Button.tsx: cold first call ${ms(results.transform.coldFirstCallMs)} (process total ${ms(results.transform.coldProcessMs)}), warm median ${ms(results.transform.warm.medianMs)} (min ${ms(results.transform.warm.minMs)}, n=${results.transform.warm.iterations})`,
)
console.log('\nBuilds (median of 3, wall-clock):')
for (const [k, v] of Object.entries(results.builds))
  if (typeof v === 'number') console.log(`  ${k}: ${ms(v)}`)
console.log(`  ${results.builds.vitePluginStats}`)
console.log('\nCSS:')
for (const [k, v] of Object.entries(results.css))
  if (typeof v === 'object') console.log(`  ${k}: ${fmt(v)} (${v.rules} rules)`)
console.log('\nRuntime JS:')
for (const [k, v] of Object.entries(results.runtime))
  if (typeof v === 'object') console.log(`  ${k}: ${fmt(v)}`)
console.log('\nLibrary output:')
for (const [k, v] of Object.entries(results.libraryOutput)) console.log(`  ${k}: ${fmt(v)}`)
