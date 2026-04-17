import {type AnyExpression, type AttributeMappings} from '../types/AnyExpression'

export function getMappingValue(mappings: AttributeMappings, expr: AnyExpression) {
  let key

  if (
    expr.type === 'NumericLiteral' ||
    expr.type === 'BooleanLiteral' ||
    expr.type === 'StringLiteral' ||
    expr.type === 'Literal'
  ) {
    key = String(expr.value)
  }

  if (expr.type === 'TemplateLiteral') {
    const expressions = expr.expressions as unknown[]
    const quasis = expr.quasis as {value: {cooked: string | null}}[]

    if (expressions.length === 0 && quasis.length === 1) {
      key = quasis[0]?.value.cooked ?? null
    }
  }

  if (!key) {
    return
  }

  if (Object.prototype.hasOwnProperty.call(mappings, key)) {
    return mappings[key]
  }

  const number = Number(key)

  if (!Number.isNaN(number) && Object.prototype.hasOwnProperty.call(mappings, number)) {
    return mappings[number]
  }

  return
}
