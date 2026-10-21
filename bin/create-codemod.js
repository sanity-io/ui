#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

function createCodemod() {
  const name = process.argv[2]

  if (!name) {
    return console.error('\x1b[33m', 'Error: Name required.')
  }

  if (/[A-Z]/.test(name)) {
    return console.error('\x1b[33m', 'Error: Name must be kebab-case (e.g., new-component).')
  }

  const codemodDirectory = path.join(path.resolve(), 'packages/ui-codemod/src')
  const transformsDirectory = path.join(codemodDirectory, 'transforms/latest', name)
  const commandFile = path.join(codemodDirectory, 'commands/latest', `${name}.ts`)

  if (fs.existsSync(transformsDirectory)) {
    return console.error('\x1b[33m', 'Error: Transforms directory already exists.')
  }

  if (fs.existsSync(commandFile)) {
    return console.error('\x1b[33m', 'Error: Command file already exists.')
  }

  const componentName = getName(name, true)

  fs.writeFileSync(commandFile, getCommandFile(componentName, name))

  const modsName = getName(name, false, true)

  fs.mkdir(transformsDirectory, {}, (err) => {
    if (err) console.error('\x1b[33m', `Error: ${err}`)
    fs.writeFileSync(
      `${transformsDirectory}/${name}.ts`,
      getTransformFile(componentName, modsName, name),
    )
    fs.writeFileSync(`${transformsDirectory}/${name}.mods.ts`, getTransformModsFile(modsName))
    fs.writeFileSync(
      `${transformsDirectory}/${name}.test.ts`,
      getTransformTestFile(componentName, name),
    )
  })

  const pkgFile = path.join(path.resolve(), 'packages/ui-codemod/package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgFile, 'utf8'))

  fs.writeFileSync(pkgFile, `${JSON.stringify(mergeExports(pkg, name), null, 2)}\n`, 'utf8')

  // oxlint-disable-next-line no-console
  console.log('\x1b[32m', `Successfully created ${componentName} codemod`)
}

function getName(name, isCapitalized, isUppercase) {
  if (isUppercase) {
    return name.toUpperCase().replaceAll('-', '_')
  }

  return name
    .split('-')
    .map((part, i) => {
      if (i === 0 && !isCapitalized) {
        return part
      }

      return part[0].toUpperCase() + part.slice(1)
    })
    .join('')
}

function getCommandFile(componentName, name) {
  return `import {run} from 'jscodeshift/src/Runner.js'

import {BaseCommand} from '../../baseCommand'
import {getTransformPath} from '../../utils/getTransformPath'

/** @public */
export default class ${componentName} extends BaseCommand<typeof ${componentName}> {
  static override description = 'Transform ${componentName} component'

  public async run(): Promise<void> {
    const {flags} = await this.parse(${componentName})
    const {paths, ...restFlags} = flags
    const transformPath = getTransformPath(this.config.root, 'latest', '${name}')

    await run(transformPath, paths, {
      babel: true,
      parser: 'tsx',
      ...restFlags,
    })
  }
}\n`
}

function getTransformFile(componentName, modsName, name) {
  return `import {type API, type FileInfo} from 'jscodeshift'

import type {BaseOptions} from '../../../types/BaseOptions'
import {getComponentLocalNames} from '../../../utils/getComponentLocalNames'
import {getStyledComponentAliases} from '../../../utils/getStyledComponentAliases'
import {shouldTransformComponent} from '../../../utils/shouldTransformComponent'
import {transformAttributes} from '../../../utils/transformAttributes'
import {transformComponent} from '../../../utils/transformComponent'
import {transformImport} from '../../../utils/transformImport'
import {transformStyledComponents} from '../../../utils/transformStyledComponents'
import {${modsName}_MODS} from './${name}.mods'

const TODO_WARNING = 'Please double check the ${componentName} migration below'

/** @internal */
export default function transform(
  fileInfo: FileInfo,
  api: API,
  options?: BaseOptions,
): string | undefined {
  const {fromPackage, toPackage} = options || {}

  return transformComponent(fileInfo, api, ({j, root, markChanged}) => {
    const localNames = getComponentLocalNames(j, root, '${componentName}', options)
    const styledAliases = getStyledComponentAliases(
      j,
      root,
      '${componentName}',
      fileInfo.path,
      localNames,
      options,
    )

    if (!shouldTransformComponent(j, root, '${componentName}', localNames, options, styledAliases)) {
      return
    }

    if (transformImport(j, root, '${componentName}', fromPackage, toPackage)) {
      markChanged()
    }

    root.find(j.JSXOpeningElement).forEach((path) => {
      const name = path.node.name

      if (name.type !== 'JSXIdentifier' || !localNames.has(name.name)) {
        return
      }

      if (transformAttributes(j, path, ${modsName}_MODS, TODO_WARNING)) {
        markChanged()
      }
    })

    if (
      transformStyledComponents(j, root, styledAliases, () => true, {
        callback: (path) => transformAttributes(j, path, ${modsName}_MODS, TODO_WARNING),
      })
    ) {
      markChanged()
    }
  })
}\n`
}

function getTransformModsFile(modsName) {
  return `import type {AttributeMods} from '../../../types/AttributeMods'

/** @internal */
export const ${modsName}_MODS: AttributeMods = {
}\n`
}

function getTransformTestFile(componentName, name) {
  return `import {expect} from 'vitest'

import {defineInlineTest} from '../../../utils/testUtils'
import transform from './${name}'

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  \`
  import {${componentName}} from '@legacy/ui'

  <${componentName} />
  \`,
  \`
  import {${componentName}} from "@sanity/ui"

  <${componentName} />
  \`,
  'updates ${componentName} import path based on fromPackage and toPackage',
)\n`
}

function mergeExports(pkg, name) {
  const transformKey = `./transforms/latest/${name}`
  const commandKey = `./latest/${name}`

  pkg.exports[transformKey] = {
    source: `./src/transforms/latest/${name}/${name}.ts`,
    default: `./dist/transforms/latest/${name}/${name}.js`,
  }
  pkg.exports[commandKey] = {
    source: `./src/commands/latest/${name}.ts`,
    default: `./dist/commands/latest/${name}.js`,
  }

  pkg.exports = sortExports(pkg.exports)

  pkg.publishConfig.exports[transformKey] = `./dist/transforms/latest/${name}/${name}.js`
  pkg.publishConfig.exports[commandKey] = `./dist/commands/latest/${name}.js`

  pkg.publishConfig.exports = sortExports(pkg.publishConfig.exports)

  return pkg
}

function sortExports(exports) {
  return Object.fromEntries(
    Object.keys(exports)
      .sort((a, b) => {
        if (a === './package.json') return 1
        if (b === './package.json') return -1

        const component = (key) =>
          key.startsWith('./transforms/latest/')
            ? key.slice('./transforms/latest/'.length)
            : key.slice('./latest/'.length)
        const directory = (key) => (key.startsWith('./transforms/') ? 0 : 1)
        const byName = component(a).localeCompare(component(b))
        return byName !== 0 ? byName : directory(a) - directory(b)
      })
      .map((key) => [key, exports[key]]),
  )
}

createCodemod()
