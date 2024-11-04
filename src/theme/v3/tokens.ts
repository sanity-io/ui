import {ColorToken} from './color/token'
import {ColorTokens} from './color/tokens'

export interface Tokens {
  color: ColorTokens
}

export type PartialTokens<T> = T extends [ColorToken, ColorToken]
  ? T
  : T extends {} // eslint-disable-line @typescript-eslint/ban-types
    ? {
        [P in keyof T]?: PartialTokens<T[P]>
      }
    : T
