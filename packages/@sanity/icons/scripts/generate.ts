import fs from 'fs'
import path from 'path'
import util from 'util'
import {transform} from '@svgr/core'
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

const GENERATED_BANNER = `/* THIS FILE IS AUTO-GENERATED – DO NOT EDIT */`

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
  const targetPath = path.resolve(DEST_PATH, `${basename}.tsx`)

  // Read SVG markup
  const svgMarkupBuf = await readFile(filePath)

  let code = await transform(
    svgMarkupBuf.toString(),
    {icon: true, ref: true, typescript: true},
    {componentName}
  )

  // replace: prettify importing
  code = code.replace('import * as React from "react";', 'import {forwardRef} from "react";')

  // replace: remove unnecessary imports
  code = code.replace('import { SVGProps, Ref, forwardRef } from "react";', '')

  // replace: add `@public` tag and wrap in `forwardRef`
  code = code.replace(
    `const ${componentName} = (`,
    `/**\n * @public\n */\nexport const ${componentName} = forwardRef(function ${componentName} (`
  )

  // replace: fix typing
  code = code.replace('props: SVGProps<SVGSVGElement>', 'props: React.SVGProps<SVGSVGElement>')

  // replace: fix typing
  code = code.replace(
    'ref: Ref<SVGSVGElement>) =>',
    // @todo: use `React.ForwardedRef` here (breaking change)
    'ref: React.Ref<SVGSVGElement>) {\nreturn ('
  )

  // replace: wrap in `forwardRef`
  code = code.replace('</svg>;', '</svg>); })')

  // replace: emove unecessary code
  code = code.replace(`const ForwardRef = forwardRef(${componentName});`, '')
  code = code.replace('export default ForwardRef;', '')

  // replace: add generated banner
  code = GENERATED_BANNER + '\n\n' + code

  // Replace Sanity black hex value with `currentColor`
  code = code
    .replace(/"#121923"/g, '"currentColor"')
    .replace('<svg ', `<svg data-sanity-icon="${name}" `)

  code = format(code, {...prettierConfig, filepath: targetPath})

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

async function writeIcon(file: {code: string; targetPath: string}) {
  await writeFile(file.targetPath, file.code)
}

async function generate() {
  await mkdirp(DEST_PATH)

  const filePaths = await _glob(path.join(IMPORT_PATH, '**/*.svg'))
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
    .map((f) => `import {${f.componentName}} from './${f.basename}';`)
    .join('\n')

  const typesExports = `/**\n * @public\n */\nexport type IconSymbol = \n${files
    .map((f) => `| '${f.name}'`)
    .join('\n')};`

  const iconExports = `export {${files.map((f) => f.componentName).join(',')}}`

  const iconMapInterface = `/**\n * @public\n */\nexport interface IconMap {${files
    .map((f) => `'${f.name}': IconComponent`)
    .join(',')}}`

  const iconsExport = `/**\n * @public\n */\nexport const icons: IconMap = {${files
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
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})
