/* eslint-disable no-console */

import {exec as execCb} from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {promisify} from 'node:util'

import pkg from '../package.json'
import tsconfig from '../tsconfig.dist.json'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const exec = promisify(execCb)

const copyFiles = ['package.config.ts', 'package.json', 'tsconfig.dist.json']

async function prebuild() {
  const packagePath = path.resolve(__dirname, '..')

  const distPath = path.resolve(packagePath, 'dist')
  const pass1Path = path.resolve(packagePath, 'tmp/pass-1')

  const rel = (p: string) => path.relative(packagePath, path.resolve(packagePath, p))

  // remove `tmp` directory
  await fs.rm(pass1Path, {force: true, recursive: true})
  console.log(`- removed ${rel(pass1Path)}`)

  // await fs.mkdir(path.resolve(pass1Path), {recursive: true})
  // console.log(`- created ${rel(path.resolve(pass1Path))}`)

  const includePaths = tsconfig.include ?? []
  for (const includePath of includePaths) {
    const fromPath = path.resolve(packagePath, includePath)
    const toPath = path.resolve(pass1Path, includePath)

    await fs.cp(fromPath, toPath, {recursive: true})
    console.log(`- copied ${rel(fromPath)} to ${rel(toPath)}`)
  }

  // await fs.cp(path.resolve(packagePath, 'package.json'), path.resolve(pass1Path, 'package.json'))
  // console.log(
  //   `- copied ${rel(path.resolve(packagePath, 'package.json'))} to ${rel(path.resolve(pass1Path, 'package.json'))}`,
  // )
  // await fs.cp(
  //   path.resolve(packagePath, 'tsconfig.dist.json'),
  //   path.resolve(pass1Path, 'tsconfig.dist.json'),
  // )
  // console.log(
  //   `- copied ${rel(path.resolve(packagePath, 'tsconfig.dist.json'))} to ${rel(path.resolve(pass1Path, 'tsconfig.dist.json'))}`,
  // )

  for (const copyFile of copyFiles) {
    await fs.cp(path.resolve(packagePath, copyFile), path.resolve(pass1Path, copyFile))
    console.log(
      `- copied ${rel(path.resolve(packagePath, copyFile))} to ${rel(path.resolve(pass1Path, copyFile))}`,
    )
  }

  // write `export {}` to `dist/exports/index.ts`
  await fs.writeFile(path.resolve(pass1Path, 'exports/index.ts'), `export {};`)
  console.log(`- wrote ${rel(path.resolve(pass1Path, 'exports/index.ts'))}`)

  // symlink `dist/node_modules` to `node_modules`
  await fs.symlink(
    path.resolve(packagePath, 'node_modules'),
    path.resolve(pass1Path, 'node_modules'),
  )
  console.log(
    `- symlinked ${rel(path.resolve(packagePath, 'node_modules'))} to ${rel(path.resolve(pass1Path, 'node_modules'))}`,
  )

  // remove `prebuild` script from `dist/package.json`
  await fs.writeFile(
    path.resolve(pass1Path, 'package.json'),
    JSON.stringify(
      {
        ...pkg,
        scripts: {
          ...pkg.scripts,
          prebuild: undefined,
        },
      },
      null,
      2,
    ),
  )
  console.log(`- removed prebuild script from ${rel(path.resolve(pass1Path, 'package.json'))}`)

  // run `pnpm build` in `tmp/pass-1`
  await exec(`pnpm build`, {cwd: path.resolve(pass1Path)})
  console.log(`- built ${rel(path.resolve(pass1Path))}`)

  // remove `dist` directory
  await fs.rm(distPath, {force: true, recursive: true})
  console.log(`- removed ${rel(distPath)}`)

  // copy contents of `dist/*` to `dist/`
  await fs.cp(path.resolve(pass1Path, 'dist'), path.resolve(distPath), {
    recursive: true,
  })
  console.log(`- copied ${rel(path.resolve(pass1Path, 'dist'))} to ${rel(distPath)}`)
}

prebuild().catch((err) => {
  console.error(err)
  process.exit(1)
})
