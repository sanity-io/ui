import type {ColorScheme} from '@sanity/ui-tokens/system'

import type {ExactKeyTuple} from '../../_keys'

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
