import type {ElementTone} from '@sanity/ui-tokens'

import type {ExactKeyTuple} from '../../lib/props/_keys'
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
