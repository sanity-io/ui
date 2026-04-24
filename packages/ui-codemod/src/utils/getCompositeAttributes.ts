import type {API, JSXAttribute} from 'jscodeshift'

import type {AnyExpression, AttributeMod} from '../types/AnyExpression'
import {getMappingArray} from './getMappingArray'
import {getMappingExpression} from './getMappingExpression'
import {getMappingValue} from './getMappingValue'

export function getCompositeAttributes(
  j: API['jscodeshift'],
  expr: AnyExpression,
  mod: AttributeMod,
) {
  const attributes: JSXAttribute[] = []

  if (!('composition' in mod)) {
    return []
  }

  if (expr.type === 'ArrayExpression') {
    for (const composite of mod.composition) {
      const styleArray = getMappingArray(j, expr, composite.mapping, true)

      if (!styleArray) {
        continue
      }

      attributes.push(
        j.jsxAttribute(j.jsxIdentifier(composite.name), j.jsxExpressionContainer(styleArray)),
      )
    }
  }

  for (const composite of mod.composition) {
    const styleValue = getMappingValue(composite.mapping, expr)

    if (!styleValue) {
      continue
    }

    if (typeof styleValue === 'string') {
      attributes.push(j.jsxAttribute(j.jsxIdentifier(composite.name), j.stringLiteral(styleValue)))
    } else {
      attributes.push(
        j.jsxAttribute(
          j.jsxIdentifier(composite.name),
          j.jsxExpressionContainer(getMappingExpression(j, styleValue) as never),
        ),
      )
    }
  }

  return attributes
}
