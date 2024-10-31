/* eslint-disable no-console */

import {_compileSystem, _compileTheme} from '@sanity/ui/css'
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

  await buildTheme({cwd, outDir})
  await buildSystem({cwd, outDir})
  await buildAll({cwd, outDir})
}

// @sanity/ui/ui-theme.css
async function buildTheme(options: {cwd: string; outDir: string}) {
  const {cwd, outDir} = options
  const css = await prettify(_compileTheme())
  const minified = await minify(css)
  const prettified = await prettify(css)

  const cssFile = path.resolve(outDir, 'ui-theme.css')
  const minCssFile = path.resolve(outDir, 'ui-theme.min.css')

  await fs.mkdir(outDir, {recursive: true})
  await fs.writeFile(cssFile, prettified, 'utf-8')
  await fs.writeFile(minCssFile, minified.css, 'utf-8')

  console.log(`- built ${path.relative(cwd, cssFile)} (${prettySize(prettified)})`)
  console.log(`- built ${path.relative(cwd, minCssFile)} (${prettySize(minified.css)})`)
}

// @sanity/ui/ui-system.css
async function buildSystem(options: {cwd: string; outDir: string}) {
  const {cwd, outDir} = options
  const css = await prettify(_compileSystem())
  const minified = await minify(css)
  const prettified = await prettify(css)

  const cssFile = path.resolve(outDir, 'ui-system.css')
  const minCssFile = path.resolve(outDir, 'ui-system.min.css')

  await fs.mkdir(outDir, {recursive: true})
  await fs.writeFile(cssFile, prettified, 'utf-8')
  await fs.writeFile(minCssFile, minified.css, 'utf-8')

  console.log(`- built ${path.relative(cwd, cssFile)} (${prettySize(prettified)})`)
  console.log(`- built ${path.relative(cwd, minCssFile)} (${prettySize(minified.css)})`)
}

// @sanity/ui/ui.css
async function buildAll(options: {cwd: string; outDir: string}) {
  const {cwd, outDir} = options
  const css = await prettify(
    [
      `/* @sanity/ui/ui-theme.css */\n`,
      _compileTheme(),
      `\n\n/* @sanity/ui/ui-system.css */\n`,
      _compileSystem(),
      `\n`,
    ].join(''),
  )

  const minified = await minify(css)
  const prettified = await prettify(css)

  const cssFile = path.resolve(outDir, 'ui.css')
  const minCssFile = path.resolve(outDir, 'ui.min.css')

  await fs.mkdir(outDir, {recursive: true})
  await fs.writeFile(cssFile, prettified, 'utf-8')
  await fs.writeFile(minCssFile, minified.css, 'utf-8')

  console.log(`- built ${path.relative(cwd, cssFile)} (${prettySize(prettified)})`)
  console.log(`- built ${path.relative(cwd, minCssFile)} (${prettySize(minified.css)})`)
}

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
