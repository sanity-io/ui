/** @public */
export type Responsive<T> =
  | T
  | []
  | ([T | undefined | null, ...(T | undefined | null)[]] & {length: 1})
  | ([T | undefined | null, ...(T | undefined | null)[]] & {length: 2})
  | ([T | undefined | null, ...(T | undefined | null)[]] & {length: 3})
  | ([T | undefined | null, ...(T | undefined | null)[]] & {length: 4})
  | ([T | undefined | null, ...(T | undefined | null)[]] & {length: 5})
  | ([T | undefined | null, ...(T | undefined | null)[]] & {length: 6})
