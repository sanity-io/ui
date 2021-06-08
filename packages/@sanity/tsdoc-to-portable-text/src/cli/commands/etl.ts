import path from 'path'
import chalk from 'chalk'
import pkgUp from 'pkg-up'
import {extract} from '../../extract'
import {load} from '../../load'
import {transform} from '../../transform'
import {readJSONFile} from '../helpers'
import {CmdFn} from '../types'

export const etl: CmdFn = async ({args, cwd, flags}) => {
  const inputPath = args[0]

  if (typeof inputPath !== 'string') {
    throw new Error('missing input')
  }

  const outDir = typeof flags.outDir === 'string' ? flags.outDir : '.'
  const tsconfigPath = typeof flags.tsconfig === 'string' ? flags.tsconfig : 'tsconfig.json'

  const packageJsonPath = await pkgUp({cwd})

  if (!packageJsonPath) {
    throw new Error('package.json not found')
  }

  const pkg = await readJSONFile(packageJsonPath)

  if (!pkg.name) {
    throw new Error('package.json is missing name')
  }

  if (!pkg.version) {
    throw new Error('package.json is missing version')
  }

  const packagePath = path.dirname(packageJsonPath)

  const result = await extract(inputPath, {
    packagePath,
    tsconfigPath,
  })

  for (const msg of result.messages) {
    if (msg.logLevel === 'error') {
      console.log(`${chalk.red('error')} ${msg.text}`)
    }

    if (msg.logLevel === 'warning') {
      console.log(`${chalk.yellow('warning')} ${msg.text}`)
    }
  }

  const docs = transform(result, {package: {version: pkg.version}})

  const jsonPath = path.resolve(packagePath, outDir, `${pkg.version}.json`)

  await load(docs, {fs: {path: jsonPath}})

  console.log(
    `${chalk.green('success')} wrote documents to ${path.relative(packagePath, jsonPath)}`
  )
}
