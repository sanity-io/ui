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
// The `icons` map lives in a flat `src/icons.ts` (not `src/icons/index.ts`). The basename
// matters: tsdown/rolldown derives declaration chunk names from the source basename, and a
// second `index` module would collide with the root barrel's `index.d.ts` and swap them.
const SRC_ICONS_PATH = path.resolve(ROOT_PATH, 'src/icons.ts')
const SRC_DEPRECATIONS_PATH = path.resolve(ROOT_PATH, 'src/deprecations.ts')

const GENERATED_BANNER = `/* THIS FILE IS AUTO-GENERATED – DO NOT EDIT */`

// Every icon lives in its own module under `src/exports`, which is also a build entry point
// (see `tsdown.config.ts`). Each is exposed both as a named export – the documented import
// style, `import {AccessDeniedIcon} from '@sanity/icons/AccessDenied'` – and as the default
// export, so `React.lazy(() => import('@sanity/icons/AccessDenied'))` works out of the box.
// The generated `icons` map relies on that default export for its own lazy entries.
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

// The `icons` map (and its `IconSymbol`/`IconMap` types) power the dynamic `<Icon symbol=… />`
// component. Every entry is a `React.lazy` component over its `./exports/<ExportName>` module's
// default export, so importing the map (or the root barrel) pulls in no icon code up front –
// each icon is fetched as its own chunk the first time it renders, like an `<img>` loading its
// `src`. The `<Icon>` wrapper supplies the `<Suspense>` boundary with a matching svg fallback.
async function writeIconsMap(files: IconMeta[]) {
  const importReact = `import {lazy} from 'react'`

  const importTypes = `import type {IconComponent} from './types'`

  const typesExports = `/**\n * @public\n */\nexport type IconSymbol = \n${files
    .map((f) => `| '${f.name}'`)
    .join('\n')};`

  const iconMapInterface = `/**\n * @public\n */\nexport interface IconMap {${files
    .map((f) => `'${f.name}': IconComponent`)
    .join(',')}}`

  const iconsExport = `/**\n * @public\n */\nexport const icons: IconMap = {${files
    .map((f) => `'${f.name}': lazy(() => import('./exports/${f.exportName}'))`)
    .join(',')}}`

  const {code} = await format(
    SRC_ICONS_PATH,
    [GENERATED_BANNER, importReact, importTypes, typesExports, iconMapInterface, iconsExport].join(
      '\n\n',
    ),
    formatConfig as unknown as FormatConfig,
  )

  await writeFile(SRC_ICONS_PATH, code)
}

// v5 removed the deprecated per-icon barrel exports, but a bare removal turns
// `import {RocketIcon} from '@sanity/icons'` into TS2305 ("has no exported member"), which is
// indistinguishable from the icon having been deleted. So the root entry keeps a *declaration-only*
// tombstone per icon: `export declare const RocketIcon: never` with a `@deprecated` tag pointing at
// the icon's own subpath. `declare` is erased from the runtime output – the root entry still ships
// no icon code, and bundlers/Node.js still reject the import – but in the type system the name
// resolves, the editor strikes it through, and the tag says where the import lives now. The `never`
// type marks the value as unusable, since it does not exist at runtime.
async function writeDeprecations(files: IconMeta[]) {
  const stubs = files
    .map(
      (f) =>
        `/**\n * @deprecated \`${f.componentName}\` is no longer exported from the \`@sanity/icons\` root entry (removed in v5) – the icon itself still exists. Import it from its own subpath instead: \`import {${f.componentName}} from '@sanity/icons/${f.exportName}'\`\n */\nexport declare const ${f.componentName}: never`,
    )
    .join('\n\n')

  const {code} = await format(
    SRC_DEPRECATIONS_PATH,
    [GENERATED_BANNER, stubs].join('\n\n'),
    formatConfig as unknown as FormatConfig,
  )

  await writeFile(SRC_DEPRECATIONS_PATH, code)
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
  // `package.json` `exports` and the `icons` map entries ambiguous.
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
  await writeDeprecations(files)

  console.log(`generated ${files.length} icons:`, files.map((f) => f.name).join(', '))
}

generate().catch((err) => {
  console.error(err)
  process.exit(1)
})
