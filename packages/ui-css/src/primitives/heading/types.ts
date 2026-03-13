import type {FontHeadingSize} from '@sanity/ui-tokens'

import type {ExactKeyTuple} from '../../lib/props/_keys'
import {FLEX_PROP_STYLE_PROP_KEYS, type FlexPropStyleProps} from '../../props/flex/types'
import {FONT_STYLE_PROP_KEYS, type FontStyleProps} from '../../props/font/types'
import {MARGIN_STYLE_PROP_KEYS, type MarginStyleProps} from '../../props/margin/types'
import {MAX_WIDTH_STYLE_PROP_KEYS, type MaxWidthStyleProps} from '../../props/maxWidth/types'
import type {TextAlign} from '../../props/textAlign/types'
import {WIDTH_STYLE_PROP_KEYS, type WidthStyleProps} from '../../props/width/types'
import type {ResponsiveProp} from '../../types'

/** @public */
export interface HeadingStyleProps
  extends
    FontStyleProps,
    FlexPropStyleProps,
    MarginStyleProps,
    MaxWidthStyleProps,
    WidthStyleProps {
  align?: TextAlign
  className?: string
  muted?: boolean
  size?: ResponsiveProp<FontHeadingSize>
}

/** @internal */
export const HEADING_STYLE_PROP_KEYS = [
  ...FONT_STYLE_PROP_KEYS,
  ...FLEX_PROP_STYLE_PROP_KEYS,
  ...MARGIN_STYLE_PROP_KEYS,
  ...MAX_WIDTH_STYLE_PROP_KEYS,
  ...WIDTH_STYLE_PROP_KEYS,
  'align',
  'className',
  'muted',
  'size',
] as const

// assert exact keys
HEADING_STYLE_PROP_KEYS satisfies ExactKeyTuple<HeadingStyleProps, typeof HEADING_STYLE_PROP_KEYS>
