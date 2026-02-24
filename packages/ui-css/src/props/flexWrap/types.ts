import {type ExactKeyTuple} from '../../_keys'
import type {ResponsiveProp} from '../../types'

/** @public */
export type FlexWrap = 'wrap' | 'wrap-reverse' | 'nowrap'

/** @public */
export interface FlexWrapStyleProps {
  flexWrap?: ResponsiveProp<FlexWrap>
}

/** @internal */
export const FLEX_WRAP_STYLE_PROP_KEYS = ['flexWrap'] as const

// assert exact keys
FLEX_WRAP_STYLE_PROP_KEYS satisfies ExactKeyTuple<
  FlexWrapStyleProps,
  typeof FLEX_WRAP_STYLE_PROP_KEYS
>
