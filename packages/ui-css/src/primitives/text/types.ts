import type {FontTextSize} from '@sanity/ui-tokens/system'

import type {ExactKeyTuple} from '../../_keys'
import {DISPLAY_STYLE_PROP_KEYS, type DisplayStyleProps} from '../../props/display/types'
import {FLEX_PROP_STYLE_PROP_KEYS, type FlexPropStyleProps} from '../../props/flex/types'
import {FONT_STYLE_PROP_KEYS, type FontStyleProps} from '../../props/font/types'
import {MARGIN_STYLE_PROP_KEYS, type MarginStyleProps} from '../../props/margin/types'
import {MAX_WIDTH_STYLE_PROP_KEYS, type MaxWidthStyleProps} from '../../props/maxWidth/types'
import type {ResponsiveProp} from '../../types'

/** @public */
export type TextSize = number

/** @public */
export interface TextStyleProps
  extends
    DisplayStyleProps,
    FlexPropStyleProps,
    FontStyleProps,
    MarginStyleProps,
    MaxWidthStyleProps {
  className?: string
  muted?: boolean
  size?: ResponsiveProp<FontTextSize>
}

/** @internal */
export const TEXT_STYLE_PROP_KEYS = [
  ...DISPLAY_STYLE_PROP_KEYS,
  ...FLEX_PROP_STYLE_PROP_KEYS,
  ...FONT_STYLE_PROP_KEYS,
  ...MARGIN_STYLE_PROP_KEYS,
  ...MAX_WIDTH_STYLE_PROP_KEYS,
  'className',
  'muted',
  'size',
] as const

// assert exact keys
TEXT_STYLE_PROP_KEYS satisfies ExactKeyTuple<TextStyleProps, typeof TEXT_STYLE_PROP_KEYS>
