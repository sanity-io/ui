import type {ButtonMode, ElementTone} from '@sanity/ui-tokens/system'

import type {ExactKeyTuple} from '../../_keys'
import {ALIGN_ITEMS_STYLE_PROP_KEYS, type AlignItemsStyleProps} from '../../props/alignItems/types'
import {FLEX_PROP_STYLE_PROP_KEYS, type FlexPropStyleProps} from '../../props/flex/types'
import {GAP_STYLE_PROP_KEYS, type GapStyleProps} from '../../props/gap/types'
import {type JustifyContent} from '../../props/justifyContent/types'
import {MAX_WIDTH_STYLE_PROP_KEYS, type MaxWidthStyleProps} from '../../props/maxWidth/types'
import {PADDING_STYLE_PROP_KEYS, type PaddingStyleProps} from '../../props/padding/types'
import {RADIUS_STYLE_PROP_KEYS, type RadiusStyleProps} from '../../props/radius/types'
import {WIDTH_STYLE_PROP_KEYS, type WidthStyleProps} from '../../props/width/types'
import type {ResponsiveProp} from '../../types'

/** @public */
export interface ButtonStyleProps
  extends
    AlignItemsStyleProps,
    FlexPropStyleProps,
    GapStyleProps,
    MaxWidthStyleProps,
    PaddingStyleProps,
    RadiusStyleProps,
    WidthStyleProps {
  className?: string
  justify?: ResponsiveProp<JustifyContent>
  mode?: ButtonMode
  tone?: ElementTone
}

/** @internal */
export const BUTTON_STYLE_PROP_KEYS = [
  ...ALIGN_ITEMS_STYLE_PROP_KEYS,
  ...FLEX_PROP_STYLE_PROP_KEYS,
  ...GAP_STYLE_PROP_KEYS,
  ...MAX_WIDTH_STYLE_PROP_KEYS,
  ...PADDING_STYLE_PROP_KEYS,
  ...RADIUS_STYLE_PROP_KEYS,
  ...WIDTH_STYLE_PROP_KEYS,
  'className',
  'justify',
  'mode',
  'tone',
] as const

// assert exact keys
BUTTON_STYLE_PROP_KEYS satisfies ExactKeyTuple<ButtonStyleProps, typeof BUTTON_STYLE_PROP_KEYS>
