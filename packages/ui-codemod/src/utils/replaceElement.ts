import type {API, ASTPath, JSXAttribute, JSXOpeningElement, JSXSpreadAttribute} from 'jscodeshift'

import {addImportSpecifier} from './addImportSpecifier'
import {removeUnusedImport} from './removeUnusedImport'

export function replaceElement(
  j: API['jscodeshift'],
  root: ReturnType<API['jscodeshift']>,
  filter: (attrs: (JSXAttribute | JSXSpreadAttribute)[]) => boolean,
  from: {
    element: string
    callback?: (path: ASTPath<JSXOpeningElement>) => void
  },
  to: {
    element: string
    callback?: (path: ASTPath<JSXOpeningElement>) => void
  },
) {
  let needsImportUpdate = false

  root
    .find(j.JSXOpeningElement, {
      name: {type: 'JSXIdentifier', name: from.element},
    })
    .forEach((path) => {
      const openingEl = path.node
      const attrs = openingEl.attributes

      if (!attrs || !filter(attrs)) {
        from.callback?.(path)
        return
      }

      const opening = openingEl.name

      if (opening.type === 'JSXIdentifier') {
        opening.name = to.element
      }

      const parentNode = path.parent?.node

      if (parentNode?.type === 'JSXElement') {
        const closing = parentNode.closingElement

        if (closing) {
          const closingName = closing.name

          if (closingName.type === 'JSXIdentifier') {
            closingName.name = to.element
          }
        }
      }

      to.callback?.(path)
      needsImportUpdate = true
    })

  if (needsImportUpdate) {
    addImportSpecifier(j, root, from.element, to.element)
    removeUnusedImport(j, root, from.element)
  }
}
