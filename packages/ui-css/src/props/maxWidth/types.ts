import type {ContainerWidth} from '@sanity/ui-tokens'

import {type ExactKeyTuple} from '../../lib/props/_keys'
import type {ResponsiveProp} from '../../types'

/** @public */
export type MaxWidth = ContainerWidth | 'auto' | 'fill'

/** @public */
export interface MaxWidthStyleProps {
  maxWidth?: ResponsiveProp<MaxWidth>
}

/** @internal */
export const MAX_WIDTH_STYLE_PROP_KEYS = ['maxWidth'] as const

// assert exact keys
MAX_WIDTH_STYLE_PROP_KEYS satisfies ExactKeyTuple<
  MaxWidthStyleProps,
  typeof MAX_WIDTH_STYLE_PROP_KEYS
>
