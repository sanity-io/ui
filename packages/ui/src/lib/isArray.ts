export function isArray(val: unknown): val is unknown[] {
  return Array.isArray(val)
}
