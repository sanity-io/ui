import type {API, JSXAttribute} from 'jscodeshift'

import type {AnyExpression} from '../types/AnyExpression'
import type {AttributeMod} from '../types/AttributeMods'
import {getMappingArray} from './getMappingArray'
import {getMappingExpression} from './getMappingExpression'
import {getMappingValue} from './getMappingValue'

export function getShorthandAttributes(
  j: API['jscodeshift'],
  expr: AnyExpression,
  mod: AttributeMod,
) {
  const attributes: JSXAttribute[] = []

  if (!('props' in mod)) {
    return []
  }

  if (expr.type === 'ArrayExpression') {
    for (const prop of mod.props) {
      const styleArray = getMappingArray(j, expr, prop.mapping)

      if (!styleArray) {
        continue
      }

      attributes.push(
        j.jsxAttribute(j.jsxIdentifier(prop.name), j.jsxExpressionContainer(styleArray)),
      )
    }
  }

  for (const prop of mod.props) {
    const styleValue = getMappingValue(prop.mapping, expr)

    if (!styleValue) {
      continue
    }

    if (typeof styleValue === 'string') {
      attributes.push(j.jsxAttribute(j.jsxIdentifier(prop.name), j.stringLiteral(styleValue)))
    } else {
      attributes.push(
        j.jsxAttribute(
          j.jsxIdentifier(prop.name),
          j.jsxExpressionContainer(getMappingExpression(j, styleValue) as never),
        ),
      )
    }
  }

  return attributes
}
