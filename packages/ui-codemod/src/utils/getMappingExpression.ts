import { type API } from "jscodeshift";

export function getMappingExpression(
  j: API["jscodeshift"],
  val: string | boolean | number,
) {
  if (typeof val === "boolean") {
    return j.booleanLiteral(val);
  }

  if (typeof val === "number") {
    return j.numericLiteral(val);
  }

  return j.stringLiteral(val);
}
