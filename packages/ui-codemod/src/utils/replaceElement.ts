import type {API, ASTPath, JSXAttribute, JSXOpeningElement, JSXSpreadAttribute} from 'jscodeshift'

import {addImportSpecifier} from './addImportSpecifier'
import {getElementMatchNames} from './getElementMatchNames'
import {removeUnusedImport} from './removeUnusedImport'
import {transformImportAlias} from './transformImportAlias'

/**
 * Replaces JSX component if `filter` passes. Runs callbacks and updates imports.
 * If `localNames` is omitted, matches `from.element`. `localNames` may be an empty set,
 * to avoid rewriting unrelated JSX when only cross-file styled aliases are present.
 * Returns whether the AST was updated.
 */
export function replaceElement(
  j: API['jscodeshift'],
  root: ReturnType<API['jscodeshift']>,
  filter: (attrs: (JSXAttribute | JSXSpreadAttribute)[]) => boolean,
  from: {
    element: string
    localNames?: Iterable<string>
    callback?: (path: ASTPath<JSXOpeningElement>) => boolean | void
  },
  to: {
    element: string
    callback?: (path: ASTPath<JSXOpeningElement>) => boolean | void
  },
): boolean {
  const names = getElementMatchNames(from.element, from.localNames)

  let hasChanges = false
  let needsDefaultImportUpdate = false
  const aliases = new Set<string>()

  root.find(j.JSXOpeningElement).forEach((path) => {
    const openingEl = path.node
    const openingName = openingEl.name

    if (openingName.type !== 'JSXIdentifier' || !names.has(openingName.name)) {
      return
    }

    const attrs = openingEl.attributes

    if (!attrs || !filter(attrs)) {
      if (from.callback?.(path)) {
        hasChanges = true
      }

      return
    }

    const localTag = openingName.name
    const preserveAlias = localTag !== from.element && localTag !== to.element

    if (preserveAlias) {
      if (!aliases.has(localTag)) {
        if (
          transformImportAlias(
            j,
            root,
            from.element,
            to.element,
            localTag,
            `Consider renaming ${localTag} to ${to.element}`,
          )
        ) {
          hasChanges = true
        }

        aliases.add(localTag)
      }
    } else {
      openingName.name = to.element

      const parentNode = path.parent?.node

      if (parentNode?.type === 'JSXElement') {
        const closing = parentNode.closingElement

        if (closing?.name.type === 'JSXIdentifier') {
          closing.name.name = to.element
        }
      }

      needsDefaultImportUpdate = true
      hasChanges = true
    }

    if (to.callback?.(path)) {
      hasChanges = true
    }
  })

  if (needsDefaultImportUpdate) {
    if (addImportSpecifier(j, root, from.element, to.element)) {
      hasChanges = true
    }

    if (removeUnusedImport(j, root, from.element)) {
      hasChanges = true
    }
  }

  return hasChanges
}
