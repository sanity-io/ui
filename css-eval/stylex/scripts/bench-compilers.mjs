/**
 * Official `@stylexjs/babel-plugin` vs the Rust port `@stylexswc/rs-compiler`
 * (facebook/stylex#1623 thread), measured on:
 *  - per-file transforms of the Button sources: cold (fresh Node process:
 *    module load + first transform) and warm (in-process, 50 iterations)
 *  - synthetic 300- and 1,000-file sets: sequential in-process transform of
 *    every file (total and per-file mean)
 *  - full tsdown library builds (cold process wall time): Button library, and
 *    the synthetic sets with each compiler plus a no-StyleX baseline
 *  - `tsdown --watch` rebuilds after touching one file (wall time from the
 *    write to tsdown's "Build complete")
 *  - Vite 8 consumer-app builds with `@stylexjs/unplugin` vs `@stylexswc/unplugin`
 */
import {spawn, spawnSync} from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

import {transformSync} from '@babel/core'
import stylexPlugin from '@stylexjs/babel-plugin'
import {transform as rsTransform} from '@stylexswc/rs-compiler'

import {generateSynthetic, generatedDir} from './gen-synthetic.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const RUNS = Number(process.env.BENCH_RUNS ?? 3)
const SIZES = (process.env.BENCH_SIZES ?? '300,1000').split(',').map(Number)
const tsdownBin = path.join(root, 'node_modules', '.bin', 'tsdown')
const viteBin = path.join(root, 'node_modules', '.bin', 'vite')
const libDir = path.join(root, 'packages', 'button-v1')

