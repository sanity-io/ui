import type {BgPattern, CardTone, ColorScheme} from '@sanity/ui-tokens/system'

import {_omitExactKeys, type ExactKeyTuple} from '../../_keys'
import {BOX_STYLE_PROP_KEYS, type BoxStyleProps} from '../box/types'

/** @public */
export interface CardStyleProps extends Omit<BoxStyleProps, 'className'> {
  /**
   * Do not use in production.
   * @beta
   */
  __unstable_pattern?: BgPattern
  className?: string
  checkered?: boolean
  scheme?: ColorScheme
  tone?: CardTone | 'inherit'
}

/** @internal */
export const CARD_STYLE_PROP_KEYS = [
  ..._omitExactKeys(BOX_STYLE_PROP_KEYS, ['className']),
  '__unstable_pattern',
  'className',
  'checkered',
  'scheme',
  'tone',
] as const

// assert exact keys
CARD_STYLE_PROP_KEYS satisfies ExactKeyTuple<CardStyleProps, typeof CARD_STYLE_PROP_KEYS>
