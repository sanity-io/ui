import {type API} from 'jscodeshift'

import {type AnyExpression} from '../types/AnyExpression'

export function getStyleExpression(j: API['jscodeshift'], expr: AnyExpression): AnyExpression {
  if (expr.type === 'Literal') {
    if (expr.value === null) {
      return j.literal(null)
    }

    if (typeof expr.value === 'boolean') {
      return j.booleanLiteral(expr.value)
    }

    if (typeof expr.value === 'number') {
      return j.numericLiteral(expr.value)
    }

    if (typeof expr.value === 'string') {
      return j.stringLiteral(expr.value)
    }
  }

  if (expr.type === 'BooleanLiteral') {
    return j.booleanLiteral(expr.value as boolean)
  }

  if (expr.type === 'NumericLiteral') {
    return j.numericLiteral(expr.value as number)
  }

  if (expr.type === 'StringLiteral') {
    return j.stringLiteral(expr.value as string)
  }

  return expr
}
