export function _fromEntries<K extends string | number | symbol, T>(entries: [K, T][]) {
  return Object.fromEntries(entries) as Record<K, T>
}
