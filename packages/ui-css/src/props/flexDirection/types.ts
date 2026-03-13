import {type ExactKeyTuple} from '../../lib/props/_keys'
import type {ResponsiveProp} from '../../types'

/** @public */
export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse'

/** @public */
export interface FlexDirectionStyleProps {
  flexDirection?: ResponsiveProp<FlexDirection>
}

/** @internal */
export const FLEX_DIRECTION_STYLE_PROP_KEYS = ['flexDirection'] as const

// assert exact keys
FLEX_DIRECTION_STYLE_PROP_KEYS satisfies ExactKeyTuple<
  FlexDirectionStyleProps,
  typeof FLEX_DIRECTION_STYLE_PROP_KEYS
>
