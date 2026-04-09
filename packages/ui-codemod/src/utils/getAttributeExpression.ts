import { API, JSXAttribute } from "jscodeshift";

export function getAttributeExpression(
  attr: JSXAttribute,
  j: API["jscodeshift"],
) {
  if (!attr.value) {
    return j.booleanLiteral(true);
  }

  if (attr.value.type === "StringLiteral" || attr.value.type === "Literal") {
    return attr.value;
  }

  if (attr.value.type === "JSXExpressionContainer") {
    return attr.value.expression;
  }

  return null;
}
