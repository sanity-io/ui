/* eslint-disable no-console */

import fs from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function prebuild() {
  const packagePath = path.resolve(__dirname, '..')

  const _rel = (p: string) => path.relative(packagePath, path.resolve(packagePath, p))

  const exportsPath = path.resolve(packagePath, 'exports')
  const distPath = path.resolve(packagePath, 'dist')

  // remove `dist` directory
  await fs.rm(distPath, {force: true, recursive: true})
  console.log(`- removed ${_rel(distPath)}`)

  // make `dist` directory
  await fs.mkdir(distPath, {recursive: true})
  console.log(`- created ${_rel(distPath)}`)

  // copy `exports/index.css` to `dist/index.css`
  await fs.cp(path.resolve(exportsPath, 'index.css'), path.resolve(distPath, 'index.css'))
  console.log(
    `- copied ${_rel(path.resolve(exportsPath, 'index.css'))} to ${_rel(path.resolve(distPath, 'index.css'))}`,
  )
}

prebuild().catch((err) => {
  console.error('prebuild failed:', err)
  process.exit(1)
})
