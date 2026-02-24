import type {ElementTone} from '@sanity/ui-tokens/system'

import type {ExactKeyTuple} from '../../_keys'

/** @internal */
export interface ElementToneStyleProps {
  elementTone?: ElementTone
}

/** @public */
export const ELEMENT_TONE_STYLE_PROP_KEYS = ['elementTone'] as const

// assert exact keys
ELEMENT_TONE_STYLE_PROP_KEYS satisfies ExactKeyTuple<
  ElementToneStyleProps,
  typeof ELEMENT_TONE_STYLE_PROP_KEYS
>
