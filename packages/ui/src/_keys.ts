type PropertyKey = string | number | symbol

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any

/** @internal */
export function _splitKeys<
  P extends Record<PropertyKey, Any>,
  const K extends readonly (keyof P)[],
>(props: P, keys: K) {
  const style = {} as Pick<P, K[number]>
  const rest = {} as Omit<P, K[number]>

  // Faster membership than Array.includes for large key lists
  const keySet = new Set<PropertyKey>(keys as readonly PropertyKey[])

  for (const k in props) {
    if (keySet.has(k)) {
      ;(style as Any)[k] = (props as Any)[k]
    } else {
      ;(rest as Any)[k] = (props as Any)[k]
    }
  }

  return [style, rest] as const
}
