import type {FontWeight} from '@sanity/ui-tokens'

import {type ExactKeyTuple} from '../../lib/props/_keys'
import type {TextAlign} from '../../props/textAlign/types'

/** @public */
export interface FontStyleProps {
  align?: TextAlign
  weight?: FontWeight
}

/** @internal */
export const FONT_STYLE_PROP_KEYS = ['align', 'weight'] as const

// assert exact keys
FONT_STYLE_PROP_KEYS satisfies ExactKeyTuple<FontStyleProps, typeof FONT_STYLE_PROP_KEYS>
