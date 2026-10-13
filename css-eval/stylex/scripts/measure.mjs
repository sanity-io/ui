/**
 * Output-size measurements:
 *  - published CSS of v1 and v2 (raw / gzip / brotli), the app's own CSS, and
 *    the total a page with both versions downloads
 *  - what the two sheets would weigh if compiled together (deduplicated rules)
 *  - JS: the library's compiled JS, and the @stylexjs/stylex runtime a consumer
 *    pays for (a) static styles only — nothing, (b) `props()` for dynamic
 *    variants, (c) the whole runtime namespace
 */
import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {brotliCompressSync, gzipSync} from 'node:zlib'

import {transform as lightningcss} from 'lightningcss'
import {rolldown} from 'rolldown'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (p) => fs.readFileSync(p)
const sizes = (buf) => ({
  raw: buf.length,
  gzip: gzipSync(buf, {level: 9}).length,
  brotli: brotliCompressSync(buf).length,
})
const minifyCss = (css) =>
  lightningcss({filename: 'x.css', code: Buffer.from(css), minify: true}).code

const v1Css = read(fileURLToPath(import.meta.resolve('stylex-button-v1/styles.css')))
const v2Css = read(fileURLToPath(import.meta.resolve('stylex-button-v2/styles.css')))
const appCssFile = fs.readdirSync(path.join(root, 'app/dist/assets')).find((f) => f.endsWith('.css'))
const appCss = read(path.join(root, 'app/dist/assets', appCssFile))
const appJsFile = fs.readdirSync(path.join(root, 'app/dist/assets')).find((f) => f.endsWith('.js'))

const result = {
  css: {
    'v1 styles.css (as published, pretty)': sizes(v1Css),
    'v1 styles.css (minified)': sizes(minifyCss(v1Css)),
    'v2 styles.css (as published, pretty)': sizes(v2Css),
    'v2 styles.css (minified)': sizes(minifyCss(v2Css)),
    'app index.css (reset + app StyleX + consumer theme)': sizes(appCss),
    'page total: v1 + v2 + app (minified)': sizes(
      Buffer.concat([minifyCss(v1Css), minifyCss(v2Css), appCss]),
    ),
  },
}

// "compiled together" estimate: dedupe identical rules across the two sheets
{
  const rules = (css) =>
    minifyCss(css)
      .toString()
      .split(/(?<=})/)
      .filter(Boolean)
  const merged = new Set([...rules(v1Css), ...rules(v2Css)])
  result.css['v1 + v2 compiled as one sheet (deduplicated, minified)'] = sizes(
    Buffer.from([...merged].join('')),
  )
  result.cssDedupe = {
    v1Rules: rules(v1Css).length,
    v2Rules: rules(v2Css).length,
    mergedRules: merged.size,
  }
}

async function bundleSize(label, entryCode) {
  const bundle = await rolldown({
    input: 'entry.js',
    cwd: root,
    plugins: [
      {
        name: 'virtual-entry',
        resolveId: (id) => (id === 'entry.js' ? id : null),
        load: (id) => (id === 'entry.js' ? entryCode : null),
      },
    ],
    platform: 'browser',
    transform: {define: {'process.env.NODE_ENV': '"production"', __DEV__: 'false'}},
  })
  const {output} = await bundle.generate({format: 'esm', minify: true})
  await bundle.close()
  const code = Buffer.from(output[0].code)
  result.js ??= {}
  result.js[label] = sizes(code)
}

result.js = {
  'v1 dist/index.js + tokens.stylex.js (as published, not minified)': sizes(
    Buffer.concat([
      read(fileURLToPath(import.meta.resolve('stylex-button-v1'))),
      read(fileURLToPath(import.meta.resolve('stylex-button-v1/tokens.stylex'))),
    ]),
  ),
}
await bundleSize(
  'runtime: static styles only (compiled away)',
  `import * as stylex from '@stylexjs/stylex'; export const x = {className: 'x1 x2'}; stylex;`,
)
await bundleSize(
  'runtime: props() for dynamic/conditional merging',
  `import {props} from '@stylexjs/stylex'; export const x = (a, b) => props(a, b);`,
)
await bundleSize(
  'runtime: whole @stylexjs/stylex namespace',
  `import * as stylex from '@stylexjs/stylex'; export {stylex};`,
)
await bundleSize(
  'v1 library + runtime, consumer bundle (react external)',
  `export * from 'stylex-button-v1';`,
)
result.js['app bundle incl. react-dom (context only)'] = sizes(
  read(path.join(root, 'app/dist/assets', appJsFile)),
)

const fmt = (n) => `${(n / 1024).toFixed(2)} kB`
const table = (section) =>
  Object.entries(result[section])
    .map(([k, v]) => `| ${k} | ${fmt(v.raw)} | ${fmt(v.gzip)} | ${fmt(v.brotli)} |`)
    .join('\n')
const md = `| CSS | raw | gzip | brotli |\n|---|---:|---:|---:|\n${table('css')}\n\nRules: v1 ${result.cssDedupe.v1Rules}, v2 ${result.cssDedupe.v2Rules}, merged (dedup) ${result.cssDedupe.mergedRules}\n\n| JS | raw | gzip | brotli |\n|---|---:|---:|---:|\n${table('js')}\n`
console.log(md)

fs.mkdirSync(path.join(root, 'evidence'), {recursive: true})
fs.writeFileSync(path.join(root, 'evidence', 'sizes.json'), JSON.stringify(result, null, 2))
fs.writeFileSync(path.join(root, 'evidence', 'sizes.md'), md)
fs.copyFileSync(
  fileURLToPath(import.meta.resolve('stylex-button-v1/styles.css')),
  path.join(root, 'evidence', 'v1.stylex.css'),
)
fs.copyFileSync(
  fileURLToPath(import.meta.resolve('stylex-button-v2/styles.css')),
  path.join(root, 'evidence', 'v2.stylex.css'),
)
fs.copyFileSync(
  fileURLToPath(import.meta.resolve('stylex-button-v1')),
  path.join(root, 'evidence', 'v1.index.js'),
)
console.log('✔ wrote evidence/sizes.{json,md}, evidence/v{1,2}.stylex.css, evidence/v1.index.js')
