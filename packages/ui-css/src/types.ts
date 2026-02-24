import type {BREAKPOINT_KEYS} from './constants'

/** @public */
export type Breakpoint = (typeof BREAKPOINT_KEYS)[number]

/** @public */
export type ResponsivePropArray<T> =
  // empty
  | []
  // [0] breakpoints
  | [T | undefined]
  // [0..1] breakpoints
  | [T | undefined, T | undefined]
  // [0..2] breakpoints
  | [T | undefined, T | undefined, T | undefined]
  // [0..3] breakpoints
  | [T | undefined, T | undefined, T | undefined, T | undefined]
  // [0..4] breakpoints
  | [T | undefined, T | undefined, T | undefined, T | undefined, T | undefined]
  // [0..5] breakpoints
  | [T | undefined, T | undefined, T | undefined, T | undefined, T | undefined, T | undefined]
  // [0..6] breakpoints
  | [
      T | undefined,
      T | undefined,
      T | undefined,
      T | undefined,
      T | undefined,
      T | undefined,
      T | undefined,
    ]

/** @public */
export interface ResponsivePropObject<T> {
  0?: T
  1?: T
  2?: T
  3?: T
  4?: T
  5?: T
  6?: T

  // Hack to prevent allowing more than 7 breakpoints
  7?: never
  8?: never
  9?: never
  10?: never
  11?: never
  12?: never
  13?: never
  14?: never
  15?: never
  16?: never
  17?: never
  18?: never
  19?: never
  20?: never

  // prevent arrays/tuples from matching
  readonly length?: never
}

/** @public */
export type ResponsiveProp<T> = T | ResponsivePropArray<T> | ResponsivePropObject<T>

/** @public */
export type ResponsiveRules = Record<Breakpoint, string>

/** @public */
export type ResponsiveRuleOptions<K extends string | number> = Record<K, ResponsiveRules>
