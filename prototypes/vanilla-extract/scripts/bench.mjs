#!/usr/bin/env node
// Measures compile time (cold = first run in a fresh process sequence, warm = median of repeated
// runs), CSS output size (raw/gzip/brotli) per naming mode, and the size of the only runtime
// code a consumer ships (@vanilla-extract/dynamic + @vanilla-extract/recipes' createRuntimeFn).
// Writes results/metrics.md and results/metrics.json.
import {spawnSync} from 'node:child_process'
import {mkdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs'
import {resolve} from 'node:path'
import {brotliCompressSync, gzipSync} from 'node:zlib'

import {build} from 'vite'

import {buildLib} from './build.mjs'
import {LIBS, MODES, RESULTS_DIR, ROOT, distDir} from './lib/paths.mjs'

const RUNS = Number(process.env.BENCH_RUNS ?? 5)

function median(values) {
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}

function sizes(buffer) {
  return {
    raw: buffer.length,
    gzip: gzipSync(buffer, {level: 9}).length,
    brotli: brotliCompressSync(buffer).length,
  }
}

function tsdownReportedMs(lib, mode) {
  // tsdown prints "Build complete in Nms"; re-run once capturing output to read its own timing.
  const result = spawnSync(resolve(ROOT, 'node_modules/.bin/tsdown'), [], {
    cwd: resolve(ROOT, lib),
    env: {...process.env, VE_IDENTIFIERS: mode, NO_COLOR: '1', FORCE_COLOR: '0'},
    encoding: 'utf8',
  })
  // eslint-disable-next-line no-control-regex -- strip ANSI color codes
  const plain = `${result.stdout}${result.stderr}`.replace(/\u001b\[[0-9;]*m/g, '')
  const match = plain.match(/Build complete in (\d+)ms/)
  return match ? Number(match[1]) : null
}

// 1. Compile time ----------------------------------------------------------------------------
const compile = []
for (const mode of MODES) {
  for (const lib of LIBS) {
    rmSync(resolve(ROOT, lib, 'node_modules/.cache'), {recursive: true, force: true})
    const times = []
    for (let i = 0; i < RUNS; i++) times.push(buildLib(lib, mode).ms)
    compile.push({
      lib,
      mode,
      coldMs: Math.round(times[0]),
      warmMedianMs: Math.round(median(times.slice(1))),
      tsdownInternalMs: tsdownReportedMs(lib, mode),
    })
  }
}

// 2. CSS + JS output sizes per mode ------------------------------------------------------------
const output = []
for (const mode of MODES) {
  for (const lib of LIBS) {
    const css = readFileSync(resolve(distDir(lib, mode), 'styles.css'))
    const js = readFileSync(resolve(distDir(lib, mode), 'index.js'))
    const classNames = [...new Set(css.toString().match(/\.(-?[_a-zA-Z][\w-]*)/g) ?? [])]
    output.push({
      lib,
      mode,
      css: sizes(css),
      js: sizes(js),
      avgIdentifierLength: classNames.reduce((sum, name) => sum + name.length - 1, 0) / classNames.length,
    })
  }
}

// 3. Runtime cost: the only code from vanilla-extract that reaches the browser -------------------
mkdirSync(resolve(ROOT, 'node_modules/.cache/bench'), {recursive: true})
const runtimeEntry = resolve(ROOT, 'node_modules/.cache/bench/runtime.js')
writeFileSync(
  runtimeEntry,
  `export {assignInlineVars, setElementVars} from '@vanilla-extract/dynamic'\nexport {createRuntimeFn} from '@vanilla-extract/recipes/createRuntimeFn'\n`,
)
const runtimeOut = resolve(ROOT, 'node_modules/.cache/bench/runtime-dist')
await build({
  root: ROOT,
  configFile: false,
  logLevel: 'silent',
  build: {
    outDir: runtimeOut,
    emptyOutDir: true,
    minify: true,
    lib: {entry: runtimeEntry, formats: ['es'], fileName: 'runtime'},
  },
})
const runtime = sizes(readFileSync(resolve(runtimeOut, 'runtime.js')))

// 4. Report ------------------------------------------------------------------------------------
const fmt = (n) => n.toLocaleString('en-US')
let md = `# Metrics (${new Date().toISOString().slice(0, 10)}, Node ${process.version}, ${RUNS} runs)\n\n`
md += '## Compile time — tsdown + @sanity/tsdown-config (@sanity/vanilla-extract-* plugins), per library build\n\n'
md += '| lib | identifiers mode | cold (first run, wall) | warm (median, wall) | tsdown-reported build |\n| --- | --- | ---: | ---: | ---: |\n'
for (const row of compile) {
  md += `| ${row.lib} | \`${row.mode}\` | ${row.coldMs} ms | ${row.warmMedianMs} ms | ${row.tsdownInternalMs ?? '?'} ms |\n`
}
md += '\nWall time includes Node + tsdown + rolldown start-up (~300 ms); the tsdown-reported figure is the build itself.\n'
md += '\n## Output size per naming mode\n\n'
md += '| lib | identifiers mode | CSS raw | CSS gzip | CSS brotli | JS raw | JS gzip | avg class name length |\n| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |\n'
for (const row of output) {
  md += `| ${row.lib} | \`${row.mode}\` | ${fmt(row.css.raw)} B | ${fmt(row.css.gzip)} B | ${fmt(row.css.brotli)} B | ${fmt(row.js.raw)} B | ${fmt(row.js.gzip)} B | ${row.avgIdentifierLength.toFixed(2)} |\n`
}
md += '\n## Runtime JS shipped to consumers (minified ESM bundle of everything vanilla-extract puts in the browser)\n\n'
md += `\`@vanilla-extract/dynamic\` (assignInlineVars, setElementVars) + \`@vanilla-extract/recipes/createRuntimeFn\`: **${fmt(runtime.raw)} B raw, ${fmt(runtime.gzip)} B gzip, ${fmt(runtime.brotli)} B brotli**. \`@vanilla-extract/css\` itself is build-time only (0 B at runtime); a library that uses neither dynamic vars nor recipes ships 0 B.\n`

mkdirSync(RESULTS_DIR, {recursive: true})
writeFileSync(resolve(RESULTS_DIR, 'metrics.md'), md)
writeFileSync(resolve(RESULTS_DIR, 'metrics.json'), JSON.stringify({compile, output, runtime}, null, 2))
console.log(md)
