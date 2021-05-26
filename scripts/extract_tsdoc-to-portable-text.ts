import path from 'path'
import {extract} from '@sanity/tsdoc-to-portable-text'
import chalk from 'chalk'

const CWD = process.cwd()
const ROOT_PATH = path.resolve(__dirname, '..')

const IGNORE_MSG_IDS = ['ae-internal-missing-underscore']

async function extractPackage(name: string) {
  console.log(`--- Extracting API from ${name} ---`)
  const t = Date.now()

  const packagePath = path.resolve(ROOT_PATH, './packages', name)

  const result = await extract('lib/esm/index.d.ts', {
    packagePath,
    tsconfigPath: 'tsconfig.extract.json',
  })

  for (const msg of result.messages) {
    if (IGNORE_MSG_IDS.includes(msg.messageId)) {
      continue
    }

    const sourceFilePath = msg.sourceFilePath && path.relative(CWD, msg.sourceFilePath)

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

    if (msg.logLevel === 'warning') {
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

  const hasErrors = result.messages.filter((msg) => msg.logLevel === 'error').length

  if (hasErrors > 0) {
    process.exit(1)
  }

  console.log(`Extracted API from ${name} in ${((Date.now() - t) / 1000).toFixed(3)} seconds\n`)
}

async function extractTsdocToPortableText() {
  // Newline
  console.log('')

  await extractPackage('@sanity/color')
  await extractPackage('@sanity/icons')
  await extractPackage('@sanity/logos')
  await extractPackage('@sanity/ui')
}

extractTsdocToPortableText().catch((error) => {
  console.log(`${chalk.red('error')} ${error.message}`)
  process.exit(0)
})
