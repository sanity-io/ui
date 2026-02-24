type PropertyKey = string | number | symbol

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any

type MissingKeys<T, K extends PropertyKey> = Exclude<keyof T, K>
type ExtraKeys<T, K extends PropertyKey> = Exclude<K, keyof T>

/** @internal */
export type ExactKeyTuple<T extends Record<PropertyKey, Any>, K extends readonly PropertyKey[]> =
  ExtraKeys<T, K[number]> extends never
    ? MissingKeys<T, K[number]> extends never
      ? K
      : {
          type: 'error'
          message: 'Missing keys'
          missingKeys: MissingKeys<T, K[number]>
        }
    : {
        type: 'error'
        message: 'Unknown keys'
        extraKeys: ExtraKeys<T, K[number]>
      }

/** @internal */
export function _omitExactKeys<
  const K extends readonly PropertyKey[],
  const R extends readonly K[number][],
>(keys: K, remove: R) {
  const removeSet = new Set<PropertyKey>(remove as readonly PropertyKey[])
  return keys.filter((k) => !removeSet.has(k)) as unknown as readonly Exclude<
    K[number],
    R[number]
  >[]
}

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
