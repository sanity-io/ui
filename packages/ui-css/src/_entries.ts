/** @internal */
export function _entries<KT extends string, VT>(modes: Record<KT, VT>) {
  return Object.entries(modes) as [KT, VT][]
}
