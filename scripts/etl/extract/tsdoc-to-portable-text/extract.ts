import path from 'path'
import {extract, ExtractorMessage, ExtractResult} from '@sanity/tsdoc-to-portable-text'
import chalk from 'chalk'
import {isRecord, isString, readJSONFile} from '../../helpers'

const ROOT_PATH = path.resolve(__dirname, '../../../..')

export interface PackageResult {
  name: string
  results: ExtractResult[]
  version: string
}

export function extractFromTsdoc(options: {quiet: boolean}): Promise<PackageResult[]> {
  const {quiet} = options

  return Promise.all([
    _extractPackage({name: 'color', quiet}),
    _extractPackage({name: 'icons', quiet}),
    _extractPackage({name: 'logos', quiet}),
    _extractPackage({name: 'ui', quiet}),
  ])
}

async function _extractPackage(options: {name: string; quiet: boolean}): Promise<PackageResult> {
  const {name, quiet} = options

  if (!quiet) {
    console.log(`${chalk.blue('info')} [@sanity/${name}] Extract from TSDoc`)
  }

  const packagePath = path.resolve(ROOT_PATH, 'packages', '@sanity', name)
  const packageJsonPath = path.resolve(packagePath, 'package.json')
  const pkg = await readJSONFile(packageJsonPath)

  if (!isRecord(pkg)) {
    throw new Error('The package manifest is not an object')
  }

  const version = pkg.version

  if (!isString(version)) {
    throw new Error(`the package version is not a string (value=${JSON.stringify(version)})`)
  }

  const results = await extract(packagePath, {
    tsconfigPath: 'tsconfig.extract.json',
  })

  const messages = results.reduce<ExtractorMessage[]>((acc, x) => acc.concat(x.messages), [])

  for (const msg of messages) {
    const sourceFilePath = msg.sourceFilePath && path.relative(ROOT_PATH, msg.sourceFilePath)

    if (msg.logLevel === 'error') {
      console.log(
        [
          `${chalk.cyan(sourceFilePath || '?')}`,
          `:${chalk.yellow(msg.sourceFileLine)}:${chalk.yellow(msg.sourceFileColumn)}`,
          ` - ${chalk.red('error')} ${chalk.gray(msg.messageId)}\n`,
          msg.text,
          '\n',
        ].join('')
      )
    }

    if (!quiet && msg.logLevel === 'warning') {
      console.log(
        [
          `${chalk.cyan(sourceFilePath || '?')}`,
          `:${chalk.yellow(msg.sourceFileLine)}:${chalk.yellow(msg.sourceFileColumn)}`,
          ` - ${chalk.yellow('warning')} ${chalk.gray(msg.messageId)}\n`,
          msg.text,
          '\n',
        ].join('')
      )
    }
  }

  const hasErrors = messages.filter((msg) => msg.logLevel === 'error').length

  if (hasErrors > 0) {
    throw new Error(`[@sanity/${name}] Extracting from TSDoc failed`)
  }

  console.log(`${chalk.green('success')} [@sanity/${name}] Extracted from TSDoc`)

  return {name, results, version}
}
