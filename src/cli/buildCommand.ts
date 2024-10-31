import {compilePalette, compileSystem, compileTheme} from '@sanity/ui/css'
import {buildTheme_v3, defaultPalette, RootTheme} from '@sanity/ui/theme'
import fs from 'fs/promises'
import path from 'path'

async function buildPalette(outDir: string) {
  const css = compilePalette(defaultPalette)

  await fs.mkdir(outDir, {recursive: true})

  await fs.writeFile(path.resolve(outDir, 'sanity-palette.css'), css, 'utf-8')

  // eslint-disable-next-line no-console
  console.log('- sanity-palette.css')
}

async function buildTheme(outDir: string) {
  const css = compileTheme({v3: buildTheme_v3()} as RootTheme)

  await fs.mkdir(outDir, {recursive: true})

  await fs.writeFile(path.resolve(outDir, 'sanity-theme.css'), css, 'utf-8')

  // eslint-disable-next-line no-console
  console.log('- sanity-theme.css')
}

async function buildSystem(outDir: string) {
  const css = compileSystem()

  await fs.mkdir(outDir, {recursive: true})

  await fs.writeFile(path.resolve(outDir, 'system.css'), css, 'utf-8')

  // eslint-disable-next-line no-console
  console.log('- system.css')
}

export async function buildCommand(options: {cwd?: string; outDir?: string}): Promise<void> {
  const cwd = options.cwd ?? process.cwd()
  const outDir = options.outDir ?? path.resolve(cwd, 'dist')

  await buildPalette(outDir)

  await buildTheme(outDir)

  await buildSystem(outDir)
}
