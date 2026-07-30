import type {API, Collection, Expression} from 'jscodeshift'

function findVariableInit(
  j: API['jscodeshift'],
  root: Collection,
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

export function getNamedExportInit(
  j: API['jscodeshift'],
  root: Collection,
  exportName: string,
): Expression | null {
  let init: Expression | null = null

  root.find(j.ExportNamedDeclaration).forEach((path) => {
    if (init) {
      return
    }

    const {declaration, specifiers} = path.node

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
          init = declarator.init
        }
      }
    }

    for (const spec of specifiers ?? []) {
      if (spec.type !== 'ExportSpecifier') {
        continue
      }

      const exported =
        spec.exported.type === 'Identifier'
          ? spec.exported.name
          : 'value' in spec.exported
            ? String(spec.exported.value)
            : null
      const local = spec.local?.type === 'Identifier' ? spec.local.name : exported

      if (exported === exportName && local) {
        init = findVariableInit(j, root, local)
      }
    }
  })

  return init
}
