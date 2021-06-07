export function isRecord(val: unknown): val is Record<string, unknown> {
  return Boolean(val) && !Array.isArray(val) && typeof val === 'object'
}

export function isArray(val: unknown): val is Array<unknown> {
  return Array.isArray(val)
}

export function isString(val: unknown): val is string {
  return typeof val === 'string'
}

export function isArrayOfStrings(val: unknown): val is string[] {
  if (!isArray(val)) return false

  for (const item of val) {
    if (!isString(item)) return false
  }

  return true
}
