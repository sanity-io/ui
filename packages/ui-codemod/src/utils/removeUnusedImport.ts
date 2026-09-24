import type {API, ASTPath, ImportSpecifier} from 'jscodeshift'

import {isImportBindingUsed} from './isImportBindingUsed'

/**
 * Removes unused import specifier or the whole import if no specifiers remain.
 * Returns whether the AST was updated.
 */
export function removeUnusedImport(
  j: API['jscodeshift'],
  root: ReturnType<API['jscodeshift']>,
  name: string,
): boolean {
  let hasChanges = false

  root.find(j.ImportDeclaration).forEach((path) => {
    const specs = path.node.specifiers

    if (!specs?.length) {
      return
    }

    const next = specs.filter((spec, i) => {
      if (spec.type !== 'ImportSpecifier' || spec.imported.type !== 'Identifier') {
        return true
      }

      if (spec.imported.name !== name) {
        return true
      }

      if ('importKind' in spec && spec.importKind === 'type') {
        return true
      }

      const localName = spec.local?.type === 'Identifier' ? spec.local.name : spec.imported.name
      const specifierPath = path.get('specifiers', i) as ASTPath<ImportSpecifier>

      return isImportBindingUsed(j, root, localName, specifierPath)
    })

    if (next.length === specs.length) {
      return
    }

    if (next.length === 0) {
      j(path).remove()
      hasChanges = true
      return
    }

    path.node.specifiers = next
    hasChanges = true
  })

  return hasChanges
}
