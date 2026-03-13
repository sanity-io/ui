// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any

type Key = string | number | symbol

/** @internal */
export function _splitProps<T extends Record<Key, Any>, K extends readonly (keyof T)[]>(
  props: T,
  keys: K,
) {
  const style = {} as Pick<T, K[number]>
  const rest = {} as Omit<T, K[number]>

  for (const k in props) {
    if ((keys as readonly string[]).includes(k)) {
      ;(style as Any)[k] = (props as Any)[k]
    } else {
      ;(rest as Any)[k] = (props as Any)[k]
    }
  }

  return [style, rest] as const
}
