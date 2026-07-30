import {type API, type ASTPath, type ImportDeclaration, type JSXOpeningElement} from 'jscodeshift'

type CommentableNode = {
  comments?: {type: string; value: string; leading?: boolean}[] | null
}

/**
 * Inserts a `UI-POC-CODEMOD TODO` comment.
 * Returns whether the AST was updated.
 */
export function insertTodoWarning(
  j: API['jscodeshift'],
  path: ASTPath<JSXOpeningElement | ImportDeclaration>,
  warning: string,
): boolean {
  let target: CommentableNode | null = null

  if (path.node.type === 'ImportDeclaration') {
    target = path.node
  } else if (path.parent?.node.type === 'JSXElement') {
    target = path.parent.node
  }

  if (!target) {
    return false
  }

  target.comments ??= []

  if (target.comments.some((comment) => comment.value.includes(warning))) {
    return false
  }

  target.comments.unshift(j.commentLine(` UI-POC-CODEMOD TODO: ${warning}`, true))
  return true
}
