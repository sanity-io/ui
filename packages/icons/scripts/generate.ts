// oxlint-disable no-console

import {readFile, writeFile} from 'fs/promises'
import path from 'path'
import prettierConfig from '@sanity/prettier-config'
import {transform} from '@svgr/core'
import camelCase from 'camelcase'
import {globby} from 'globby'
import {mkdirp} from 'mkdirp'
import {format} from 'prettier'

const ROOT_PATH = path.resolve(__dirname, '..')
const IMPORT_PATH = path.resolve(ROOT_PATH, 'export')
const SRC_ICONS_PATH = path.resolve(ROOT_PATH, 'src/icons')

const GENERATED_BANNER = `/* THIS FILE IS AUTO-GENERATED – DO NOT EDIT */`

const __TEMPLATE__ = `/* THIS FILE IS AUTO-GENERATED – DO NOT EDIT */

import {forwardRef, type ForwardRefExoticComponent, type RefAttributes, type SVGProps} from 'react'

/**
 * @public
 */
export const __NAME__: ForwardRefExoticComponent<
  Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>
> = forwardRef(function __NAME__(props, ref) {
  return (
    __JSX__
  )
});
__NAME__.displayName = 'ForwardRef(__NAME__)'
`

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
  const targetPath = path.resolve(SRC_ICONS_PATH, `${basename}.tsx`)

  // Read SVG markup
  const svgMarkupBuf = await readFile(filePath)

  let code = await transform(
    svgMarkupBuf.toString(),
    {icon: true, ref: true, typescript: true},
    {componentName},
  )

  code = __TEMPLATE__.replace(/__JSX__/g, code)

  code = code.replace(/__NAME__/g, componentName)

  code = code.replace(
    /xmlns="http:\/\/www.w3.org\/2000\/svg"/g,
    ' xmlns="http://www.w3.org/2000/svg" {...props} ref={ref}',
  )

  code = code.replace(/width="25"/g, `width="1em"`)
  code = code.replace(/height="25"/g, `height="1em"`)

  code = code.replace(/stroke-width=/g, `strokeWidth=`)
  code = code.replace(/stroke-linecap=/g, `strokeLinecap=`)
  code = code.replace(/stroke-linejoin=/g, `strokeLinejoin=`)
  code = code.replace(/clip-rule=/g, `clipRule=`)
  code = code.replace(/fill-rule=/g, `fillRule=`)

  // replace `="0.5"` with `={0.5}`
  code = code.replace(/="(\d+(?:\.\d+)?)"/g, '={$1}')

  // Replace hex values with `currentColor`
  code = code
    .replace(/"#([0-9a-fA-F]{6})"/g, '"currentColor"')
    .replace('<svg ', `<svg data-sanity-icon="${name}" `)

  code = await format(code, {...prettierConfig, filepath: targetPath})

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
  await mkdirp(SRC_ICONS_PATH)

  const filePaths = await globby(path.join(IMPORT_PATH, '**/*.svg'))
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

  const importTypes = `import type {IconComponent} from '../types'`

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

  const indexPath = path.resolve(SRC_ICONS_PATH, `index.ts`)

  const indexTsCode = await format(
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
    },
  )

  await writeFile(indexPath, indexTsCode)

  console.log(`generated ${files.length} icons:`, files.map((f) => f.name).join(', '))
}

generate().catch((err) => {
  console.error(err)
  process.exit(1)
})
