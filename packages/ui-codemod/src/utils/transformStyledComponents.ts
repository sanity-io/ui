import type {API, ASTPath, JSXAttribute, JSXOpeningElement, JSXSpreadAttribute} from 'jscodeshift'

import {insertTodoWarning} from './insertTodoWarning'

const DEFAULT_WARNING = 'Please double check styled-component migration(s) below'

export function transformStyledComponents(
  j: API['jscodeshift'],
  root: ReturnType<API['jscodeshift']>,
  aliases: Iterable<string>,
  filter: (attrs: (JSXAttribute | JSXSpreadAttribute)[]) => boolean,
  options: {
    callback?: (path: ASTPath<JSXOpeningElement>) => void
    warning?: string
  } = {},
): void {
  const names = new Set(aliases)
  const {callback, warning = DEFAULT_WARNING} = options
  const aliasesToWarn = new Set<string>()

  root.find(j.JSXOpeningElement).forEach((path) => {
    const name = path.node.name

    if (name.type !== 'JSXIdentifier' || !names.has(name.name)) {
      return
    }

    const attrs = path.node.attributes ?? []

    if (!filter(attrs)) {
      aliasesToWarn.add(name.name)
    }

    if (filter(attrs)) {
      callback?.(path)
    }
  })

  root.find(j.VariableDeclarator).forEach((path) => {
    const {id} = path.node

    if (id.type === 'Identifier' && aliasesToWarn.has(id.name)) {
      insertTodoWarning(j, path, warning)
    }
  })
}
