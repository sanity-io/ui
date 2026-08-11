import type {AnyExpression} from '../types/AnyExpression'
import type {AttributeMapping} from '../types/AttributeMods'

export function getMappingValue(mapping: AttributeMapping, expr: AnyExpression) {
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

  if (key) {
    if (Object.prototype.hasOwnProperty.call(mapping, key)) {
      return mapping[key]
    }

    const number = Number(key)

    if (!Number.isNaN(number) && Object.prototype.hasOwnProperty.call(mapping, number)) {
      return mapping[number]
    }
  }

  if (
    expr.type === 'BooleanLiteral' ||
    (expr.type === 'Literal' && typeof expr.value === 'boolean')
  ) {
    for (const val in mapping) {
      if (expr.value === mapping[val]) {
        return mapping[val]
      }
    }
  }

  return
}
