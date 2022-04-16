import {SanityDocument} from '@sanity/client'
import {ExtractResult, transform} from '@sanity/tsdoc-to-portable-text'
import chalk from 'chalk'

export function transformTsdocToPortableText(options: {
  name: string
  package?: SanityDocument
  quiet: boolean
  results: ExtractResult[]
  version: string
}): SanityDocument[] {
  const {name, package: pkg, quiet, results, version} = options

  if (!quiet) {
    console.log(`${chalk.blue('info')} [@sanity/${name}] Transform ...`)
  }

  const docs = transform(results, {package: {version}, currPackageDoc: pkg})

  console.log(`${chalk.green('success')} [@sanity/${name}] Transformed ${docs.length} documents`)

  return docs as SanityDocument[]
}
