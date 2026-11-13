import type {API} from 'jscodeshift'

import {addImportSpecifier} from './addImportSpecifier'
import {getElementMatchNames} from './getElementMatchNames'
import {removeUnusedImport} from './removeUnusedImport'
import {transformImportAlias} from './transformImportAlias'

/**
 * Rewrites the base component in `styled(Base)` call expressions from `from.element`
 * to `to`, and updates imports when the binding matches `from.element`.
 * If `localNames` is omitted, matches `from.element`.
 * Returns whether the AST was updated.
 */
export function replaceStyledComponent(
  j: API['jscodeshift'],
  root: ReturnType<API['jscodeshift']>,
  from: {
    element: string
    localNames?: Iterable<string>
  },
  to: string,
): boolean {
  const names = getElementMatchNames(from.element, from.localNames)

  let hasChanges = false
  let needsDefaultImportUpdate = false
  const aliases = new Set<string>()

  root
    .find(j.CallExpression, {
      callee: {type: 'Identifier', name: 'styled'},
    })
    .forEach((path) => {
      const arg = path.node.arguments[0]

      if (arg?.type !== 'Identifier' || !names.has(arg.name)) {
        return
      }

      if (arg.name !== from.element && arg.name !== to) {
        if (!aliases.has(arg.name)) {
          if (
            transformImportAlias(
              j,
              root,
              from.element,
              to,
              arg.name,
              `Consider renaming ${arg.name} to ${to}`,
            )
          ) {
            hasChanges = true
          }

          aliases.add(arg.name)
        }

        return
      }

      if (arg.name !== to) {
        arg.name = to
        hasChanges = true
        needsDefaultImportUpdate = true
      }
    })

  if (needsDefaultImportUpdate) {
    if (addImportSpecifier(j, root, from.element, to)) {
      hasChanges = true
    }

    if (removeUnusedImport(j, root, from.element)) {
      hasChanges = true
    }
  }

  return hasChanges
}
