import type {API, ASTPath, JSXAttribute, JSXOpeningElement, JSXSpreadAttribute} from 'jscodeshift'

import {insertTodoWarning} from './insertTodoWarning'

const DEFAULT_WARNING = 'Please double check styled-component migration(s) below'

/**
 * Runs callback on JSX styled-component if `filter` passes. Otherwise, adds
 * a TODO on the styled definition if manual review is needed.
 * Returns whether the AST was updated.
 */
export function transformStyledComponents(
  j: API['jscodeshift'],
  root: ReturnType<API['jscodeshift']>,
  aliases: Iterable<string>,
  filter: (attrs: (JSXAttribute | JSXSpreadAttribute)[]) => boolean,
  options: {
    callback?: (path: ASTPath<JSXOpeningElement>) => boolean | void
    warning?: string
  } = {},
): boolean {
  const names = new Set(aliases)
  const {callback, warning = DEFAULT_WARNING} = options
  const aliasesToWarn = new Set<string>()
  let hasChanges = false

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
      if (callback?.(path)) {
        hasChanges = true
      }
    }
  })

  root.find(j.VariableDeclarator).forEach((path) => {
    const {id} = path.node

    if (id.type === 'Identifier' && aliasesToWarn.has(id.name)) {
      if (insertTodoWarning(j, path, warning)) {
        hasChanges = true
      }
    }
  })

  return hasChanges
}
