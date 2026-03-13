import type {ColorScheme} from '@sanity/ui-tokens'

import type {ExactKeyTuple} from '../../lib/props/_keys'

/** @public */
export interface ColorSchemeStyleProps {
  colorScheme?: ColorScheme
}

/** @internal */
export const COLOR_SCHEME_STYLE_PROP_KEYS = ['colorScheme'] as const

// assert exact keys
COLOR_SCHEME_STYLE_PROP_KEYS satisfies ExactKeyTuple<
  ColorSchemeStyleProps,
  typeof COLOR_SCHEME_STYLE_PROP_KEYS
>
