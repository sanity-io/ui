/**
 * Compile-time measurements:
 *  - library build (tsdown + @sanity/tsdown-config + @stylexjs/unplugin): cold
 *    process runs, with and without the StyleX compiler, and warm in-process
 *    rebuilds
 *  - consumer app build (Vite 8 + @stylexjs/unplugin): cold process runs and
 *    warm in-process rebuilds
 *  - per-file transform cost of @stylexjs/babel-plugin vs the Rust port
 *    @stylexswc/rs-compiler (cold first call, then warm mean)
 */
import {spawnSync} from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

import {transformSync} from '@babel/core'
import stylexPlugin from '@stylexjs/babel-plugin'
import {transform as rsTransform} from '@stylexswc/rs-compiler'

import {LIB_DIRS} from './build-libs.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const RUNS = Number(process.env.BENCH_RUNS ?? 3)
const libDir = LIB_DIRS[0]

const median = (xs) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)]
const ms = (x) => `${x.toFixed(0)} ms`
const results = {node: process.version, runs: RUNS}

function spawnTimed(cmd, args, cwd, env = {}, {allowPublintFailure = false} = {}) {
  const started = performance.now()
  const r = spawnSync(cmd, args, {cwd, stdio: 'pipe', env: {...process.env, NODE_ENV: 'production', ...env}})
  const elapsed = performance.now() - started
  // oxlint-disable-next-line no-control-regex
  const out = (String(r.stdout) + String(r.stderr)).replace(/\u001b\[[0-9;]*m/g, '')
  // the no-StyleX baseline emits no CSS, so publint fails after the build completed
  const tolerated = allowPublintFailure && out.includes('Build complete') && out.includes('[publint]')
  if (r.status !== 0 && !tolerated) throw new Error(`${cmd} ${args.join(' ')} failed:\n${out}`)
  return elapsed
}

// ---------------------------------------------------------------------------
console.log(`\n# Library build — tsdown CLI, cold process (${RUNS} runs each)`)
const tsdownBin = path.join(root, 'node_modules', '.bin', 'tsdown')
const libCold = Array.from({length: RUNS}, () => spawnTimed(tsdownBin, [], libDir))
const libColdNoStylex = Array.from({length: RUNS}, () =>
  spawnTimed(tsdownBin, [], libDir, {STYLEX_EVAL_NO_STYLEX: '1'}, {allowPublintFailure: true}),
)
console.log(`with StyleX    : ${libCold.map(ms).join(', ')} → median ${ms(median(libCold))}`)
console.log(`without StyleX : ${libColdNoStylex.map(ms).join(', ')} → median ${ms(median(libColdNoStylex))}`)
results.libraryBuildCold = {
  withStylexMs: libCold,
  withoutStylexMs: libColdNoStylex,
  medianWithMs: median(libCold),
  medianWithoutMs: median(libColdNoStylex),
}
// restore the real output
spawnTimed(tsdownBin, [], libDir)

// ---------------------------------------------------------------------------
console.log(`\n# Library build — tsdown API, warm (same process, repeated)`)
{
  const {build} = await import('tsdown')
  const prevCwd = process.cwd()
  process.chdir(libDir)
  const times = []
  for (let i = 0; i < RUNS + 1; i++) {
    const started = performance.now()
    await build({config: path.join(libDir, 'tsdown.config.ts'), logLevel: 'silent', publint: false})
    times.push(performance.now() - started)
  }
  process.chdir(prevCwd)
  console.log(`first in-process: ${ms(times[0])}; warm: ${times.slice(1).map(ms).join(', ')} → median ${ms(median(times.slice(1)))}`)
  results.libraryBuildWarm = {firstMs: times[0], warmMs: times.slice(1), medianWarmMs: median(times.slice(1))}
}

// ---------------------------------------------------------------------------
console.log(`\n# App build — vite build, cold process (${RUNS} runs)`)
const viteBin = path.join(root, 'node_modules', '.bin', 'vite')
const appCold = Array.from({length: RUNS}, () => spawnTimed(viteBin, ['build', 'app'], root))
console.log(`${appCold.map(ms).join(', ')} → median ${ms(median(appCold))}`)
results.appBuildCold = {runsMs: appCold, medianMs: median(appCold)}

console.log(`\n# App build — vite API, warm (same process, repeated)`)
{
  const {build} = await import('vite')
  const times = []
  for (let i = 0; i < RUNS + 1; i++) {
    const started = performance.now()
    await build({root: path.join(root, 'app'), logLevel: 'silent', configFile: path.join(root, 'app', 'vite.config.ts')})
    times.push(performance.now() - started)
  }
  console.log(`first in-process: ${ms(times[0])}; warm: ${times.slice(1).map(ms).join(', ')} → median ${ms(median(times.slice(1)))}`)
  results.appBuildWarm = {firstMs: times[0], warmMs: times.slice(1), medianWarmMs: median(times.slice(1))}
}

// ---------------------------------------------------------------------------
console.log(`\n# Per-file transform — @stylexjs/babel-plugin vs @stylexswc/rs-compiler`)
const files = ['src/button.tsx', 'src/theme.ts', 'src/tokens.stylex.ts']
const WARM_ITERATIONS = 50
const moduleResolution = {type: 'commonJS', rootDir: libDir}
results.perFile = {}
for (const rel of files) {
  const filename = path.join(libDir, rel)
  const code = fs.readFileSync(filename, 'utf8')

  const babelOnce = () =>
    transformSync(code, {
      filename,
      babelrc: false,
      configFile: false,
      presets: [['@babel/preset-typescript', {isTSX: true, allExtensions: true}]],
      plugins: [[stylexPlugin, {dev: false, runtimeInjection: false, unstable_moduleResolution: moduleResolution}]],
    })
  const rsOnce = () =>
    rsTransform(filename, code, {dev: false, runtimeInjection: false, unstable_moduleResolution: moduleResolution})

  const time = (fn) => {
    const s = performance.now()
    fn()
    return performance.now() - s
  }
  const babelCold = time(babelOnce)
  const babelWarm = Array.from({length: WARM_ITERATIONS}, () => time(babelOnce))
  const rsCold = time(rsOnce)
  const rsWarm = Array.from({length: WARM_ITERATIONS}, () => time(rsOnce))
  const mean = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length

  const rulesBabel = babelOnce().metadata.stylex.length
  const rulesRs = rsOnce().metadata.stylex.length
  console.log(
    `${rel.padEnd(22)} ${String(code.length).padStart(5)} B  babel: cold ${babelCold.toFixed(1)} ms, warm mean ${mean(babelWarm).toFixed(2)} ms | rs-compiler: cold ${rsCold.toFixed(1)} ms, warm mean ${mean(rsWarm).toFixed(2)} ms | rules ${rulesBabel}/${rulesRs}`,
  )
  results.perFile[rel] = {
    bytes: code.length,
    babelColdMs: babelCold,
    babelWarmMeanMs: mean(babelWarm),
    rsColdMs: rsCold,
    rsWarmMeanMs: mean(rsWarm),
    rulesBabel,
    rulesRs,
  }
}

// @stylexjs/unplugin keeps a process-global rule store
// (`globalThis.__stylex_unplugin_store`, meant for Vite's dev environments), so
// the in-process builds above bled rules between the library and the app.
// Rebuild everything in fresh processes so dist/ is correct again.
console.log('\n# Restoring artifacts in fresh processes (the unplugin store is process-global)')
const {publishLibCss} = await import('./build-libs.mjs')
for (const dir of LIB_DIRS) spawnTimed(tsdownBin, [], dir)
publishLibCss()
spawnTimed(viteBin, ['build', 'app'], root)
results.note =
  'In-process repeated builds share @stylexjs/unplugin global state; artifacts were rebuilt in fresh processes afterwards.'

fs.mkdirSync(path.join(root, 'evidence'), {recursive: true})
fs.writeFileSync(path.join(root, 'evidence', 'bench.json'), JSON.stringify(results, null, 2))
console.log('✔ wrote evidence/bench.json')
