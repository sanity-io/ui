import type {ColorToken} from './color/token'
import type {ColorTokens} from './color/tokens'

/** @public */
export interface Tokens {
  color: ColorTokens
}

/** @public */
export type PartialTokens<T> = T extends [ColorToken, ColorToken]
  ? T
  : T extends {} // eslint-disable-line @typescript-eslint/no-empty-object-type
    ? {
        [P in keyof T]?: PartialTokens<T[P]>
      }
    : T
