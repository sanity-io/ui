#!/usr/bin/env node
// Checks the FORK Vite plugin (@sanity/vanilla-extract-vite-plugin — what compiles `sanity`'s own
// .css.ts for the module CDN bundle in package.bundle.ts) with a custom `identifiers` function.
//
// 1. The prototype libraries themselves: this fails today, independent of naming. The fork's
//    compiler resolves `@vanilla-extract/*` with the `module` condition (ESM build) and
//    externalizes `@vanilla-extract/recipes` as well, whose own Node import of
//    `@vanilla-extract/css` lands on the CJS build — two `fileScope` instances, hence "Styles were
//    unable to be assigned to a file". Upstream's vite-plugin compiles the same modules fine
//    (scripts/build-upstream-vite.mjs); sanity-io/sanity uses no recipes, so it never hits this.
// 2. A recipe-free module (style, styleVariants, createVar, keyframes, createThemeContract,
//    createTheme): the custom function is applied to every identifier.
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs'
import {resolve} from 'node:path'

import {vanillaExtractPlugin} from '@sanity/vanilla-extract-vite-plugin'
import {build} from 'vite'

import {ROOT, libDir} from './lib/paths.mjs'

async function buildWith(root, identifiers, outDir) {
  await build({
    root,
    configFile: false,
    logLevel: 'silent',
    plugins: [vanillaExtractPlugin(identifiers ? {identifiers} : {})],
    esbuild: {jsx: 'automatic'},
    build: {
      outDir,
      emptyOutDir: true,
      minify: false,
      cssMinify: false,
      lib: {entry: resolve(root, 'src/index.ts'), formats: ['es'], fileName: 'index', cssFileName: 'styles'},
      rolldownOptions: {external: [/^react(\/|$)/, /^@vanilla-extract\//]},
    },
  })
  return [...new Set(readFileSync(resolve(outDir, 'styles.css'), 'utf8').match(/\.[\w-]+|@keyframes \S+/g) ?? [])]
}

const salted = ({hash}) => `v1x${hash}`

// 1. the real prototype library (uses @vanilla-extract/recipes)
try {
  await buildWith(libDir('lib-v1'), salted, resolve(ROOT, 'node_modules/.cache/fork-vite/lib-v1'))
  console.log('lib-v1 through @sanity/vanilla-extract-vite-plugin: built')
} catch (error) {
  const message = String(error?.errors?.[0]?.message ?? error?.message ?? error).split('\n')[0]
  console.log(`lib-v1 through @sanity/vanilla-extract-vite-plugin: FAILS (fork limitation with @vanilla-extract/recipes, not naming): ${message}`)
}

// 2. a recipe-free module
const fixture = resolve(ROOT, 'node_modules/.cache/fork-vite/norecipe')
mkdirSync(resolve(fixture, 'src'), {recursive: true})
writeFileSync(resolve(fixture, 'package.json'), JSON.stringify({name: '@css-eval/norecipe', version: '1.0.0', type: 'module'}))
writeFileSync(
  resolve(fixture, 'src/a.css.ts'),
  `import {createTheme, createThemeContract, createVar, keyframes, style, styleVariants} from '@vanilla-extract/css'
export const vars = createThemeContract({bg: null})
export const theme = createTheme(vars, {bg: 'red'})
export const accent = createVar()
export const spin = keyframes({from: {opacity: 0}, to: {opacity: 1}})
export const root = style({background: vars.bg, outlineColor: accent, animation: \`\${spin} 1s\`})
export const tones = styleVariants({a: {color: 'red'}, b: {color: 'blue'}})
`,
)
writeFileSync(resolve(fixture, 'src/index.ts'), `export * from './a.css'\n`)
for (const [label, identifiers] of [
  ['default identifiers', undefined],
  ['custom function    ', salted],
]) {
  const names = await buildWith(fixture, identifiers, resolve(fixture, `dist-${label.trim().replace(/\s+/g, '-')}`))
  console.log(`recipe-free module, ${label}: ${names.join(' ')}`)
}
