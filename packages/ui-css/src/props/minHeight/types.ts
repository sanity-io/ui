import {type ExactKeyTuple} from '../../lib/props/_keys'
import type {ResponsiveProp} from '../../types'

/** @public */
export type MinHeight = 0 | 'full'

/** @public */
export interface MinHeightStyleProps {
  minHeight?: ResponsiveProp<MinHeight>
}

/** @internal */
export const MIN_HEIGHT_STYLE_PROP_KEYS = ['minHeight'] as const

// assert exact keys
MIN_HEIGHT_STYLE_PROP_KEYS satisfies ExactKeyTuple<
  MinHeightStyleProps,
  typeof MIN_HEIGHT_STYLE_PROP_KEYS
>
