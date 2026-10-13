#!/usr/bin/env node
/**
 * Compile-time benchmark for the Panda 2.x toolchain on this machine.
 *
 *   cold   = a fresh process with no generated output present
 *   warm   = a fresh process with `styled-system/` already generated (Panda 2
 *            keeps no on-disk cache, so this isolates the codegen write cost)
 *   watch  = `panda cssgen --watch` already running; time from saving a source
 *            change to the stylesheet being rewritten (the dev-loop number)
 *
 * Also measures tsdown, the full library build, the Vite consumer build, and a
 * synthetic project with N component files (each a cva + a css call) to show
 * how extraction scales.
 */
import {execFileSync, spawn} from 'node:child_process'
import {cpSync, existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync} from 'node:fs'
import {cpus, totalmem} from 'node:os'
import {dirname, join} from 'node:path'
import {performance} from 'node:perf_hooks'
import {fileURLToPath} from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pkg = join(root, 'packages/button-v1')
const demo = join(root, 'apps/demo')
const RUNS = Number(process.env.BENCH_RUNS ?? 5)

const ms = (n) => Math.round(n * 10) / 10
const stats = (arr) => {
  const sorted = [...arr].sort((a, b) => a - b)
  return {
    runs: arr.length,
    min: ms(sorted[0]),
    median: ms(sorted[Math.floor(sorted.length / 2)]),
    max: ms(sorted[sorted.length - 1]),
    all: arr.map(ms),
  }
}

function timeSync(fn) {
  const t = performance.now()
  fn()
  return performance.now() - t
}

const sh = (cmd, args, cwd, env = {}) =>
  execFileSync(cmd, args, {cwd, env: {...process.env, ...env}, stdio: 'pipe'})

const results = {
  machine: {
    cpu: cpus()[0]?.model,
    cores: cpus().length,
    memoryGb: Math.round(totalmem() / 1024 ** 3),
    node: process.version,
    platform: `${process.platform}-${process.arch}`,
    panda: JSON.parse(readFileSync(join(root, 'node_modules/.pnpm/node_modules/@pandacss/dev/package.json'), 'utf8')).version,
    tsdown: JSON.parse(readFileSync(join(root, 'node_modules/.pnpm/node_modules/tsdown/package.json'), 'utf8')).version,
    vite: JSON.parse(readFileSync(join(root, 'node_modules/.pnpm/node_modules/vite/package.json'), 'utf8')).version,
  },
  prototype: {},
  scale: {},
}

// --- prototype package -------------------------------------------------------
{
  const codegenCold = []
  const codegenWarm = []
  const cssgenCold = []
  const cssgenWarm = []
  for (let i = 0; i < RUNS; i++) {
    rmSync(join(pkg, 'styled-system'), {recursive: true, force: true})
    rmSync(join(pkg, 'dist'), {recursive: true, force: true})
    mkdirSync(join(pkg, 'dist'))
    codegenCold.push(timeSync(() => sh('pnpm', ['exec', 'panda', 'codegen'], pkg)))
    codegenWarm.push(timeSync(() => sh('pnpm', ['exec', 'panda', 'codegen'], pkg)))
    cssgenCold.push(timeSync(() => sh('pnpm', ['exec', 'panda', 'cssgen', '--outfile', 'dist/styles.css'], pkg)))
    cssgenWarm.push(timeSync(() => sh('pnpm', ['exec', 'panda', 'cssgen', '--outfile', 'dist/styles.css'], pkg)))
  }
  results.prototype['panda codegen (cold: no styled-system/)'] = stats(codegenCold)
  results.prototype['panda codegen (warm: styled-system/ present)'] = stats(codegenWarm)
  results.prototype['panda cssgen (first run after codegen)'] = stats(cssgenCold)
  results.prototype['panda cssgen (repeat run)'] = stats(cssgenWarm)

  // `pnpm exec` overhead, so the engine numbers can be read net of it.
  const overhead = []
  for (let i = 0; i < RUNS; i++) overhead.push(timeSync(() => sh('pnpm', ['exec', 'panda', '--version'], pkg)))
  results.prototype['process overhead: pnpm exec panda --version'] = stats(overhead)

  const tsdown = []
  for (let i = 0; i < RUNS; i++) tsdown.push(timeSync(() => sh('pnpm', ['exec', 'tsdown'], pkg)))
  results.prototype['tsdown (library JS + d.ts, @sanity/tsdown-config)'] = stats(tsdown)

  const full = []
  for (let i = 0; i < Math.min(RUNS, 3); i++) full.push(timeSync(() => sh('pnpm', ['run', 'build'], pkg)))
  results.prototype['full library build (rm dist, codegen, cssgen, tsdown)'] = stats(full)

  const transform = []
  for (let i = 0; i < Math.min(RUNS, 3); i++) transform.push(timeSync(() => sh('pnpm', ['run', 'build:transform'], pkg)))
  results.prototype['tsdown + @pandacss/rollup transform:true (zero-runtime build)'] = stats(transform)

  const vite = []
  for (let i = 0; i < Math.min(RUNS, 3); i++) {
    rmSync(join(demo, 'node_modules/.vite'), {recursive: true, force: true})
    vite.push(timeSync(() => sh('pnpm', ['run', 'build'], demo)))
  }
  results.prototype['vite build of the consumer demo (no Panda plugin)'] = stats(vite)

  // Watch-mode rebuild latency.
  results.prototype['panda cssgen --watch rebuild after editing Button.tsx'] = stats(await watchRebuild(pkg))
}

