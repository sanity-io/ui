import type {ElementTone} from '@sanity/ui-tokens/system'

import type {ExactKeyTuple} from '../../_keys'
import {BOX_STYLE_PROP_KEYS, type BoxStyleProps} from '../box/types'

/** @public */
export interface SelectableStyleProps extends BoxStyleProps {
  tone?: ElementTone
}

/** @internal */
export const SELECTABLE_STYLE_PROP_KEYS = [...BOX_STYLE_PROP_KEYS, 'tone'] as const

// assert exact keys
SELECTABLE_STYLE_PROP_KEYS satisfies ExactKeyTuple<
  SelectableStyleProps,
  typeof SELECTABLE_STYLE_PROP_KEYS
>
