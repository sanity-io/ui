import {type ExactKeyTuple} from '../../lib/props/_keys'
import type {ResponsiveProp} from '../../types'

/** @public */
export type Position = 'absolute' | 'fixed' | 'relative' | 'static' | 'sticky'

/** @public */
export interface PositionStyleProps {
  position?: ResponsiveProp<Position>
}

/** @internal */
export const POSITION_STYLE_PROP_KEYS = ['position'] as const

// assert exact keys
POSITION_STYLE_PROP_KEYS satisfies ExactKeyTuple<
  PositionStyleProps,
  typeof POSITION_STYLE_PROP_KEYS
>
