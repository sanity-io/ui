import type {Space} from '@sanity/ui-tokens'

import {type ExactKeyTuple} from '../../lib/props/_keys'
import type {ResponsiveProp} from '../../types'

/** @public */
export type Padding = Space

/** @public */
export interface PaddingStyleProps {
  padding?: ResponsiveProp<Padding>
  paddingTop?: ResponsiveProp<Padding>
  paddingRight?: ResponsiveProp<Padding>
  paddingBottom?: ResponsiveProp<Padding>
  paddingLeft?: ResponsiveProp<Padding>
  paddingX?: ResponsiveProp<Padding>
  paddingY?: ResponsiveProp<Padding>
}

/** @internal */
export const PADDING_STYLE_PROP_KEYS = [
  'padding',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'paddingX',
  'paddingY',
] as const

// assert exact keys
PADDING_STYLE_PROP_KEYS satisfies ExactKeyTuple<PaddingStyleProps, typeof PADDING_STYLE_PROP_KEYS>
