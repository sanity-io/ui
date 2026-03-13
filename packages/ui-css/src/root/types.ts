import type {CardTone} from '@sanity/ui-tokens'

import {_omitExactKeys, type ExactKeyTuple} from '../lib/props/_keys'
import {CARD_STYLE_PROP_KEYS, type CardStyleProps} from '../primitives/card/types'

/** @public */
export interface RootStyleProps extends Omit<CardStyleProps, 'tone'> {
  tone?: CardTone
}

/** @internal */
export const ROOT_STYLE_PROP_KEYS = [
  ..._omitExactKeys(CARD_STYLE_PROP_KEYS, ['tone']),
  'tone',
] as const

// assert exact keys
ROOT_STYLE_PROP_KEYS satisfies ExactKeyTuple<RootStyleProps, typeof ROOT_STYLE_PROP_KEYS>
