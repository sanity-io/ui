import type {API, Collection} from 'jscodeshift'

import type {BaseOptions} from '../types/BaseOptions'
import {DEFAULT_UI_PACKAGE} from './transformImport'

export function getComponentLocalNames(
  j: API['jscodeshift'],
  root: Collection,
  componentName: string,
  options?: BaseOptions,
): Set<string> {
  const importedNames = new Set<string>()
  const packages = new Set([
    options?.fromPackage ?? DEFAULT_UI_PACKAGE,
    options?.toPackage ?? DEFAULT_UI_PACKAGE,
  ])
  let hasOtherPackageImport = false

  root.find(j.ImportDeclaration).forEach((path) => {
    const node = path.node

    if ('importKind' in node && node.importKind === 'type') {
      return
    }

    const matchesPackage = packages.has(node.source.value as string)

    for (const spec of node.specifiers ?? []) {
      if (spec.type !== 'ImportSpecifier') {
        continue
      }

      if ('importKind' in spec && spec.importKind === 'type') {
        continue
      }

      if (spec.imported.type !== 'Identifier' || spec.imported.name !== componentName) {
        continue
      }

      const local = spec.local?.type === 'Identifier' ? spec.local.name : spec.imported.name

      if (!matchesPackage) {
        hasOtherPackageImport = true
        continue
      }

      importedNames.add(local)
    }
  })

  if (importedNames.size > 0) {
    return importedNames
  }

  if (hasOtherPackageImport) {
    return new Set()
  }

  const usesComponentInJsx = root.find(j.JSXOpeningElement).some(({node}) => {
    return node.name.type === 'JSXIdentifier' && node.name.name === componentName
  })

  if (usesComponentInJsx) {
    return new Set([componentName])
  }

  return new Set()
}
