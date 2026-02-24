import type {Space} from '@sanity/ui-tokens/system'

import {type ExactKeyTuple} from '../../_keys'
import type {ResponsiveProp} from '../../types'

/** @public */
export type Margin = Space | 'auto'

/** @public */
export interface MarginStyleProps {
  margin?: ResponsiveProp<Margin>
  marginX?: ResponsiveProp<Margin>
  marginY?: ResponsiveProp<Margin>
  marginTop?: ResponsiveProp<Margin>
  marginRight?: ResponsiveProp<Margin>
  marginBottom?: ResponsiveProp<Margin>
  marginLeft?: ResponsiveProp<Margin>
}

/** @internal */
export const MARGIN_STYLE_PROP_KEYS = [
  'margin',
  'marginX',
  'marginY',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
] as const

// assert exact keys
MARGIN_STYLE_PROP_KEYS satisfies ExactKeyTuple<MarginStyleProps, typeof MARGIN_STYLE_PROP_KEYS>
