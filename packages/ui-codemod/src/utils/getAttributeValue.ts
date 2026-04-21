import type {API, JSXAttribute} from 'jscodeshift'

export function getAttributeValue(
  j: API['jscodeshift'],
  value: unknown,
): NonNullable<JSXAttribute['value']> {
  if (value === true || value === false) {
    return j.jsxExpressionContainer(j.booleanLiteral(value))
  }

  if (typeof value === 'string') {
    return j.stringLiteral(value)
  }

  if (typeof value === 'number') {
    return j.jsxExpressionContainer(j.numericLiteral(value))
  }

  return j.jsxExpressionContainer(j.nullLiteral())
}
