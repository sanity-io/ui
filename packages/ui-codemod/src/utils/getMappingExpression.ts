import {type API} from 'jscodeshift'

import type {AnyExpression} from '../types/AnyExpression'

export function getMappingExpression(
  j: API['jscodeshift'],
  val?: string | boolean | number,
): AnyExpression {
  if (typeof val === 'boolean') {
    return j.booleanLiteral(val)
  }

  if (typeof val === 'number') {
    return j.numericLiteral(val)
  }

  if (typeof val === 'undefined') {
    return j.identifier('undefined')
  }

  return j.stringLiteral(val)
}
