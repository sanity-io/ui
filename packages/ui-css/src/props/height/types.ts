import {type ExactKeyTuple} from '../../lib/props/_keys'
import type {ResponsiveProp} from '../../types'

/** @public */
export type Height = 'fill' | 'auto' | 'min' | 'max' | 'fit' | 'stretch'

/** @public */
export interface HeightStyleProps {
  height?: ResponsiveProp<Height>
}

/** @internal */
export const HEIGHT_STYLE_PROP_KEYS = ['height'] as const

// assert exact keys
HEIGHT_STYLE_PROP_KEYS satisfies ExactKeyTuple<HeightStyleProps, typeof HEIGHT_STYLE_PROP_KEYS>
