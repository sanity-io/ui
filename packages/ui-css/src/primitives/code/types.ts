import type {FontCodeSize} from '@sanity/ui-tokens'

import {_omitExactKeys, type ExactKeyTuple} from '../../lib/props/_keys'
import {FLEX_PROP_STYLE_PROP_KEYS, type FlexPropStyleProps} from '../../props/flex/types'
import {FONT_STYLE_PROP_KEYS, type FontStyleProps} from '../../props/font/types'
import {MARGIN_STYLE_PROP_KEYS, type MarginStyleProps} from '../../props/margin/types'
import {MAX_WIDTH_STYLE_PROP_KEYS, type MaxWidthStyleProps} from '../../props/maxWidth/types'
import {WIDTH_STYLE_PROP_KEYS, type WidthStyleProps} from '../../props/width/types'
import type {ResponsiveProp} from '../../types'

/** @public */
export interface CodeStyleProps
  extends
    FlexPropStyleProps,
    Omit<FontStyleProps, 'align'>,
    MarginStyleProps,
    MaxWidthStyleProps,
    WidthStyleProps {
  className?: string
  size?: ResponsiveProp<FontCodeSize>
}

/** @internal */
export const CODE_STYLE_PROP_KEYS = [
  ...FLEX_PROP_STYLE_PROP_KEYS,
  ..._omitExactKeys(FONT_STYLE_PROP_KEYS, ['align']),
  ...MARGIN_STYLE_PROP_KEYS,
  ...MAX_WIDTH_STYLE_PROP_KEYS,
  ...WIDTH_STYLE_PROP_KEYS,
  'className',
  'size',
] as const

CODE_STYLE_PROP_KEYS satisfies ExactKeyTuple<CodeStyleProps, typeof CODE_STYLE_PROP_KEYS>
