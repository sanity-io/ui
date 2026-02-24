import {type ExactKeyTuple} from '../../_keys'
import type {ResponsiveProp} from '../../types'

/** @public */
export type AlignItems = 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'stretch'

/** @public */
export interface AlignItemsStyleProps {
  alignItems?: ResponsiveProp<AlignItems>
}

/** @internal */
export const ALIGN_ITEMS_STYLE_PROP_KEYS = ['alignItems'] as const

// assert exact keys
ALIGN_ITEMS_STYLE_PROP_KEYS satisfies ExactKeyTuple<
  AlignItemsStyleProps,
  typeof ALIGN_ITEMS_STYLE_PROP_KEYS
>
