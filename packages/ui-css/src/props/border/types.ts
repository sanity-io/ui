import type {BorderStyle, BorderWidth} from '@sanity/ui-tokens'

import {type ExactKeyTuple} from '../../lib/props/_keys'
import type {ResponsiveProp} from '../../types'

/** @public */
export interface BorderStyleProps {
  border?: ResponsiveProp<BorderStyle | boolean>
  borderTop?: ResponsiveProp<BorderStyle | boolean>
  borderRight?: ResponsiveProp<BorderStyle | boolean>
  borderBottom?: ResponsiveProp<BorderStyle | boolean>
  borderLeft?: ResponsiveProp<BorderStyle | boolean>

  borderWidth?: ResponsiveProp<BorderWidth>
}

/** @internal */
export const BORDER_STYLE_PROP_KEYS = [
  'border',
  'borderTop',
  'borderRight',
  'borderBottom',
  'borderLeft',
  'borderWidth',
] as const

// assert exact keys
BORDER_STYLE_PROP_KEYS satisfies ExactKeyTuple<BorderStyleProps, typeof BORDER_STYLE_PROP_KEYS>
