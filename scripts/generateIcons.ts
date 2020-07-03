// @todo: Make this code readable!

import svgr from '@svgr/core'
import camelCase from 'camelcase'
import fs from 'fs'
import glob from 'glob'
import path from 'path'
import {format} from 'prettier'
import util from 'util'

const _glob = util.promisify(glob)
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const IMPORT_PATH = path.resolve(__dirname, '../export/icons')
const DIST_PATH = path.resolve(__dirname, '../src/icon/icons')

const GENERATED_BANNER = `/*
* AUTO-GENERATED, DO NOT EDIT
*/`

const prettierConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', '.prettierrc'), 'utf8')
)

async function generateIcon(filePath: string) {
  const relativePath = path.relative(IMPORT_PATH, filePath)
  const parts = relativePath.split('/')
  const filename = parts.pop()

  if (!filename) throw new Error('no filename')

  const filenameParts = filename.split('.')

  filenameParts.pop()
  parts.push(...filenameParts)

  const name = parts.slice(1).join('-')
  const componentName = camelCase(`${name}-icon`, {pascalCase: true})
  const fileBasename = camelCase(name)
  const contents = await readFile(filePath)
  const svgrJsx = await svgr(contents.toString(), {icon: true, typescript: true}, {componentName})
  const targetPath = path.resolve(DIST_PATH, `${fileBasename}.tsx`)
  const tsxCode = format(
    `${GENERATED_BANNER}\n\n` +
      svgrJsx.replace('* as React', 'React').replace(/"#121923"/g, '"currentColor"'),
    {
      filepath: targetPath,
      ...prettierConfig,
    }
  )

  await writeFile(targetPath, tsxCode)

  return {
    contents,
    sourcePath: filePath,
    targetPath,
    name,
    basename: fileBasename,
    componentName,
    tsxCode,
  }
}

async function generateIcons() {
  const filePaths = (await _glob(path.join(IMPORT_PATH, '**/*.svg'))) as any[]
  const files = await Promise.all(filePaths.map(generateIcon))
  const iconImports = files
    .map((f) => `import {default as ${f.componentName}} from './${f.basename}';`)
    .join('\n')
  const iconExports = `export {${files.map((f) => f.componentName).join(',')}}`
  const defaultExport = `export default {${files
    .map((f) => `'${f.name}': ${f.componentName}`)
    .join(',')}}`
  const typesExports = `export type IconSymbol = \n${files.map((f) => `| '${f.name}'`).join('\n')};`
  const indexPath = path.resolve(DIST_PATH, `index.ts`)
  const indexTsCode = format(
    `${GENERATED_BANNER}\n\n${iconImports}\n\n${typesExports}\n\n${iconExports}\n\n${defaultExport}`,
    {
      filepath: indexPath,
      ...prettierConfig,
    }
  )

  await writeFile(indexPath, indexTsCode)
}

generateIcons().catch((err) => {
  console.log(err)
  process.exit(1)
})
