import type {API, JSXAttribute, JSXSpreadAttribute} from 'jscodeshift'

import type {AnyExpression} from '../types/AnyExpression'
import {getAttribute} from './getAttribute'
import {getAttributeExpression} from './getAttributeExpression'

export type CompositePrimitive = string | number | boolean

export type StaticAttributeValue = CompositePrimitive | (CompositePrimitive | null | undefined)[]

function getStaticPrimitive(expr: AnyExpression): CompositePrimitive | undefined {
  if (
    expr.type === 'StringLiteral' ||
    expr.type === 'NumericLiteral' ||
    expr.type === 'BooleanLiteral' ||
    expr.type === 'Literal'
  ) {
    const {value} = expr

    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      return value
    }
  }

  return undefined
}

export function getStaticAttributeExpression(
  j: API['jscodeshift'],
  attrs: (JSXAttribute | JSXSpreadAttribute)[],
  name: string,
): StaticAttributeValue | null {
  const attr = getAttribute(attrs, name)

  if (!attr) {
    return null
  }

  const expr = getAttributeExpression(attr, j)

  if (!expr) {
    return null
  }

  const primitive = getStaticPrimitive(expr as AnyExpression)

  if (primitive !== undefined) {
    return primitive
  }

  if (expr.type !== 'ArrayExpression') {
    return null
  }

  const elements = expr.elements as ((AnyExpression & {name?: string}) | null)[]
  const values: (CompositePrimitive | null | undefined)[] = []

  for (const element of elements) {
    if (element === null || element.type === 'NullLiteral') {
      values.push(null)
      continue
    }

    if (element.type === 'SpreadElement') {
      return null
    }

    if (element.type === 'Literal' && element.value === null) {
      values.push(null)
      continue
    }

    if (element.type === 'Identifier' && element.name === 'undefined') {
      values.push(undefined)
      continue
    }

    const elementValue = getStaticPrimitive(element)

    if (elementValue === undefined) {
      return null
    }

    values.push(elementValue)
  }

  return values
}
