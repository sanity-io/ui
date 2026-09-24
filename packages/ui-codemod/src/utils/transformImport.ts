import type {API, ASTPath, Collection, ImportDeclaration, ImportSpecifier} from 'jscodeshift'

import {getClonedImportSpecifiers} from './getClonedImportSpecifiers'
import {getSplitImportSpecifiers} from './getSplitImportSpecifiers'

export const DEFAULT_UI_PACKAGE = '@sanity/ui'

/**
 * Rewrites imports from `fromPackage` to `toPackage`, splitting imports if needed.
 * Returns whether the AST was updated.
 */
export function transformImport(
  j: API['jscodeshift'],
  root: Collection,
  componentName: string,
  fromPackage: string = DEFAULT_UI_PACKAGE,
  toPackage: string = DEFAULT_UI_PACKAGE,
): boolean {
  if (fromPackage === toPackage) {
    return false
  }

  let hasChanges = false

  root.find(j.ImportDeclaration).forEach((path) => {
    const node = path.node

    if (node.source.value !== fromPackage) {
      return
    }

    const {componentSpecs, restSpecs} = getSplitImportSpecifiers(node.specifiers, componentName)

    if (componentSpecs.length === 0) {
      return
    }

    if (restSpecs.length === 0) {
      if (node.source && typeof node.source === 'object' && 'value' in node.source) {
        const sourceLiteral = node.source as {value: string}
        sourceLiteral.value = toPackage
      }

      hasChanges = true
      return
    }

    path.node.specifiers = restSpecs
    const clonedImportSpecifiers = getClonedImportSpecifiers(j, componentSpecs)
    path.insertAfter(j.importDeclaration(clonedImportSpecifiers, j.stringLiteral(toPackage)))
    hasChanges = true
  })

  if (hasChanges) {
    combineNamedImports(j, root, toPackage)
  }

  return hasChanges
}

function isTypeOnlyImport(node: ImportDeclaration): boolean {
  return 'importKind' in node && node.importKind === 'type'
}

function specifierKey(spec: ImportSpecifier): string {
  const imported = spec.imported.type === 'Identifier' ? spec.imported.name : ''
  const local = spec.local?.type === 'Identifier' ? spec.local.name : imported

  return `${imported}:${local}`
}

function combineNamedImports(j: API['jscodeshift'], root: Collection, packageName: string) {
  const paths: ASTPath<ImportDeclaration>[] = []

  root.find(j.ImportDeclaration).forEach((path) => {
    const specs = path.node.specifiers

    if (
      path.node.source.value === packageName &&
      specs?.length &&
      specs.every((spec) => spec.type === 'ImportSpecifier')
    ) {
      paths.push(path)
    }
  })

  if (paths.length < 2) {
    return
  }

  const target = paths.find((path) => !isTypeOnlyImport(path.node)) ?? paths[0]

  if (!target) {
    return
  }

  const rest = paths.filter((path) => path !== target)
  const targetIsValue = !isTypeOnlyImport(target.node)
  const seen = new Set(
    (target.node.specifiers ?? [])
      .filter((spec): spec is ImportSpecifier => spec.type === 'ImportSpecifier')
      .map(specifierKey),
  )

  for (const other of rest) {
    const unique = (other.node.specifiers ?? []).filter((spec): spec is ImportSpecifier => {
      if (spec.type !== 'ImportSpecifier') {
        return false
      }

      const key = specifierKey(spec)

      if (seen.has(key)) {
        return false
      }

      seen.add(key)
      return true
    })

    if (unique.length > 0) {
      const cloned = getClonedImportSpecifiers(j, unique)

      if (isTypeOnlyImport(other.node) && targetIsValue) {
        for (const spec of cloned) {
          if (spec.type === 'ImportSpecifier') {
            Object.assign(spec, {importKind: 'type'})
          }
        }
      }

      target.node.specifiers = [...(target.node.specifiers ?? []), ...cloned]
    }

    j(other).remove()
  }
}
