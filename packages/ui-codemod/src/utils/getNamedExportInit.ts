import type {API, Expression, ExportSpecifier} from 'jscodeshift'

import {parseModule} from './parseModule'
import {resolveRelativeModulePath} from './resolveRelativeModulePath'

export type NamedExportInit = {
  init: Expression
  modulePath: string
}

function findVariableInit(
  j: API['jscodeshift'],
  root: ReturnType<API['jscodeshift']>,
  name: string,
): Expression | null {
  let init: Expression | null = null

  root.find(j.VariableDeclarator).forEach((path) => {
    const {id} = path.node

    if (id.type === 'Identifier' && id.name === name && path.node.init) {
      init = path.node.init
    }
  })

  return init
}

function getExportSpecifierName(exported: ExportSpecifier['exported']): string | null {
  if (exported.type === 'Identifier' || exported.type === 'JSXIdentifier') {
    return exported.name
  }

  return null
}

export function getNamedExportInit(
  j: API['jscodeshift'],
  exportName: string,
  filePath: string,
  visited: Set<string> = new Set(),
): NamedExportInit | null {
  if (visited.has(filePath)) {
    return null
  }

  visited.add(filePath)

  const root = parseModule(j, filePath)

  if (!root) {
    return null
  }

  for (const path of root.find(j.ExportNamedDeclaration).paths()) {
    const {declaration, specifiers, source} = path.node
    const reexportSource = typeof source?.value === 'string' ? source.value : null

    if (declaration?.type === 'VariableDeclaration') {
      for (const declarator of declaration.declarations) {
        if (declarator.type !== 'VariableDeclarator') {
          continue
        }

        if (
          declarator.id.type === 'Identifier' &&
          declarator.id.name === exportName &&
          declarator.init
        ) {
          return {init: declarator.init, modulePath: filePath}
        }
      }
    }

    for (const spec of specifiers ?? []) {
      if (spec.type !== 'ExportSpecifier') {
        continue
      }

      const exported = getExportSpecifierName(spec.exported)

      if (!exported || exported !== exportName) {
        continue
      }

      const local = spec.local?.type === 'Identifier' ? spec.local.name : exported

      if (reexportSource) {
        const resolvedPath = resolveRelativeModulePath(filePath, reexportSource)

        if (resolvedPath) {
          const followed = getNamedExportInit(j, local, resolvedPath, visited)

          if (followed) {
            return followed
          }
        }

        continue
      }

      const init = findVariableInit(j, root, local)

      if (init) {
        return {init, modulePath: filePath}
      }
    }
  }

  return null
}
