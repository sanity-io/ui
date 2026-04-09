import { AnyExpression } from "../types/AnyExpression";

export function canMoveUnmappedStyle(expr: AnyExpression) {
  if (
    expr.type === 'StringLiteral' ||
    expr.type === 'Literal' ||
    expr.type === 'NumericLiteral' ||
    expr.type === 'BooleanLiteral' ||
    expr.type === 'NullLiteral'
  ) {
    return true;
  }

  return false;
}