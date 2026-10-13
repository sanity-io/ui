/**
 * Compile-time measurements for next-yak 9.10.2.
 *
 *  1. SWC + yak-swc transform of packages/ui-v1/src/button.tsx
 *     - cold, no `.swc` cache: a fresh process has to compile the wasm plugin
 *     - cold, cached: a fresh process loads the compiled wasm from `.swc/plugins`
 *     - warm: repeated transforms in one process (median / p95 of N runs)
 *     - baseline: the same SWC transform without the yak plugin
 *  2. `vite build` of the library and of the consumer app (wall clock, fresh process, median of 3)
 *  3. The record-lookup pitfall: shows the compiler output for a mixin looked up at runtime
 *
 * Run with: node --experimental-strip-types bench/compile-bench.ts
 */
import {transform} from '@swc/core'
import {execFileSync, spawnSync} from 'node:child_process'
import {existsSync, readFileSync, rmSync} from 'node:fs'
import {createRequire} from 'node:module'
import {dirname, resolve} from 'node:path'
import {performance} from 'node:perf_hooks'

const require = createRequire(import.meta.url)
const root = resolve(import.meta.dirname, '..')
const libDir = resolve(root, 'packages/ui-v1')
const buttonPath = resolve(libDir, 'src/button.tsx')
const buttonSource = readFileSync(buttonPath, 'utf8')
const yakSwcWasm = resolve(dirname(require.resolve('yak-swc/package.json')), require('yak-swc/package.json').main)

const yakPlugin = () =>
  [
    yakSwcWasm,
    {
      minify: true,
      basePath: libDir,
      prefix: 'bench_',
      displayNames: false,
      foldStatic: true,
      strictCssProp: true,
      importMode: {value: 'virtual:yak-css:{{__MODULE_PATH__}}.css', transpilation: 'Css', encoding: 'None'},
    },
  ] as [string, Record<string, unknown>]

function swcTransform(source: string, file: string, withYak: boolean) {
  return transform(source, {
    filename: file,
    sourceMaps: false,
    isModule: true,
    jsc: {
      parser: {syntax: 'typescript', tsx: true},
      target: 'es2022',
      transform: {react: {runtime: 'preserve'}},
      experimental: {plugins: withYak ? [yakPlugin()] : []},
      preserveAllComments: true,
    },
  })
}

function stats(samples: number[]) {
  const sorted = [...samples].sort((a, b) => a - b)
  const pick = (q: number) => sorted[Math.min(sorted.length - 1, Math.floor(q * sorted.length))]
  return {median: pick(0.5), p95: pick(0.95), min: sorted[0]}
}

const fmt = (ms: number) => `${ms.toFixed(1)} ms`

async function main() {
  const mode = process.argv[2]
  if (mode === '--child-cold') {
    // One cold transform in a fresh process; print the elapsed time
    const t0 = performance.now()
    await swcTransform(buttonSource, buttonPath, true)
    console.log((performance.now() - t0).toFixed(1))
    return
  }

  console.log('# next-yak compile benchmark\n')
  console.log(`node ${process.version}, yak-swc ${require('yak-swc/package.json').version}, @swc/core ${require('@swc/core/package.json').version}`)
  console.log(`input: packages/ui-v1/src/button.tsx (${buttonSource.length} bytes, 4 styled components, 8 conditional css branches)\n`)

  // 1a. cold without the wasm cache (SWC compiles the wasm plugin on first use)
  const swcCache = resolve(libDir, '.swc')
  const childArgs = ['--experimental-strip-types', import.meta.filename, '--child-cold']
  if (existsSync(swcCache)) rmSync(swcCache, {recursive: true, force: true})
  const coldNoCache = Number(
    execFileSync(process.execPath, childArgs, {cwd: libDir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore']}).trim(),
  )
  // 1b. cold with the wasm cache populated
  const coldCached: number[] = []
  for (let i = 0; i < 3; i++) {
    coldCached.push(
      Number(
        execFileSync(process.execPath, childArgs, {cwd: libDir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore']}).trim(),
      ),
    )
  }
  // 1c. warm, same process
  const warmYak: number[] = []
  const warmPlain: number[] = []
  await swcTransform(buttonSource, buttonPath, true)
  await swcTransform(buttonSource, buttonPath, false)
  for (let i = 0; i < 50; i++) {
    let t0 = performance.now()
    await swcTransform(buttonSource, buttonPath, true)
    warmYak.push(performance.now() - t0)
    t0 = performance.now()
    await swcTransform(buttonSource, buttonPath, false)
    warmPlain.push(performance.now() - t0)
  }
  const y = stats(warmYak)
  const p = stats(warmPlain)
  console.log('## 1. SWC transform of button.tsx\n')
  console.log('| measurement | time |')
  console.log('| --- | --- |')
  console.log(`| cold, fresh process, no .swc wasm cache (first build on a machine) | ${fmt(coldNoCache)} |`)
  console.log(`| cold, fresh process, wasm cache populated (median of 3) | ${fmt(stats(coldCached).median)} |`)
  console.log(`| warm, with yak-swc plugin (median / p95 of 50) | ${fmt(y.median)} / ${fmt(y.p95)} |`)
  console.log(`| warm, same SWC transform without yak-swc (median / p95 of 50) | ${fmt(p.median)} / ${fmt(p.p95)} |`)
  console.log(`| yak-swc plugin overhead per file (median) | ${fmt(y.median - p.median)} |`)
  console.log('\nNote: these numbers exclude the loader side (CSS extraction, cross-file constant resolution, `.yak.ts` worker evaluation), which the Vite build below includes.\n')

  // 2. full builds
  console.log('## 2. `vite build` wall clock (fresh process, median of 3)\n')
  const timeCmd = (cwd: string, args: string[]) => {
    const t0 = performance.now()
    const res = spawnSync('pnpm', args, {cwd, encoding: 'utf8', env: {...process.env, NODE_OPTIONS: '--experimental-strip-types'}})
    if (res.status !== 0) throw new Error(`build failed in ${cwd}: ${res.stderr}`)
    return performance.now() - t0
  }
  const libTimes = [1, 2, 3].map(() => timeCmd(libDir, ['build']))
  const appTimes = [1, 2, 3].map(() => timeCmd(resolve(root, 'app'), ['build']))
  console.log('| build | wall clock |')
  console.log('| --- | --- |')
  console.log(`| library (ui-v1): vite build, lib mode, viteYak + plugin-react, 6 modules | ${fmt(stats(libTimes).median)} |`)
  console.log(`| consumer app: vite build, 2 pages, prebuilt libs, no yak plugin | ${fmt(stats(appTimes).median)} |`)
  console.log('\n(Includes pnpm + Node + Vite startup; see the `✓ built in` line of each build for Vite\'s own number.)\n')

  // 3. pitfall
  console.log('## 3. Pitfall: mixin record looked up at runtime\n')
  const pitfallPath = resolve(root, 'bench/pitfall-record-lookup.tsx')
  const pitfall = await swcTransform(readFileSync(pitfallPath, 'utf8'), pitfallPath, true)
  console.log('```tsx')
  console.log(readFileSync(pitfallPath, 'utf8').trim())
  console.log('```\n\ncompiles (no error, no warning) to:\n\n```js')
  console.log(pitfall.code.trim())
  console.log('```')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
