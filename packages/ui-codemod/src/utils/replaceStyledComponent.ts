import type {API} from 'jscodeshift'

import {addImportSpecifier} from './addImportSpecifier'
import {getElementMatchNames} from './getElementMatchNames'
import {removeUnusedImport} from './removeUnusedImport'
import {transformImportAlias} from './transformImportAlias'

export function replaceStyledComponent(
  j: API['jscodeshift'],
  root: ReturnType<API['jscodeshift']>,
  from: {
    element: string
    localNames?: Iterable<string>
  },
  to: string,
): void {
  const names = getElementMatchNames(from.element, from.localNames)

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
          transformImportAlias(
            j,
            root,
            from.element,
            to,
            arg.name,
            `Consider renaming ${arg.name} to ${to}`,
          )
          aliases.add(arg.name)
        }

        return
      }

      arg.name = to
      needsDefaultImportUpdate = true
    })

  if (needsDefaultImportUpdate) {
    addImportSpecifier(j, root, from.element, to)
    removeUnusedImport(j, root, from.element)
  }
}
