import fs from 'fs'
import path from 'path'
import util from 'util'
import svgr from '@svgr/core'
import camelCase from 'camelcase'
import glob from 'glob'
import mkdirp from 'mkdirp'
import {format} from 'prettier'

const ROOT_PATH = path.resolve(__dirname, '../../../..')

const _glob = util.promisify(glob)
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const IMPORT_PATH = path.resolve(__dirname, '../export')
const DEST_PATH = path.resolve(__dirname, '../src/icons')

const GENERATED_BANNER = `/*
* AUTO-GENERATED, DO NOT EDIT
*/`

const prettierConfig = JSON.parse(fs.readFileSync(path.resolve(ROOT_PATH, '.prettierrc'), 'utf8'))

async function readIcon(filePath: string) {
  const relativePath = path.relative(IMPORT_PATH, filePath)
  const nameSegments = relativePath.split('/')
  const filename = nameSegments.pop()

  if (!filename) throw new Error('no filename')

  // Add name to segments
  nameSegments.push(...filename.split('.').slice(0, -1))

  const name = nameSegments.join('-')
  const componentName = camelCase(`${name}-icon`, {pascalCase: true})
  const basename = camelCase(name) + 'Icon'
  const contents = await readFile(filePath)
  const svgrJsx = await svgr(
    contents.toString(),
    {icon: true, ref: true, typescript: true},
    {componentName}
  )
  const targetPath = path.resolve(DEST_PATH, `${basename}.tsx`)
  const code = format(
    [
      GENERATED_BANNER,
      svgrJsx
        .replace('* as React', 'React')
        .replace(/"#121923"/g, '"currentColor"')
        .replace('<svg ', `<svg data-sanity-icon="${name}" `),
    ].join('\n\n'),
    {
      ...prettierConfig,
      filepath: targetPath,
    }
  )

  return {
    basename,
    code,
    componentName,
    name,
    relativePath,
    sourcePath: filePath,
    targetPath,
  }
}

async function writeIcon(file: any) {
  await writeFile(file.targetPath, file.code)
}

async function generate() {
  await mkdirp(DEST_PATH)

  const filePaths = (await _glob(path.join(IMPORT_PATH, '**/*.svg'))) as any[]
  const files = await Promise.all(filePaths.map(readIcon))

  files.sort((a, b) => {
    if (a.componentName < b.componentName) {
      return -1
    }

    if (a.componentName > b.componentName) {
      return 1
    }

    return 0
  })

  await Promise.all(files.map(writeIcon))

  const importTypes = `import {IconComponent} from '../types'`

  const iconImports = files
    .map((f) => `import {default as ${f.componentName}} from './${f.basename}';`)
    .join('\n')

  const typesExports = `export type IconSymbol = \n${files.map((f) => `| '${f.name}'`).join('\n')};`

  const iconExports = `export {${files.map((f) => f.componentName).join(',')}}`

  const iconMapInterface = `export interface IconMap {${files
    .map((f) => `'${f.name}': IconComponent`)
    .join(',')}}`

  const iconsExport = `export const icons: IconMap = {${files
    .map((f) => `'${f.name}': ${f.componentName}`)
    .join(',')}}`

  const indexPath = path.resolve(DEST_PATH, `index.ts`)

  const indexTsCode = format(
    [
      GENERATED_BANNER,
      importTypes,
      iconImports,
      typesExports,
      iconExports,
      iconMapInterface,
      iconsExport,
    ].join('\n\n'),
    {
      ...prettierConfig,
      filepath: indexPath,
    }
  )

  await writeFile(indexPath, indexTsCode)
}

generate().catch((err) => {
  console.error(err)
  process.exit(1)
})
