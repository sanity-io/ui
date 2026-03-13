import {type ExactKeyTuple} from '../../lib/props/_keys'
import type {ResponsiveProp} from '../../types'

/** @public */
export type Overflow = 'visible' | 'hidden' | 'auto'

/** @public */
export interface OverflowStyleProps {
  overflow?: ResponsiveProp<Overflow>
  overflowX?: ResponsiveProp<Overflow>
  overflowY?: ResponsiveProp<Overflow>
}

/** @internal */
export const OVERFLOW_STYLE_PROP_KEYS = ['overflow', 'overflowX', 'overflowY'] as const

// assert exact keys
OVERFLOW_STYLE_PROP_KEYS satisfies ExactKeyTuple<
  OverflowStyleProps,
  typeof OVERFLOW_STYLE_PROP_KEYS
>