async function watchRebuild(cwd) {
  const out = join(cwd, 'dist/styles.css')
  const buttonFile = join(cwd, 'src/components/Button.tsx')
  const original = readFileSync(buttonFile, 'utf8')
  const child = spawn('pnpm', ['exec', 'panda', 'cssgen', '--watch', '--outfile', 'dist/styles.css'], {cwd, stdio: 'pipe'})
  let stderr = ''
  child.stderr.on('data', (d) => (stderr += d))
  child.stdout.on('data', (d) => (stderr += d))
  const waitFor = (predicate, timeout = 15000) =>
    new Promise((resolve, reject) => {
      const start = performance.now()
      const tick = () => {
        if (predicate()) return resolve(performance.now() - start)
        if (performance.now() - start > timeout) return reject(new Error('watch timeout\n' + stderr))
        setTimeout(tick, 2)
      }
      tick()
    })
  const latencies = []
  let missedEvents = 0
  const sleep = (t) => new Promise((r) => setTimeout(r, t))
  try {
    await waitFor(() => existsSync(out) && statSync(out).size > 0)
    await sleep(1000)
    // Each edit adds a NEW atomic rule (`paddingTop: '<n>'`), so the stylesheet
    // must change every time; a watch that keeps the union of seen styles (as
    // Panda does in watch mode) still grows on every edit.
    const scale = ['1', '2', '3', '4', '5']
    for (let i = 0; i < RUNS; i++) {
      const edited = original.replace(
        "textDecoration: 'none',",
        `textDecoration: 'none',\n    paddingTop: '${scale[i % scale.length]}',\n    marginTop: '${scale[(i + 1) % scale.length]}',`,
      )
      const before = readFileSync(out, 'utf8')
      writeFileSync(buttonFile, edited)
      try {
        latencies.push(await waitFor(() => readFileSync(out, 'utf8') !== before, 5000))
      } catch {
        missedEvents++
      }
      await sleep(1000)
      writeFileSync(buttonFile, original)
      await sleep(1000)
    }
  } finally {
    writeFileSync(buttonFile, original)
    child.kill('SIGTERM')
  }
  results.prototype['panda cssgen --watch: file-change events not picked up'] = missedEvents
  return latencies
}

