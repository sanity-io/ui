import {type API} from 'jscodeshift'

import type {AnyExpression} from '../types/AnyExpression'

export function getMappingExpression(
  j: API['jscodeshift'],
  val: string | boolean | number | undefined,
): AnyExpression {
  if (val === undefined) {
    return j.identifier('undefined')
  }

  if (typeof val === 'boolean') {
    return j.booleanLiteral(val)
  }

  if (typeof val === 'number') {
    return j.numericLiteral(val)
  }

  return j.stringLiteral(val)
}
