import fs from 'fs/promises'
import path from 'path'
import {buildTheme as buildUITheme} from '@sanity/ui/theme'
import {compileSystem} from '../compile/compileSystem'
import {compileTheme} from '../compile/compileTheme'

async function buildSystem(outDir: string) {
  const css = compileSystem()

  await fs.mkdir(outDir, {recursive: true})

  await fs.writeFile(path.resolve(outDir, 'system.css'), css, 'utf-8')

  // eslint-disable-next-line no-console
  console.log('- system.css')
}

async function buildTheme(outDir: string) {
  const css = compileTheme(buildUITheme().v2!)

  await fs.mkdir(outDir, {recursive: true})

  await fs.writeFile(path.resolve(outDir, 'sanity-theme.css'), css, 'utf-8')

  // eslint-disable-next-line no-console
  console.log('- sanity-theme.css')
}

export async function buildCommand(options: {cwd?: string; outDir?: string}): Promise<void> {
  const cwd = options.cwd ?? process.cwd()
  const outDir = options.outDir ?? path.resolve(cwd, 'dist')

  await buildSystem(outDir)

  await buildTheme(outDir)
}
