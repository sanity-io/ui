import type {API, ASTPath, JSXAttribute, JSXOpeningElement, JSXSpreadAttribute} from 'jscodeshift'

import {insertTodoWarning} from './insertTodoWarning'

const DEFAULT_WARNING = 'Please double check styled-component migration below'

/**
 * Runs callback on JSX styled-component if `filter` passes. Otherwise, adds
 * a TODO on the JSX usage when manual review is needed.
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
  let hasChanges = false

  root.find(j.JSXOpeningElement).forEach((path) => {
    const name = path.node.name

    if (name.type !== 'JSXIdentifier' || !names.has(name.name)) {
      return
    }

    const attrs = path.node.attributes ?? []

    if (!filter(attrs)) {
      if (insertTodoWarning(j, path, warning)) {
        hasChanges = true
      }

      return
    }

    if (callback?.(path)) {
      hasChanges = true
    }
  })

  return hasChanges
}
