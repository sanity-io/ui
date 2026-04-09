import { type API } from "jscodeshift";

import {
  type AnyExpression,
  type AttributeMappings,
} from "../types/AnyExpression";
import { getMappingExpression } from "./getMappingExpression";
import { getMappingKey } from "./getMappingKey";
import { getMappingValue } from "./getMappingValue";

export function getMappingArray(
  j: API["jscodeshift"],
  arr: AnyExpression,
  mappings: AttributeMappings,
) {
  if (arr.type !== "ArrayExpression") {
    return null;
  }

  const elements = arr.elements as (AnyExpression | null)[];
  const output: AnyExpression[] = [];

  for (const el of elements) {
    if (el == null || el.type === "SpreadElement") {
      return null;
    }

    const key = getMappingKey(el);

    if (!key === null) {
      return null;
    }

    const mapped = getMappingValue(mappings, key);

    if (mapped === undefined) {
      return null;
    }

    output.push(getMappingExpression(j, mapped));
  }

  return j.arrayExpression(output as never[]);
}