const median = (xs) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)]
const mean = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length
const ms = (x) => `${x.toFixed(x < 10 ? 2 : 0)} ms`
const strip = (s) => s.replace(/\u001b\[[0-9;]*m/g, '') // oxlint-disable-line no-control-regex
const results = {node: process.version, runs: RUNS}
const lines = []
const log = (s = '') => {
  lines.push(s)
  console.log(s)
}

const options = (rootDir) => ({dev: false, runtimeInjection: false, unstable_moduleResolution: {type: 'commonJS', rootDir}})
const babelOnce = (file, code, rootDir) =>
  transformSync(code, {
    filename: file,
    babelrc: false,
    configFile: false,
    presets: [['@babel/preset-typescript', {isTSX: true, allExtensions: true}]],
    plugins: [[stylexPlugin, options(rootDir)]],
  })
const rsOnce = (file, code, rootDir) => rsTransform(file, code, options(rootDir))
const time = (fn) => {
  const s = performance.now()
  fn()
  return performance.now() - s
}

function spawnTimed(cmd, args, cwd, env = {}) {
  const started = performance.now()
  const r = spawnSync(cmd, args, {cwd, stdio: 'pipe', env: {...process.env, NODE_ENV: 'production', ...env}})
  const elapsed = performance.now() - started
  const out = strip(String(r.stdout) + String(r.stderr))
  if (r.status !== 0 && !(env.STYLEX_EVAL_NO_STYLEX && out.includes('Build complete'))) {
    throw new Error(`${cmd} ${args.join(' ')} failed:\n${out}`)
  }
  const reported = /Build complete in (\d+)ms/.exec(out)
  return {wall: elapsed, reported: reported ? Number(reported[1]) : null}
}

// ---------------------------------------------------------------------------
log(`# Per-file transform — Button library sources (${RUNS} cold runs, 50 warm iterations)`)
const COLD_SCRIPT = `
import fs from 'node:fs'
const [, , compiler, file, rootDir] = process.argv
const code = fs.readFileSync(file, 'utf8')
const options = {dev: false, runtimeInjection: false, unstable_moduleResolution: {type: 'commonJS', rootDir}}
const t0 = performance.now()
let transform
if (compiler === 'babel') {
  const {transformSync} = await import('@babel/core')
  const {default: plugin} = await import('@stylexjs/babel-plugin')
  await import('@babel/preset-typescript')
  transform = () => transformSync(code, {filename: file, babelrc: false, configFile: false, presets: [['@babel/preset-typescript', {isTSX: true, allExtensions: true}]], plugins: [[plugin, options]]})
} else {
  const {transform: rs} = await import('@stylexswc/rs-compiler')
  transform = () => rs(file, code, options)
}
const t1 = performance.now()
transform()
const t2 = performance.now()
console.log(JSON.stringify({load: t1 - t0, first: t2 - t1}))
`
fs.mkdirSync(path.join(root, 'bench'), {recursive: true})
const coldScript = path.join(root, 'bench', '.cold-transform.mjs')
fs.writeFileSync(coldScript, COLD_SCRIPT)
const coldRun = (compiler, file, rootDir) => {
  const r = spawnSync(process.execPath, [coldScript, compiler, file, rootDir], {cwd: root, stdio: 'pipe'})
  if (r.status !== 0) throw new Error(String(r.stderr))
  return JSON.parse(String(r.stdout).trim().split('\n').pop())
}

results.perFile = {}
for (const rel of ['src/button.tsx', 'src/theme.ts', 'src/tokens.stylex.ts']) {
  const file = path.join(libDir, rel)
  const code = fs.readFileSync(file, 'utf8')
  const entry = {bytes: code.length}
  for (const compiler of ['babel', 'rs']) {
    const cold = Array.from({length: RUNS}, () => coldRun(compiler, file, libDir))
    const once = compiler === 'babel' ? () => babelOnce(file, code, libDir) : () => rsOnce(file, code, libDir)
    for (let i = 0; i < 5; i++) once() // warm-up
    const warm = Array.from({length: 50}, () => time(once))
    entry[compiler] = {
      coldLoadMs: median(cold.map((c) => c.load)),
      coldFirstTransformMs: median(cold.map((c) => c.first)),
      warmMeanMs: mean(warm),
      warmMedianMs: median(warm),
    }
  }
  results.perFile[rel] = entry
  log(
    `${rel.padEnd(22)} ${String(entry.bytes).padStart(5)} B | babel: load ${ms(entry.babel.coldLoadMs)}, first transform ${ms(entry.babel.coldFirstTransformMs)}, warm ${ms(entry.babel.warmMeanMs)} | rs: load ${ms(entry.rs.coldLoadMs)}, first transform ${ms(entry.rs.coldFirstTransformMs)}, warm ${ms(entry.rs.warmMeanMs)} | speedup warm ${(entry.babel.warmMeanMs / entry.rs.warmMeanMs).toFixed(1)}×`,
  )
}

// ---------------------------------------------------------------------------
results.synthetic = {}
for (const n of SIZES) {
  const dir = generateSynthetic(n)
  const files = fs
    .readdirSync(path.join(dir, 'src'))
    .filter((f) => f.endsWith('.tsx') || f.endsWith('.stylex.ts'))
    .map((f) => path.join(dir, 'src', f))
  const sources = files.map((f) => [f, fs.readFileSync(f, 'utf8')])
  const entry = {files: files.length}

  log(`\n# Synthetic ${n}-file set — sequential in-process transform of every file`)
  for (const compiler of ['babel', 'rs']) {
    const once = compiler === 'babel' ? babelOnce : rsOnce
    const totals = []
    for (let run = 0; run < RUNS; run++) {
      const s = performance.now()
      for (const [f, code] of sources) once(f, code, dir)
      totals.push(performance.now() - s)
    }
    entry[`${compiler}TransformAll`] = {runsMs: totals, medianMs: median(totals), perFileMs: median(totals) / files.length}
    log(`${compiler.padEnd(6)} all ${files.length} files: ${totals.map(ms).join(', ')} → median ${ms(median(totals))} (${ms(median(totals) / files.length)} per file; first run includes JIT warm-up)`)
  }

  log(`\n# Synthetic ${n}-file set — full tsdown library build, cold process (${RUNS} runs each, dts off)`)
  for (const [label, env] of [
    ['babel', {STYLEX_COMPILER: 'babel'}],
    ['rs', {STYLEX_COMPILER: 'rs'}],
    ['none (no StyleX plugin)', {STYLEX_EVAL_NO_STYLEX: '1'}],
  ]) {
    const runs = Array.from({length: RUNS}, () => spawnTimed(tsdownBin, [], dir, env))
    entry[`build:${label}`] = {wallMs: runs.map((r) => r.wall), medianWallMs: median(runs.map((r) => r.wall)), reportedMs: runs.map((r) => r.reported)}
    log(`${label.padEnd(26)} wall ${runs.map((r) => ms(r.wall)).join(', ')} → median ${ms(median(runs.map((r) => r.wall)))}; tsdown-reported ${runs.map((r) => r.reported).join('/')} ms`)
  }

  log(`\n# Synthetic ${n}-file set — tsdown --watch rebuild after touching one component (${RUNS} edits each)`)
  for (const compiler of ['babel', 'rs']) {
    const rebuilds = await watchRebuilds(dir, {STYLEX_COMPILER: compiler}, path.join(dir, 'src', 'component-0001.tsx'))
    entry[`watch:${compiler}`] = rebuilds
    log(`${compiler.padEnd(6)} initial ${ms(rebuilds.initialMs)}; rebuilds wall ${rebuilds.rebuildWallMs.map(ms).join(', ')} → median ${ms(median(rebuilds.rebuildWallMs))}; tsdown-reported ${rebuilds.rebuildReportedMs.join('/')} ms`)
  }
  results.synthetic[n] = entry
}

/** Starts `tsdown --watch`, waits for the first build, then edits a file RUNS times. */
function watchRebuilds(dir, env, fileToTouch) {
  return new Promise((resolve, reject) => {
    const child = spawn(tsdownBin, ['--watch'], {cwd: dir, env: {...process.env, NODE_ENV: 'production', ...env}, stdio: ['ignore', 'pipe', 'pipe']})
    const original = fs.readFileSync(fileToTouch, 'utf8')
    const started = performance.now()
    let buffer = ''
    let buildsSeen = 0
    let editStarted = 0
    const rebuildWallMs = []
    const rebuildReportedMs = []
    let initialMs = 0
    const timer = setTimeout(() => finish(new Error('watch timeout')), 120_000)
    const finish = (err) => {
      clearTimeout(timer)
      child.kill()
      fs.writeFileSync(fileToTouch, original)
      err ? reject(err) : resolve({initialMs, rebuildWallMs, rebuildReportedMs})
    }
    const onData = (chunk) => {
      buffer += strip(String(chunk))
      let match
      const re = /(?:Build complete|Rebuilt) in (\d+)ms\.?/g
      let consumed = 0
      while ((match = re.exec(buffer)) !== null) {
        consumed = re.lastIndex
        buildsSeen++
        if (buildsSeen === 1) {
          initialMs = performance.now() - started
        } else {
          rebuildWallMs.push(performance.now() - editStarted)
          rebuildReportedMs.push(Number(match[1]))
        }
        if (buildsSeen > RUNS) return finish()
        // trigger the next rebuild
        setTimeout(() => {
          editStarted = performance.now()
          fs.writeFileSync(fileToTouch, original.replace('minHeight:', `minHeight: /* edit ${buildsSeen} */`))
        }, 300)
      }
      buffer = buffer.slice(consumed)
    }
    child.stdout.on('data', onData)
    child.stderr.on('data', onData)
    child.on('exit', (code) => {
      if (buildsSeen <= RUNS) finish(new Error(`tsdown --watch exited with ${code}\n${buffer}`))
    })
  })
}

// ---------------------------------------------------------------------------
log(`\n# Button library — full tsdown build, cold process (${RUNS} runs each; dts on, @sanity/tsdown-config)`)
results.buttonLibrary = {}
for (const [label, env] of [
  ['babel', {STYLEX_COMPILER: 'babel'}],
  ['rs', {STYLEX_COMPILER: 'rs'}],
  ['none (no StyleX plugin)', {STYLEX_EVAL_NO_STYLEX: '1'}],
]) {
  const runs = Array.from({length: RUNS}, () => spawnTimed(tsdownBin, [], libDir, env))
  results.buttonLibrary[label] = {wallMs: runs.map((r) => r.wall), medianWallMs: median(runs.map((r) => r.wall)), reportedMs: runs.map((r) => r.reported)}
  log(`${label.padEnd(26)} wall ${runs.map((r) => ms(r.wall)).join(', ')} → median ${ms(median(runs.map((r) => r.wall)))}; tsdown-reported ${runs.map((r) => r.reported).join('/')} ms`)
}
log(`\n# Button library — tsdown --watch rebuild after touching button.tsx (${RUNS} edits each)`)
for (const compiler of ['babel', 'rs']) {
  const rebuilds = await watchRebuilds(libDir, {STYLEX_COMPILER: compiler}, path.join(libDir, 'src', 'button.tsx'))
  results.buttonLibrary[`watch:${compiler}`] = rebuilds
  log(`${compiler.padEnd(6)} initial ${ms(rebuilds.initialMs)}; rebuilds wall ${rebuilds.rebuildWallMs.map(ms).join(', ')} → median ${ms(median(rebuilds.rebuildWallMs))}; tsdown-reported ${rebuilds.rebuildReportedMs.join('/')} ms`)
}

// ---------------------------------------------------------------------------
log(`\n# Vite 8 consumer app — vite build, cold process (${RUNS} runs each)`)
results.viteApp = {}
for (const compiler of ['babel', 'rs']) {
  const runs = Array.from({length: RUNS}, () => spawnTimed(viteBin, ['build', 'app'], root, {STYLEX_COMPILER: compiler}))
  results.viteApp[compiler] = {wallMs: runs.map((r) => r.wall), medianWallMs: median(runs.map((r) => r.wall))}
  log(`${compiler.padEnd(6)} wall ${runs.map((r) => ms(r.wall)).join(', ')} → median ${ms(median(runs.map((r) => r.wall)))}`)
}

// restore default artifacts (Babel, version-scoped resolution)
spawnTimed(tsdownBin, [], libDir, {STYLEX_COMPILER: 'babel'})
spawnTimed(tsdownBin, [], path.join(root, 'packages', 'button-v2'), {STYLEX_COMPILER: 'babel'})
const {publishLibCss} = await import('./build-libs.mjs')
publishLibCss()
spawnTimed(viteBin, ['build', 'app'], root, {STYLEX_COMPILER: 'babel'})
fs.rmSync(coldScript, {force: true})

fs.mkdirSync(path.join(root, 'evidence'), {recursive: true})
fs.writeFileSync(path.join(root, 'evidence', 'bench-compilers.json'), JSON.stringify(results, null, 2))
fs.writeFileSync(path.join(root, 'evidence', 'bench-compilers.txt'), lines.join('\n') + '\n')
console.log('\n✔ wrote evidence/bench-compilers.{json,txt}')
