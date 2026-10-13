/**
 * Collects the numbers for the evaluation report:
 *   1. library build time (tsdown + @wyw-in-js/rollup), fresh process per run
 *   2. in-process wyw-in-js `transform()` timings: cold, warm (unchanged), incremental (edited)
 *   3. CSS / JS output sizes per flavor (raw, gzip, brotli), v1 and v2
 *   4. size of the runtime a consumer ships (@linaria/react styled + @linaria/core cx)
 *   5. tsc type-safety probes
 *
 * Usage: node scripts/measure.mjs   (expects `pnpm install` and built libraries)
 */
import {execFileSync, spawnSync} from 'node:child_process'
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs'
import {createRequire} from 'node:module'
import {dirname, resolve} from 'node:path'
import {performance} from 'node:perf_hooks'
import {fileURLToPath} from 'node:url'
import {brotliCompressSync, gzipSync} from 'node:zlib'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const lib = resolve(root, 'button-lib')
const require = createRequire(resolve(lib, 'package.json'))
const {transform, TransformCacheCollection, disposeEvalBroker} = await import(
  require.resolve('@wyw-in-js/transform')
)
const {asyncResolveFallback} = await import(require.resolve('@wyw-in-js/shared'))
const {rolldown} = await import('rolldown')

const results = {node: process.version, versions: {}}
for (const p of ['@linaria/core', '@linaria/react', '@linaria/atomic', '@wyw-in-js/transform', '@wyw-in-js/rollup', 'tsdown', 'typescript']) {
  // some packages do not export ./package.json; read it from the resolved entry's package dir
  const entry = require.resolve(p)
  const pkgDir = entry.slice(0, entry.lastIndexOf(`/node_modules/${p}/`) + `/node_modules/${p}/`.length)
  results.versions[p] = JSON.parse(readFileSync(resolve(pkgDir, 'package.json'), 'utf8')).version
}

const ms = (n) => Math.round(n * 10) / 10
const median = (xs) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)]
const sizes = (buf) => ({raw: buf.length, gzip: gzipSync(buf, {level: 9}).length, brotli: brotliCompressSync(buf).length})

// 1. process-level builds -----------------------------------------------------
function timeBuild(env, runs = 5) {
  const times = []
  for (let i = 0; i < runs; i++) {
    const start = performance.now()
    const res = spawnSync('pnpm', ['exec', 'tsdown'], {cwd: lib, env: {...process.env, ...env}, encoding: 'utf8', timeout: 60_000})
    if (res.status !== 0) throw new Error(`tsdown failed: ${res.stderr || res.stdout}`)
    times.push(performance.now() - start)
  }
  const reported = /Build complete in (\d+)ms/
  return {runs, wallMedianMs: ms(median(times)), wallMinMs: ms(Math.min(...times))}
}
results.build = {
  'default (js+css+dts)': timeBuild({WYW_FLAVOR: 'default', OUT_DIR: '/tmp/css-eval-measure/default'}),
  'default (js+css, no dts)': timeBuild({WYW_FLAVOR: 'default', OUT_DIR: '/tmp/css-eval-measure/default-nodts', NO_DTS: '1'}),
  'atomic (js+css, no dts)': timeBuild({WYW_FLAVOR: 'atomic', OUT_DIR: '/tmp/css-eval-measure/atomic-nodts', NO_DTS: '1'}),
}
console.log('build (fresh process per run):', results.build)

// 2. in-process wyw transform --------------------------------------------------
const buttonPath = resolve(lib, 'src/Button.tsx')
const buttonCode = readFileSync(buttonPath, 'utf8')
async function runTransform(cache, code) {
  const start = performance.now()
  const out = await transform(
    {options: {filename: buttonPath, root: lib, pluginOptions: {}}, cache},
    code,
    asyncResolveFallback,
  )
  return {ms: ms(performance.now() - start), cssBytes: out.cssText?.length ?? 0}
}
{
  const cache = new TransformCacheCollection()
  const cold = await runTransform(cache, buttonCode)
  const warm = await runTransform(cache, buttonCode)
  const edited = buttonCode.replace('font-weight: 600;', 'font-weight: 500;')
  const incremental = await runTransform(cache, edited)
  const incremental2 = await runTransform(cache, edited.replace('line-height: 1.2;', 'line-height: 1.3;'))
  const freshCache = new TransformCacheCollection()
  const secondCold = await runTransform(freshCache, buttonCode)
  results.transform = {
    'cold (new process state, first file, spawns eval broker)': cold,
    'warm (same cache, unchanged file)': warm,
    'incremental (same cache, one declaration edited)': incremental,
    'incremental (second edit)': incremental2,
    'cold cache, warm process (new TransformCacheCollection, broker alive)': secondCold,
  }
  disposeEvalBroker(cache)
  disposeEvalBroker(freshCache)
}
console.log('in-process transform of src/Button.tsx:', results.transform)

// 3. output sizes --------------------------------------------------------------
results.output = {}
for (const pkg of ['button-lib', 'button-lib-v2']) {
  for (const flavor of ['default', 'namespaced', 'atomic']) {
    const dir = resolve(root, pkg, 'dist', flavor)
    results.output[`${pkg}/${flavor}`] = {
      css: sizes(readFileSync(resolve(dir, 'style.css'))),
      js: sizes(readFileSync(resolve(dir, 'index.js'))),
    }
  }
}
console.log('output sizes:', results.output)

// 4. runtime a consumer ships --------------------------------------------------
async function bundleSize(label, entryCode, external) {
  const bundle = await rolldown({
    input: 'entry',
    cwd: lib,
    external,
    plugins: [
      {
        name: 'virtual-entry',
        resolveId: (id) => (id === 'entry' ? id : null),
        load: (id) => (id === 'entry' ? entryCode : null),
      },
    ],
    transform: {define: {'process.env.NODE_ENV': '"production"'}},
  })
  const {output} = await bundle.generate({format: 'esm', minify: true})
  await bundle.close()
  const code = Buffer.from(output.map((c) => c.code ?? '').join(''))
  return {label, ...sizes(code)}
}
results.runtime = [
  await bundleSize('@linaria/core (css + cx)', "export {css, cx} from '@linaria/core'", ['react']),
  await bundleSize('@linaria/react (styled) + @linaria/core (cx)', "export {styled} from '@linaria/react'; export {cx} from '@linaria/core'", ['react']),
  await bundleSize('@linaria/react styled only (deps bundled)', "export {styled} from '@linaria/react'", ['react']),
]
console.log('runtime bundle (minified, react external):', results.runtime)

// 5. type-safety probes ---------------------------------------------------------
function tsc(project) {
  const res = spawnSync('pnpm', ['exec', 'tsc', '-p', project], {cwd: lib, encoding: 'utf8'})
  return {exitCode: res.status, output: (res.stdout + res.stderr).trim()}
}
results.typeSafety = {
  'caught.tsx (5 misuses, all must error → tsc exit 0)': tsc('tsconfig.json'),
  'not-caught.tsx (4 CSS-level typos compile → 4× TS2578)': tsc('typecheck/tsconfig.not-caught.json'),
}
console.log('type safety:', results.typeSafety)

mkdirSync(resolve(root, 'results'), {recursive: true})
writeFileSync(resolve(root, 'results/metrics.json'), JSON.stringify(results, null, 2) + '\n')
console.log(`\nwritten to results/metrics.json`)
execFileSync('rm', ['-rf', '/tmp/css-eval-measure'])
