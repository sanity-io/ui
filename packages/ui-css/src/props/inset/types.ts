import {type ExactKeyTuple} from '../../_keys'
import type {ResponsiveProp} from '../../types'

/** @public */
export type Inset = 0

/** @public */
export interface InsetStyleProps {
  inset?: ResponsiveProp<Inset>
  insetTop?: ResponsiveProp<Inset>
  insetRight?: ResponsiveProp<Inset>
  insetBottom?: ResponsiveProp<Inset>
  insetLeft?: ResponsiveProp<Inset>
}

/** @internal */
export const INSET_STYLE_PROP_KEYS = [
  'inset',
  'insetTop',
  'insetRight',
  'insetBottom',
  'insetLeft',
] as const

// assert exact keys
INSET_STYLE_PROP_KEYS satisfies ExactKeyTuple<InsetStyleProps, typeof INSET_STYLE_PROP_KEYS>
