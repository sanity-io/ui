/**
 * @internal
 * Transform css variables object to a style declaration type string
 */
export function cssObjectToCssString(rules: Record<string, string>): string {
  return Object.keys(rules).reduce((acc, key) => {
    return `${acc}${key}: ${rules[key]}; `
  }, '')
}
