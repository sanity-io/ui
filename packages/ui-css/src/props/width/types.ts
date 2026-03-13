import type {ContainerWidth} from '@sanity/ui-tokens'

import type {ExactKeyTuple} from '../../lib/props/_keys'
import type {ResponsiveProp} from '../../types'

/** @public */
export type Width = ContainerWidth | 'auto' | 'fill' | 'stretch' | 'min' | 'max'

/** @public */
export interface WidthStyleProps {
  width?: ResponsiveProp<Width>
}

/** @internal */
export const WIDTH_STYLE_PROP_KEYS = ['width'] as const

// assert exact keys
WIDTH_STYLE_PROP_KEYS satisfies ExactKeyTuple<WidthStyleProps, typeof WIDTH_STYLE_PROP_KEYS>
