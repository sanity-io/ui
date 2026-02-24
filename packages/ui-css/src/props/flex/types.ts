import {type ExactKeyTuple} from '../../_keys'
import type {ResponsiveProp} from '../../types'

/** @public */
export type FlexValue =
  | 'none'
  | 'auto'
  | 'initial'
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12

/** @public */
export interface FlexPropStyleProps {
  flex?: ResponsiveProp<FlexValue>
}

/** @internal */
export const FLEX_PROP_STYLE_PROP_KEYS = ['flex'] as const

// assert exact keys
FLEX_PROP_STYLE_PROP_KEYS satisfies ExactKeyTuple<
  FlexPropStyleProps,
  typeof FLEX_PROP_STYLE_PROP_KEYS
>
