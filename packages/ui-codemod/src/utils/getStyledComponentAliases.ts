import type {API, Collection} from 'jscodeshift'

import type {BaseOptions} from '../types/BaseOptions'
import {getComponentLocalNames} from './getComponentLocalNames'
import {getNamedExportInit} from './getNamedExportInit'
import {getStyledComponentName} from './getStyledComponentName'
import {parseModule} from './parseModule'
import {resolveRelativeModulePath} from './resolveRelativeModulePath'

export function getSameFileStyledComponentAliases(
  j: API['jscodeshift'],
  root: Collection,
  localNames: Iterable<string>,
): Set<string> {
  const aliases = new Set<string>()
  const names = new Set(localNames)

  root.find(j.VariableDeclarator).forEach((path) => {
    const {id, init} = path.node

    if (!init || id.type !== 'Identifier') {
      return
    }

    const baseComponent = getStyledComponentName(init)

    if (baseComponent && names.has(baseComponent)) {
      aliases.add(id.name)
    }
  })

  return aliases
}

export function getImportedStyledComponentAliases(
  j: API['jscodeshift'],
  root: Collection,
  componentName: string,
  filePath: string | undefined,
  options?: BaseOptions,
): Set<string> {
  const aliases = new Set<string>()

  if (!filePath) {
    return aliases
  }

  root.find(j.ImportDeclaration).forEach((path) => {
    const source = path.node.source.value

    if (typeof source !== 'string') {
      return
    }

    const resolvedPath = resolveRelativeModulePath(filePath, source)

    if (!resolvedPath) {
      return
    }

    const exportRoot = parseModule(j, resolvedPath)

    if (!exportRoot) {
      return
    }

    const exportLocalNames = getComponentLocalNames(j, exportRoot, componentName, options)

    if (exportLocalNames.size === 0) {
      return
    }

    for (const spec of path.node.specifiers ?? []) {
      if (spec.type !== 'ImportSpecifier') {
        continue
      }

      if ('importKind' in spec && spec.importKind === 'type') {
        continue
      }

      if (spec.imported.type !== 'Identifier') {
        continue
      }

      const exportName = spec.imported.name
      const localName = spec.local?.type === 'Identifier' ? spec.local.name : exportName
      const init = getNamedExportInit(j, exportRoot, exportName)
      const baseComponent = init ? getStyledComponentName(init) : null

      if (baseComponent && exportLocalNames.has(baseComponent)) {
        aliases.add(localName)
      }
    }
  })

  return aliases
}

export function getStyledComponentAliases(
  j: API['jscodeshift'],
  root: Collection,
  componentName: string,
  filePath: string | undefined,
  localNames: Set<string>,
  options?: BaseOptions,
): Set<string> {
  const sameFile = getSameFileStyledComponentAliases(j, root, localNames)
  const imported = getImportedStyledComponentAliases(j, root, componentName, filePath, options)

  return new Set([...sameFile, ...imported])
}
