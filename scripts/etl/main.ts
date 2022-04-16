import path from 'path'
import {SanityDocument} from '@sanity/client'
import cac from 'cac'
import chalk from 'chalk'
import {extractFromTsdoc} from './extract'
import {extractPackagesFromSanity} from './extract/sanity'
import {loadToFs} from './load/fs'
import {loadToSanity} from './load/sanity'
import {transformTsdocToPortableText} from './transform/tsdocToPortableText'

const ROOT_PATH = path.resolve(__dirname, '../..')

async function main() {
  const cwd = ROOT_PATH // process.cwd()
  const cli = cac()

  cli.option('--quiet', '[boolean] print only crucial logs')

  const {options} = cli.parse()
  const quiet = Boolean(options.quiet)

  try {
    const packages = await extractPackagesFromSanity({quiet})
    const packageResults = await extractFromTsdoc({quiet})

    const docs: SanityDocument[] = []

    for (const [name, pkg] of Object.entries(packages)) {
      const pkgResult = packageResults.find((r) => r.name === name)

      if (!pkgResult) {
        throw new Error(`Package was not found (name=${name})`)
      }

      const {results, version} = pkgResult

      const _docs = transformTsdocToPortableText({
        name,
        package: pkg as SanityDocument | undefined,
        quiet,
        results,
        version,
      })

      await loadToFs({
        cwd,
        name,
        version,
        docs: _docs,
      })

      docs.push(..._docs)
    }

    await loadToSanity(docs)
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${chalk.red('error')} ${quiet ? error.message : error.stack}`)
    }

    process.exit(1)
  }
}

main()
