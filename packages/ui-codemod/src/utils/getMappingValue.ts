import { type AttributeMappings } from "../types/AnyExpression";

export function getMappingValue(mappings: AttributeMappings, key: string | null) {
  if (!key) {
    return
  }

  if (Object.prototype.hasOwnProperty.call(mappings, key)) {
    return mappings[key];
  }

  const number = Number(key);

  if (!Number.isNaN(number) && Object.prototype.hasOwnProperty.call(mappings, number)) {
    return mappings[number];
  }

  return
}