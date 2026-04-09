import { type AnyExpression } from "../types/AnyExpression";

export function getMappingKey(expr: AnyExpression) {
  if (expr.type === "NumericLiteral" || expr.type === "BooleanLiteral") {
    return String(expr.value);
  }

  if (expr.type === "StringLiteral" || expr.type === "Literal") {
    if (expr.value === null) {
      return "null";
    }

    return String(expr.value);
  }

  if (expr.type === "TemplateLiteral") {
    const expressions = expr.expressions as unknown[];
    const quasis = expr.quasis as { value: { cooked: string | null } }[];

    if (expressions.length === 0 && quasis.length === 1) {
      return quasis[0]?.value.cooked ?? null;
    }
  }

  return null;
}
