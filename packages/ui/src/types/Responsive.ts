export type Responsive<T> =
  | T
  | []
  | ([T | undefined, ...(T | undefined)[]] & {length: 1})
  | ([T | undefined, ...(T | undefined)[]] & {length: 2})
  | ([T | undefined, ...(T | undefined)[]] & {length: 3})
  | ([T | undefined, ...(T | undefined)[]] & {length: 4})
  | ([T | undefined, ...(T | undefined)[]] & {length: 5})
  | ([T | undefined, ...(T | undefined)[]] & {length: 6})
