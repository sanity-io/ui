/**
 * Output-size measurements.
 *
 *  - CSS emitted for each library version (readable as built, minified with lightningcss, gzip, brotli)
 *  - the next-yak runtime (`next-yak/internal`, everything a compiled component imports), bundled and
 *    minified with rolldown, React externalized — raw / gzip / brotli
 *  - styled-components, measured the same way, as the runtime @sanity/ui ships today
 *  - the compiled library JS (dist/index.js) per version
 *
 * Run with: node --experimental-strip-types bench/sizes.ts
 */
import {transform as lightningcss} from 'lightningcss'
import {mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs'
import {resolve} from 'node:path'
import {brotliCompressSync, constants, gzipSync} from 'node:zlib'
import {rolldown} from 'rolldown'

const root = resolve(import.meta.dirname, '..')

const gzip = (s: string | Uint8Array) => gzipSync(s, {level: 9}).length
const brotli = (s: string | Uint8Array) =>
  brotliCompressSync(s, {params: {[constants.BROTLI_PARAM_QUALITY]: 11}}).length
const kb = (n: number) => `${(n / 1024).toFixed(2)} kB`

function cssRow(label: string, css: string) {
  const min = lightningcss({filename: 'x.css', code: Buffer.from(css), minify: true}).code.toString()
  return `| ${label} | ${kb(css.length)} | ${kb(min.length)} | ${kb(gzip(min))} | ${kb(brotli(min))} |`
}

async function bundle(entryCode: string, external: (string | RegExp)[]) {
  // The entry has to live inside the workspace so that bare specifiers resolve to its node_modules
  const dir = mkdtempSync(resolve(root, 'node_modules/.yak-size-'))
  const entry = resolve(dir, 'entry.js')
  writeFileSync(entry, entryCode)
  try {
    const build = await rolldown({
      input: entry,
      external,
      platform: 'browser',
      transform: {define: {'process.env.NODE_ENV': '"production"'}},
    })
    const {output} = await build.generate({format: 'esm', minify: true})
    await build.close()
    return output.filter((o) => o.type === 'chunk').map((o) => (o as {code: string}).code).join('\n')
  } finally {
    rmSync(dir, {recursive: true, force: true})
  }
}

function jsRow(label: string, code: string) {
  return `| ${label} | ${kb(code.length)} | ${kb(gzip(code))} | ${kb(brotli(code))} |`
}

async function main() {
  console.log('# next-yak output sizes\n')

  console.log('## CSS emitted by the library build\n')
  console.log('| stylesheet | as built (readable) | minified | gzip | brotli |')
  console.log('| --- | --- | --- | --- | --- |')
  for (const v of [1, 2]) {
    const css = readFileSync(resolve(root, `packages/ui-v${v}/dist/styles.css`), 'utf8')
    console.log(cssRow(`ui-v${v} dist/styles.css`, css))
  }
  const both = [1, 2].map((v) => readFileSync(resolve(root, `packages/ui-v${v}/dist/styles.css`), 'utf8')).join('\n')
  console.log(cssRow('v1 + v2 on one page (no dedup across versions)', both))

  console.log('\n## Runtime JavaScript (bundled + minified with rolldown, react/react-dom external)\n')
  console.log('| bundle | minified | gzip | brotli |')
  console.log('| --- | --- | --- | --- |')
  const reactExternal = ['react', 'react-dom', 'react/jsx-runtime', /^react-dom\//]
  const yakInternal = await bundle(`export * from 'next-yak/internal';`, reactExternal)
  console.log(jsRow('next-yak/internal (full runtime: styled, css, atoms, keyframes, context, unitPostFix)', yakInternal))
  const yakUsed = await bundle(
    `import {__yak_button, __yak_span, css} from 'next-yak/internal'; export {__yak_button, __yak_span, css};`,
    reactExternal,
  )
  console.log(jsRow('next-yak/internal, only what the Button imports (tree-shaken)', yakUsed))
  const sc = await bundle(`export * from 'styled-components';`, reactExternal)
  console.log(jsRow('styled-components (what @sanity/ui ships today, for reference)', sc))

  console.log('\n## Compiled library JS (dist/index.js, React + next-yak external)\n')
  console.log('| file | minified | gzip | brotli |')
  console.log('| --- | --- | --- | --- |')
  for (const v of [1, 2]) {
    const code = await bundle(
      `export * from '${resolve(root, `packages/ui-v${v}/dist/index.js`)}';`,
      [...reactExternal, /^next-yak/],
    )
    console.log(jsRow(`ui-v${v} dist/index.js (Button + ThemeProvider + themes + tokens)`, code))
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
