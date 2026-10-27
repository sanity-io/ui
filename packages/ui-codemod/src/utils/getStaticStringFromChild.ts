import type {JSXElement} from 'jscodeshift'

import type {AnyExpression} from '../types/AnyExpression'

export type JSXElementChild = Exclude<NonNullable<JSXElement['children']>[number], undefined>

export function getStaticStringFromChild(child: JSXElementChild): string | undefined {
  if (child.type === 'JSXText') {
    return child.value.trim()
  }

  if (child.type === 'JSXExpressionContainer') {
    const expr = child.expression as AnyExpression

    if (expr.type === 'StringLiteral' && typeof expr.value === 'string') {
      return expr.value
    }

    if (expr.type === 'Literal' && typeof expr.value === 'string') {
      return expr.value
    }
  }

  return undefined
}
