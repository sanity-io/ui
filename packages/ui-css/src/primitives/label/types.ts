import type {FontLabelSize} from '@sanity/ui-tokens/system'

import type {ExactKeyTuple} from '../../_keys'
import {FLEX_PROP_STYLE_PROP_KEYS, type FlexPropStyleProps} from '../../props/flex/types'
import {FONT_STYLE_PROP_KEYS, type FontStyleProps} from '../../props/font/types'
import {MARGIN_STYLE_PROP_KEYS, type MarginStyleProps} from '../../props/margin/types'
import {MAX_WIDTH_STYLE_PROP_KEYS, type MaxWidthStyleProps} from '../../props/maxWidth/types'
import type {TextAlign} from '../../props/textAlign/types'
import type {ResponsiveProp} from '../../types'

/** @public */
export interface LabelStyleProps
  extends FlexPropStyleProps, FontStyleProps, MarginStyleProps, MaxWidthStyleProps {
  align?: TextAlign
  className?: string
  muted?: boolean
  size?: ResponsiveProp<FontLabelSize>
}

/** @internal */
export const LABEL_STYLE_PROP_KEYS = [
  ...FONT_STYLE_PROP_KEYS,
  ...FLEX_PROP_STYLE_PROP_KEYS,
  ...MARGIN_STYLE_PROP_KEYS,
  ...MAX_WIDTH_STYLE_PROP_KEYS,
  'align',
  'className',
  'muted',
  'size',
] as const

// assert exact keys
LABEL_STYLE_PROP_KEYS satisfies ExactKeyTuple<LabelStyleProps, typeof LABEL_STYLE_PROP_KEYS>
