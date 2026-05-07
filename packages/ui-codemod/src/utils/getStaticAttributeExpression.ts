import type {API, JSXAttribute, JSXSpreadAttribute} from 'jscodeshift'

import {getAttribute} from './getAttribute'
import {getAttributeExpression} from './getAttributeExpression'

export type CompositePrimitive = string | number | boolean

export function getStaticAttributeExpression(
  j: API['jscodeshift'],
  attrs: (JSXAttribute | JSXSpreadAttribute)[],
  name: string,
): CompositePrimitive | null {
  const attr = getAttribute(attrs, name)

  if (!attr) {
    return null
  }

  const expr = getAttributeExpression(attr, j)

  if (!expr) {
    return null
  }

  if (
    expr.type === 'StringLiteral' ||
    expr.type === 'NumericLiteral' ||
    expr.type === 'BooleanLiteral' ||
    expr.type === 'Literal'
  ) {
    return expr.value as string | number | boolean
  }

  return null
}
