import {type ExactKeyTuple} from '../../lib/props/_keys'
import type {ResponsiveProp} from '../../types'

/** @public */
export type MinWidth = 0 | 'auto' | 'full' | 'min' | 'max' | 'fit'

/** @public */
export interface MinWidthStyleProps {
  minWidth?: ResponsiveProp<MinWidth>
}

/** @internal */
export const MIN_WIDTH_STYLE_PROP_KEYS = ['minWidth'] as const

// assert exact keys
MIN_WIDTH_STYLE_PROP_KEYS satisfies ExactKeyTuple<
  MinWidthStyleProps,
  typeof MIN_WIDTH_STYLE_PROP_KEYS
>
