/* eslint-disable no-console */

import {_compilePalette, _compileSystem, _compileTheme} from '@sanity/ui/css'
import {buildTheme_v3, RootTheme} from '@sanity/ui/theme'
import cssnano from 'cssnano'
import fs from 'fs/promises'
import {gzipSizeSync} from 'gzip-size'
import path from 'path'
import postcss from 'postcss'
import {format, resolveConfig} from 'prettier'
import prettyBytes from 'pretty-bytes'

export async function buildCommand(options: {cwd?: string; outDir?: string}): Promise<void> {
  const cwd = options.cwd ?? process.cwd()
  const outDir = options.outDir ?? path.resolve(cwd, 'dist')

  await Promise.all([
    buildPalette(outDir),
    buildTheme(outDir),
    buildSystem(outDir),
    buildAll(outDir),
  ])
}

//

async function minify(css: string) {
  return postcss([cssnano()]).process(css, {from: undefined})
}

async function prettify(css: string) {
  const options = await resolveConfig(__dirname)

  if (!options) {
    throw new Error('Prettier config not found')
  }

  return format(css, {...options, filepath: 'index.css', printWidth: 9999})
}

function prettySize(str: string) {
  return `${prettyBytes(str.length)} / ${prettyBytes(gzipSizeSync(str))}`
}

// @sanity/ui/ui-palette.css
async function buildPalette(outDir: string) {
  const css = _compilePalette()
  const minified = await minify(css)
  const prettified = await prettify(css)

  await fs.mkdir(outDir, {recursive: true})
  await fs.writeFile(path.resolve(outDir, 'ui-palette.css'), prettified, 'utf-8')
  await fs.writeFile(path.resolve(outDir, 'ui-palette.min.css'), minified.css, 'utf-8')

  console.log(`- built ui-palette.css (${prettySize(prettified)})`)
  console.log(`- built ui-palette.min.css (${prettySize(minified.css)})`)
}

// @sanity/ui/ui-theme.css
async function buildTheme(outDir: string) {
  const css = await prettify(_compileTheme({v3: buildTheme_v3()} as RootTheme))
  const minified = await minify(css)
  const prettified = await prettify(css)

  await fs.mkdir(outDir, {recursive: true})
  await fs.writeFile(path.resolve(outDir, 'ui-theme.css'), prettified, 'utf-8')
  await fs.writeFile(path.resolve(outDir, 'ui-theme.min.css'), minified.css, 'utf-8')

  console.log(`- built ui-theme.css (${prettySize(prettified)})`)
  console.log(`- built ui-theme.min.css (${prettySize(minified.css)})`)
}

// @sanity/ui/ui-system.css
async function buildSystem(outDir: string) {
  const css = await prettify(_compileSystem())
  const minified = await minify(css)
  const prettified = await prettify(css)

  await fs.mkdir(outDir, {recursive: true})
  await fs.writeFile(path.resolve(outDir, 'ui-system.css'), prettified, 'utf-8')
  await fs.writeFile(path.resolve(outDir, 'ui-system.min.css'), minified.css, 'utf-8')

  console.log(`- built ui-system.css (${prettySize(prettified)})`)
  console.log(`- built ui-system.min.css (${prettySize(minified.css)})`)
}

// @sanity/ui/ui.css
async function buildAll(outDir: string) {
  const css = await prettify(
    [
      `/* @sanity/ui/ui-palette.css */\n`,
      _compilePalette(),
      `\n\n/* @sanity/ui/ui-theme.css */\n`,
      _compileTheme({v3: buildTheme_v3()} as RootTheme),
      `\n\n/* @sanity/ui/ui-system.css */\n`,
      _compileSystem(),
      `\n`,
    ].join(''),
  )

  const minified = await minify(css)
  const prettified = await prettify(css)

  await fs.mkdir(outDir, {recursive: true})
  await fs.writeFile(path.resolve(outDir, 'ui.css'), prettified, 'utf-8')
  await fs.writeFile(path.resolve(outDir, 'ui.min.css'), minified.css, 'utf-8')

  console.log(`- built ui.css (${prettySize(prettified)})`)
  console.log(`- built ui.min.css (${prettySize(minified.css)})`)
}
