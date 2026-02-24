import {type ExactKeyTuple} from '../../_keys'
import type {ResponsiveProp} from '../../types'

/** @public */
export type JustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'

/** @public */
export interface JustifyContentStyleProps {
  justifyContent?: ResponsiveProp<JustifyContent>
}

/** @internal */
export const JUSTIFY_CONTENT_STYLE_PROP_KEYS = ['justifyContent'] as const

// assert exact keys
JUSTIFY_CONTENT_STYLE_PROP_KEYS satisfies ExactKeyTuple<
  JustifyContentStyleProps,
  typeof JUSTIFY_CONTENT_STYLE_PROP_KEYS
>
