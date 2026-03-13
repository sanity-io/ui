import type {BgPattern} from '@sanity/ui-tokens'

import type {ExactKeyTuple} from '../../lib/props/_keys'

/** @public */
export interface BgPatternStyleProps {
  bgPattern?: BgPattern
}

/** @internal */
export const BG_PATTERN_STYLE_PROP_KEYS = ['bgPattern'] as const

// assert exact keys
BG_PATTERN_STYLE_PROP_KEYS satisfies ExactKeyTuple<
  BgPatternStyleProps,
  typeof BG_PATTERN_STYLE_PROP_KEYS
>
