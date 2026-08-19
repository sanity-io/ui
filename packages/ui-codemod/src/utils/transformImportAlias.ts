import type {API} from 'jscodeshift'

import {insertTodoWarning} from './insertTodoWarning'

export function transformImportAlias(
  j: API['jscodeshift'],
  root: ReturnType<API['jscodeshift']>,
  fromExport: string,
  toExport: string,
  localName: string,
  warning?: string,
): boolean {
  let updated = false

  root.find(j.ImportDeclaration).forEach((path) => {
    const specs = path.node.specifiers

    if (!specs?.length) {
      return
    }

    for (const spec of specs) {
      if (spec.type !== 'ImportSpecifier' || spec.imported.type !== 'Identifier') {
        continue
      }

      if (spec.imported.name !== fromExport) {
        continue
      }

      const local = spec.local?.type === 'Identifier' ? spec.local.name : spec.imported.name

      if (local !== localName) {
        continue
      }

      spec.imported.name = toExport
      updated = true

      if (warning) {
        insertTodoWarning(j, path, warning)
      }

      return
    }
  })

  return updated
}
