import {type AnyExpression} from '../types/AnyExpression'

export function isValidStyleType(expr: AnyExpression) {
  if (expr.type === 'TemplateLiteral') {
    const expressions = expr.expressions as unknown[]
    const quasis = expr.quasis as {value: {cooked: string | null}}[]
    return expressions.length === 0 && quasis.length === 1
  }

  if (
    expr.type === 'StringLiteral' ||
    expr.type === 'Literal' ||
    expr.type === 'NumericLiteral' ||
    expr.type === 'BooleanLiteral' ||
    expr.type === 'NullLiteral'
  ) {
    return true
  }

  return false
}
