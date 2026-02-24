import type {CardTone} from '@sanity/ui-tokens/system'

import type {ExactKeyTuple} from '../../_keys'

/** @public */
export interface CardToneStyleProps {
  cardTone?: CardTone
}

/** @internal */
export const CARD_TONE_STYLE_PROP_KEYS = ['cardTone'] as const

// assert exact keys
CARD_TONE_STYLE_PROP_KEYS satisfies ExactKeyTuple<
  CardToneStyleProps,
  typeof CARD_TONE_STYLE_PROP_KEYS
>
