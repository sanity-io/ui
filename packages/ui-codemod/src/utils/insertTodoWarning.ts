import {type API, type ASTPath, type JSXOpeningElement} from 'jscodeshift'

export function insertTodoWarning(
  j: API['jscodeshift'],
  path: ASTPath<JSXOpeningElement>,
  warning: string,
) {
  const parent = path.parent

  if (!parent || parent.node.type !== 'JSXElement') {
    return
  }

  const el = parent.node as {
    comments?: {type: string; value: string; leading?: boolean}[]
  }

  el.comments ??= []

  if (el.comments.some((c) => c.value.includes(warning))) {
    return
  }

  el.comments.unshift(j.commentLine(` UI-POC-CODEMOD TODO: ${warning}`, true))
}
