// oxlint-disable no-console

import {readFile, writeFile} from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

import {transform} from '@svgr/core'
import camelCase from 'camelcase'
import {globby} from 'globby'
import {mkdirp} from 'mkdirp'
import {format, type FormatConfig} from 'oxfmt'

import formatConfig from '../.oxfmtrc.json' with {type: 'json'}

const ROOT_PATH = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const IMPORT_PATH = path.resolve(ROOT_PATH, 'export')
const SRC_EXPORTS_PATH = path.resolve(ROOT_PATH, 'src/exports')
const SRC_INDEX_PATH = path.resolve(ROOT_PATH, 'src/index.ts')
// The `icons` map lives in a flat `src/icons.ts` (not `src/icons/index.ts`). The basename
// matters: tsdown/rolldown derives declaration chunk names from the source basename, and a
// second `index` module would collide with the root barrel's `index.d.ts` and swap them.
const SRC_ICONS_PATH = path.resolve(ROOT_PATH, 'src/icons.ts')

const GENERATED_BANNER = `/* THIS FILE IS AUTO-GENERATED – DO NOT EDIT */`

// Every icon lives in its own module under `src/exports`, which is also a build entry point
// (see `tsdown.config.ts`). Each is exposed both as a named export – so it stays interchangeable
// with the barrel import `import {AccessDeniedIcon} from '@sanity/icons'` – and as the default
// export, so `React.lazy(() => import('@sanity/icons/AccessDenied'))` works out of the box.
const __TEMPLATE__ = `/* THIS FILE IS AUTO-GENERATED – DO NOT EDIT */

import type {ComponentPropsWithRef, ReactElement} from 'react'

/**
 * @public
 */
export function __NAME__(props: ComponentPropsWithRef<'svg'>): ReactElement {
  return (
    __JSX__
  )
}

export {__NAME__ as default}
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
  // The public subpath is the PascalCase name *without* the `Icon` suffix, so the icon defined
  // in `src/exports/AccessDenied.tsx` is published as `@sanity/icons/AccessDenied`.
  const exportName = camelCase(name, {pascalCase: true})
  const targetPath = path.resolve(SRC_EXPORTS_PATH, `${exportName}.tsx`)

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
    ' xmlns="http://www.w3.org/2000/svg" {...props}',
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

  code = (await format(targetPath, code, formatConfig as unknown as FormatConfig)).code

  return {
    code,
    componentName,
    exportName,
    name,
    relativePath,
    sourcePath: filePath,
    targetPath,
  }
}

async function writeIcon(file: {code: string; targetPath: string}) {
  await writeFile(file.targetPath, file.code)
}

interface IconMeta {
  componentName: string
  exportName: string
  name: string
}

// The barrel exposes every icon from its dedicated `./exports/<ExportName>` module – the very
// same module that backs the individual `@sanity/icons/<ExportName>` subpath export – so the two
// import styles stay interchangeable and the bundler can de-duplicate them into shared chunks.
//
// Each icon is exported as a `const` alias of the subpath module's default export, carrying an
// `@deprecated` TSDoc tag. This deprecates the *barrel import* of the icon only – the same
// component imported from its own subpath (or via the `icons` map and `<Icon>`) is not
// deprecated – nudging users towards per-icon imports, which avoid barrel file performance
// issues. The explicit `typeof` annotation is required by isolated declarations and keeps the
// barrel export's type identical to the subpath export's.
async function writeRootIndex(files: IconMeta[]) {
  const iconImports = files
    .map((f) => `import Original${f.componentName} from './exports/${f.exportName}'`)
    .join('\n')

  const iconExports = files
    .map(
      (f) =>
        `/**
 * @deprecated Use \`import {${f.componentName}} from '@sanity/icons/${f.exportName}'\` instead, to avoid barrel file performance issues.
 */
export const ${f.componentName}: typeof Original${f.componentName} = Original${f.componentName}`,
    )
    .join('\n\n')

  const {code} = await format(
    SRC_INDEX_PATH,
    [
      GENERATED_BANNER,
      iconImports,
      `export * from './icon'`,
      `export * from './types'`,
      `export {icons} from './icons'`,
      `export type {IconMap, IconSymbol} from './icons'`,
      iconExports,
    ].join('\n\n'),
    formatConfig as unknown as FormatConfig,
  )

  await writeFile(SRC_INDEX_PATH, code)
}

// The `icons` map (and its `IconSymbol`/`IconMap` types) power the dynamic `<Icon symbol=… />`
// component. It imports every icon from its `../exports/<ExportName>` module; the individual
// named icons are re-exported from `src/index.ts`, not here, so this module stays focused on
// the map alone.
async function writeIconsMap(files: IconMeta[]) {
  const importTypes = `import type {IconComponent} from './types'`

  const iconImports = files
    .map((f) => `import {${f.componentName}} from './exports/${f.exportName}';`)
    .join('\n')

  const typesExports = `/**\n * @public\n */\nexport type IconSymbol = \n${files
    .map((f) => `| '${f.name}'`)
    .join('\n')};`

  const iconMapInterface = `/**\n * @public\n */\nexport interface IconMap {${files
    .map((f) => `'${f.name}': IconComponent`)
    .join(',')}}`

  const iconsExport = `/**\n * @public\n */\nexport const icons: IconMap = {${files
    .map((f) => `'${f.name}': ${f.componentName}`)
    .join(',')}}`

  const {code} = await format(
    SRC_ICONS_PATH,
    [GENERATED_BANNER, importTypes, iconImports, typesExports, iconMapInterface, iconsExport].join(
      '\n\n',
    ),
    formatConfig as unknown as FormatConfig,
  )

  await writeFile(SRC_ICONS_PATH, code)
}

async function generate() {
  await mkdirp(SRC_EXPORTS_PATH)

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

  // Guard against two icons mapping to the same subpath, which would make the generated
  // `package.json` `exports` and `src/index.ts` re-exports ambiguous.
  const seen = new Map<string, string>()
  for (const file of files) {
    const previous = seen.get(file.exportName)
    if (previous) {
      throw new Error(
        `Duplicate export name "${file.exportName}" for icons "${previous}" and "${file.name}"`,
      )
    }
    seen.set(file.exportName, file.name)
  }

  await Promise.all(files.map(writeIcon))
  await writeIconsMap(files)
  await writeRootIndex(files)

  console.log(`generated ${files.length} icons:`, files.map((f) => f.name).join(', '))
}

generate().catch((err) => {
  console.error(err)
  process.exit(1)
})
