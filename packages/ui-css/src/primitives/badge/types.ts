import type {ElementTone} from '@sanity/ui-tokens/system'

import type {ExactKeyTuple} from '../../_keys'
import {MARGIN_STYLE_PROP_KEYS, type MarginStyleProps} from '../../props/margin/types'
import {PADDING_STYLE_PROP_KEYS, type PaddingStyleProps} from '../../props/padding/types'
import {RADIUS_STYLE_PROP_KEYS, type RadiusStyleProps} from '../../props/radius/types'

/** @public */
export type BadgeTone = ElementTone

/** @public */
export interface BadgeStyleProps extends MarginStyleProps, PaddingStyleProps, RadiusStyleProps {
  className?: string
  tone?: BadgeTone
}

/** @internal */
export const BADGE_STYLE_PROP_KEYS = [
  ...MARGIN_STYLE_PROP_KEYS,
  ...PADDING_STYLE_PROP_KEYS,
  ...RADIUS_STYLE_PROP_KEYS,
  'className',
  'tone',
] as const

// assert exact keys
BADGE_STYLE_PROP_KEYS satisfies ExactKeyTuple<BadgeStyleProps, typeof BADGE_STYLE_PROP_KEYS>