// --- synthetic scale test ----------------------------------------------------
// Generated inside the real package so Node resolution finds its node_modules.
const scaleRoot = join(pkg, '.scale')
for (const n of [300, 1000]) {
  const dir = join(scaleRoot, `n${n}`)
  rmSync(dir, {recursive: true, force: true})
  mkdirSync(join(dir, 'src/components'), {recursive: true})
  mkdirSync(join(dir, 'src/theme'), {recursive: true})
  cpSync(join(pkg, 'panda.config.ts'), join(dir, 'panda.config.ts'))
  cpSync(join(pkg, 'package.json'), join(dir, 'package.json'))
  cpSync(join(pkg, 'src/theme'), join(dir, 'src/theme'), {recursive: true})
  const hues = ['gray', 'blue', 'green', 'yellow', 'red']
  const tints = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']
  for (let i = 0; i < n; i++) {
    const hue = hues[i % hues.length]
    const tint = tints[i % tints.length]
    const tint2 = tints[(i * 7) % tints.length]
    writeFileSync(
      join(dir, `src/components/Component${i}.tsx`),
      `import {css, cva} from '../../styled-system/css'
import type {RecipeRuntimeFn} from '../../styled-system/types'

export const box${i}: string = css({
  display: 'flex',
  gap: '${(i % 5) + 1}',
  padding: '${(i % 4) + 1}',
  // unique arbitrary values so the number of distinct atomic rules grows with N
  minWidth: '[${100 + i}px]',
  maxWidth: '[${400 + i}px]',
  _hover: {minHeight: '[${20 + i}px]'},
  bg: '${hue}.${tint}',
  color: '${hue}.${tint2}',
  borderRadius: '${['0', '1', '2', '3', 'full'][i % 5]}',
  _hover: {bg: '${hue}.${tints[(i + 1) % tints.length]}'},
  _dark: {color: '${hue}.${tints[(i + 2) % tints.length]}'},
})

export const recipe${i}: RecipeRuntimeFn<{size?: 'sm' | 'md' | 'lg'; tone?: 'a' | 'b' | 'c'}> = cva({
  base: {display: 'inline-flex', alignItems: 'center', fontFamily: 'sans', lineHeight: 'tight'},
  variants: {
    size: {
      sm: {fontSize: '0', paddingInline: '1', paddingBlock: '1'},
      md: {fontSize: '1', paddingInline: '2', paddingBlock: '2'},
      lg: {fontSize: '2', paddingInline: '3', paddingBlock: '3'},
    },
    tone: {
      a: {bg: '${hue}.${tints[(i + 3) % tints.length]}', _hover: {bg: '${hue}.${tints[(i + 4) % tints.length]}'}, zIndex: '[${i}]'},
      b: {bg: '${hue}.${tints[(i + 5) % tints.length]}', _focusVisible: {outlineColor: 'focusRing'}},
      c: {bg: '${hue}.${tints[(i + 6) % tints.length]}', _disabled: {opacity: 0.4}},
    },
  },
  defaultVariants: {size: 'md', tone: 'a'},
})
`,
    )
  }
  mkdirSync(join(dir, 'dist'))
  // Nested directories are not pnpm projects, so call the package's binary directly.
  const pandaBin = join(pkg, 'node_modules/.bin/panda')
  const codegen = timeSync(() => sh(pandaBin, ['codegen'], dir))
  const cold = []
  for (let i = 0; i < Math.min(RUNS, 3); i++) cold.push(timeSync(() => sh(pandaBin, ['cssgen', '--outfile', 'dist/styles.css'], dir)))
  const size = statSync(join(dir, 'dist/styles.css')).size
  const selectors = (readFileSync(join(dir, 'dist/styles.css'), 'utf8').match(/^\s*\.sui-v4-/gm) ?? []).length
  results.scale[`${n} component files (each 1 css() + 1 cva with 6 variants)`] = {
    'panda codegen ms': ms(codegen),
    'panda cssgen ms': stats(cold),
    'styles.css bytes': size,
    'atomic rules': selectors,
  }
}
rmSync(scaleRoot, {recursive: true, force: true})

// Restore the real package's outputs.
sh('pnpm', ['run', 'build'], pkg)

mkdirSync(join(root, 'results'), {recursive: true})
writeFileSync(join(root, 'results/bench.json'), JSON.stringify(results, null, 2) + '\n')

console.log(`Machine: ${results.machine.cpu} × ${results.machine.cores}, ${results.machine.memoryGb} GB, node ${results.machine.node}, @pandacss/dev ${results.machine.panda}, tsdown ${results.machine.tsdown}, vite ${results.machine.vite}`)
console.log(`\nPrototype package (${RUNS} runs, ms — min / median / max):`)
for (const [k, v] of Object.entries(results.prototype)) {
  if (typeof v === 'number') console.log(`  ${k.padEnd(66)} ${v}`)
  else console.log(`  ${k.padEnd(66)} ${String(v.min).padStart(7)} / ${String(v.median).padStart(7)} / ${String(v.max).padStart(7)}`)
}
console.log('\nScale (synthetic):')
for (const [k, v] of Object.entries(results.scale)) {
  console.log(`  ${k}`)
  console.log(`    codegen ${v['panda codegen ms']} ms, cssgen min/median/max ${v['panda cssgen ms'].min} / ${v['panda cssgen ms'].median} / ${v['panda cssgen ms'].max} ms, css ${(v['styles.css bytes'] / 1024).toFixed(1)} kB, ${v['atomic rules']} atomic rules`)
}
