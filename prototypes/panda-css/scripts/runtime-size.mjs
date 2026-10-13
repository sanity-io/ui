#!/usr/bin/env node
/**
 * Measures what Panda's runtime costs a consumer, minified + gzipped:
 *   - the generated `styled-system` runtime pieces the library uses
 *     (css/cva/cx, token/token.var) bundled in isolation,
 *   - the whole published library (dist/index.js) with and without the Panda
 *     source transform,
 *   - the published stylesheet, hashed vs readable class names, minified or not.
 */
import {gzipSync, brotliCompressSync} from 'node:zlib'
import {existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import {execFileSync} from 'node:child_process'
import {rolldown} from 'rolldown'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pkg = join(root, 'packages/button-v1')
const tmp = join(root, 'results/.tmp-runtime-size')
mkdirSync(tmp, {recursive: true})

const sizes = (buf) => ({
  raw: buf.length,
  gzip: gzipSync(buf, {level: 9}).length,
  brotli: brotliCompressSync(buf).length,
})

async function bundle(entryCode, label) {
  const entry = join(tmp, `${label}.entry.js`)
  writeFileSync(entry, entryCode)
  const build = await rolldown({
    input: entry,
    external: [/^react(\/|$)/, /^react-dom(\/|$)/, /^react\/jsx-runtime$/],
    treeshake: true,
    logLevel: 'silent',
  })
  const {output} = await build.generate({format: 'esm', minify: true})
  await build.close()
  return Buffer.from(output[0].code)
}

const results = {}

// 1. Runtime pieces in isolation (what the library bundles from styled-system/).
const ss = join(pkg, 'styled-system')
results['styled-system/css (css + cva + cx)'] = sizes(
  await bundle(`export {css, cva, cx} from '${ss}/css/index.js'`, 'css-cva-cx'),
)
results['styled-system/css (css only)'] = sizes(await bundle(`export {css} from '${ss}/css/index.js'`, 'css'))
results['styled-system/tokens (token + token.var)'] = sizes(
  await bundle(`export {token} from '${ss}/tokens/index.js'`, 'token'),
)
results['styled-system/recipes (config recipe badge)'] = sizes(
  await bundle(`export {badge} from '${ss}/recipes/index.js'`, 'recipes'),
)
results['styled-system/jsx (styled factory, unused by this library)'] = sizes(
  await bundle(`export {styled} from '${ss}/jsx/index.js'`, 'jsx'),
)

// 2. The whole published library.
results['library dist/index.js (runtime build)'] = sizes(
  await bundle(`export * from '${pkg}/dist/index.js'`, 'lib-runtime'),
)
if (existsSync(join(pkg, 'dist-transform/index.js'))) {
  results['library dist-transform/index.js (transform: true)'] = sizes(
    await bundle(`export * from '${pkg}/dist-transform/index.js'`, 'lib-transform'),
  )
}
// A library that only exports the components (not the raw `button` recipe / tokens)
// still needs the recipe runtime, since `button({mode, tone})` runs per render.
results['library, components only (Button + ThemeProvider + Badge)'] = sizes(
  await bundle(`export {Button, ThemeProvider, Badge} from '${pkg}/dist/index.js'`, 'lib-components'),
)

// 3. Stylesheets: hashed vs readable class names, unminified vs minified.
const css = {}
const run = (env, args) =>
  execFileSync('pnpm', ['exec', 'panda', 'cssgen', ...args], {cwd: pkg, env: {...process.env, ...env}, stdio: 'pipe'})
run({}, ['--outfile', join(tmp, 'hashed.css')])
run({}, ['--outfile', join(tmp, 'hashed.min.css'), '--minify'])
run({SUI_PANDA_HASH: '0'}, ['--outfile', join(tmp, 'readable.css')])
run({SUI_PANDA_HASH: '0'}, ['--outfile', join(tmp, 'readable.min.css'), '--minify'])
for (const f of ['hashed.css', 'hashed.min.css', 'readable.css', 'readable.min.css']) {
  css[`styles.css (${f.replace('.css', '').replace('.', ', ')})`] = sizes(readFileSync(join(tmp, f)))
}
const demoAssets = join(root, 'apps/demo/dist/assets')
if (existsSync(demoAssets)) {
  const cssFile = readdirSync(demoAssets).find((f) => f.endsWith('.css'))
  if (cssFile) css['demo app combined CSS (v1 + v2 + page chrome, Vite output)'] = sizes(readFileSync(join(demoAssets, cssFile)))
}

rmSync(tmp, {recursive: true, force: true})

const out = {js: results, css}
writeFileSync(join(root, 'results/runtime-size.json'), JSON.stringify(out, null, 2) + '\n')

const fmt = (n) => `${(n / 1024).toFixed(2)} kB`
console.log('JavaScript (rolldown, minified, react external):')
for (const [k, v] of Object.entries(results)) console.log(`  ${k.padEnd(62)} raw ${fmt(v.raw).padStart(9)}  gzip ${fmt(v.gzip).padStart(8)}  br ${fmt(v.brotli).padStart(8)}`)
console.log('CSS:')
for (const [k, v] of Object.entries(css)) console.log(`  ${k.padEnd(62)} raw ${fmt(v.raw).padStart(9)}  gzip ${fmt(v.gzip).padStart(8)}  br ${fmt(v.brotli).padStart(8)}`)
