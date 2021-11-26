import path from 'path'
import createSanityClient from '@sanity/client'
import {extract, SanityDocumentValue, transform} from '@sanity/tsdoc-to-portable-text'
import chalk from 'chalk'
import {readJSONFile} from './helpers'

const ROOT_PATH = path.resolve(__dirname, '../..')

const config = {
  sanity: {
    projectId: getEnv('SANITY_PROJECT_ID'),
    dataset: getEnv('SANITY_DATASET'),
    token: process.env.SANITY_API_TOKEN,
  },
}

function getEnv(key: string) {
  const val = process.env[key]

  if (val === undefined) {
    throw new Error(`missing environment variable: ${key}`)
  }

  return val
}

async function extractPackage(name: string, currPackageDoc?: SanityDocumentValue) {
  const packagePath = path.resolve(ROOT_PATH, './packages', name)
  const packageJsonPath = path.resolve(packagePath, 'package.json')
  const pkg = await readJSONFile(packageJsonPath)

  const result = await extract('lib/src/index.d.ts', {
    packagePath,
    tsconfigPath: 'tsconfig.extract.json',
  })

  for (const msg of result.messages) {
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

  const docs = transform(result, {package: {version: pkg.version}, currPackageDoc})

  return docs
}

async function extractTsdocToPortableText() {
  let data: {[key: string]: SanityDocumentValue} = {}

  if (config.sanity.token) {
    const sanityClient = createSanityClient({
      ...config.sanity,
      apiVersion: '2021-06-01',
      useCdn: false,
    })

    data = await sanityClient.fetch(`{
      'color': *[_type == 'api.package' && name == 'color'][0],
      'icons': *[_type == 'api.package' && name == 'icons'][0],
      'logos': *[_type == 'api.package' && name == 'logos'][0],
      'ui': *[_type == 'api.package' && name == 'ui'][0]
    }`)
  }

  const packages = await Promise.all([
    extractPackage('@sanity/color', data.color),
    extractPackage('@sanity/icons', data.icons),
    extractPackage('@sanity/logos', data.logos),
    extractPackage('@sanity/ui', data.ui),
  ])

  const docs = packages.reduce((acc, docs) => acc.concat(docs))

  if (config.sanity.token) {
    const sanityClient = createSanityClient({
      ...config.sanity,
      apiVersion: '2021-06-01',
      useCdn: false,
    })

    let tx = sanityClient.transaction()

    for (const doc of docs) {
      tx = tx.createOrReplace(doc)
    }

    await tx.commit()
  } else {
    console.log(
      `no token provided - skipped writing docs to Sanity (${config.sanity.projectId}:${config.sanity.dataset})`
    )
  }
}

extractTsdocToPortableText().catch((error) => {
  console.log(`${chalk.red('error')} ${error.message}`)
  process.exit(0)
})
