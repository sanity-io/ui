/**
 * Pigment CSS numbers for the comparison: build time (vite@6 lib build, fresh
 * process per run), output sizes, and the runtime a consumer ships.
 */
import {spawnSync} from 'node:child_process'
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs'
import {dirname, resolve} from 'node:path'
import {performance} from 'node:perf_hooks'
import {fileURLToPath} from 'node:url'
import {brotliCompressSync, gzipSync} from 'node:zlib'

import {rolldown} from 'rolldown'

const here = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const sizes = (buf) => ({raw: buf.length, gzip: gzipSync(buf, {level: 9}).length, brotli: brotliCompressSync(buf).length})
const median = (xs) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)]

const times = []
for (let i = 0; i < 5; i++) {
  const start = performance.now()
  const res = spawnSync('pnpm', ['exec', 'vite', 'build', '--configLoader', 'runner'], {cwd: here, encoding: 'utf8', timeout: 60_000})
  if (res.status !== 0) throw new Error(res.stderr || res.stdout)
  times.push(performance.now() - start)
}

async function bundleSize(label, entryCode) {
  const bundle = await rolldown({
    input: 'entry',
    cwd: here,
    external: [/^react($|\/)/],
    plugins: [{name: 'virtual-entry', resolveId: (id) => (id === 'entry' ? id : null), load: (id) => (id === 'entry' ? entryCode : null)}],
    transform: {define: {'process.env.NODE_ENV': '"production"'}},
  })
  const {output} = await bundle.generate({format: 'esm', minify: true})
  await bundle.close()
  return {label, ...sizes(Buffer.from(output.map((c) => c.code ?? '').join('')))}
}

const results = {
  versions: Object.fromEntries(
    ['@pigment-css/react', '@pigment-css/vite-plugin', 'vite'].map((p) => [p, JSON.parse(readFileSync(resolve(here, 'node_modules', p, 'package.json'), 'utf8')).version]),
  ),
  build: {runs: times.length, wallMedianMs: Math.round(median(times)), wallMinMs: Math.round(Math.min(...times))},
  output: {
    css: sizes(readFileSync(resolve(here, 'dist/style.css'))),
    js: sizes(readFileSync(resolve(here, 'dist/index.js'))),
  },
  runtime: [
    await bundleSize('@pigment-css/react styled (deps bundled: clsx, @emotion/is-prop-valid)', "export {styled} from '@pigment-css/react'"),
    await bundleSize('@pigment-css/react styled + css + sx', "export {styled, css, sx} from '@pigment-css/react'"),
  ],
}
console.log(JSON.stringify(results, null, 2))
mkdirSync(resolve(here, '../results'), {recursive: true})
writeFileSync(resolve(here, '../results/pigment-metrics.json'), JSON.stringify(results, null, 2) + '\n')
