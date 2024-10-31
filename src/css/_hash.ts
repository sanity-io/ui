/** Hash a string using the djb2 algorithm. */
// from: https://github.com/souporserious/restyle/blob/4e71e9aa295803dd3cb47a47e3600a52b68bac38/src/utils.ts#L70C1-L77C2
export function _hash(value: string): string {
  let h = 5381
  for (let index = 0, len = value.length; index < len; index++) {
    h = ((h << 5) + h + value.charCodeAt(index)) >>> 0
  }
  return h.toString(36)
}
