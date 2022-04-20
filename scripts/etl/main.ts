import path from 'path'
import {SanityDocument} from '@sanity/client'
import cac from 'cac'
import chalk from 'chalk'
import {_parsePackageName} from './_helpers'
import {config} from './config'
import {extractFromTsdoc, extractPackagesFromSanity} from './extract'
import {loadToFs, loadToSanity} from './load'
import {transformTsdocToPortableText} from './transform'

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

    for (const fullName of config.workspace) {
      const [scope, name] = _parsePackageName(fullName)
      const pkg = packages.find((p) => p.scope === scope && p.name === name)
      const pkgResult = packageResults.find((r) => r.name === name)

      if (!pkgResult) {
        throw new Error(`Package was not found (name=${name})`)
      }

      const {results, version} = pkgResult

      const _docs = transformTsdocToPortableText({
        scope,
        name,
        package: pkg as SanityDocument | undefined,
        quiet,
        results,
        version,
      })

      await loadToFs({
        cwd,
        scope,
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
