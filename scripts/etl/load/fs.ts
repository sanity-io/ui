import {writeFile} from 'fs/promises'
import path from 'path'
import {SanityDocument} from '@sanity/client'
import chalk from 'chalk'
import mkdirp from 'mkdirp'

const etcPath = path.resolve(__dirname, '../../../etc')

export async function loadToFs(options: {
  cwd: string
  name: string
  docs: SanityDocument[]
  version: string
}): Promise<void> {
  const {cwd, name, docs, version} = options

  const packagePath = path.resolve(etcPath, '@sanity', name)

  await mkdirp(packagePath)

  const filePath = path.resolve(packagePath, `${version}.json`)

  await writeFile(filePath, JSON.stringify(docs, null, 2))

  // prettier-ignore
  console.log(
    `${chalk.green('success')} [@sanity/${name}] Loaded ${docs.length} documents to ${path.relative(cwd, filePath)}`
  )
}
