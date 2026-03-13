import {type ExactKeyTuple} from '../../lib/props/_keys'
import type {ResponsiveProp} from '../../types'

/** @public */
export type GridColumnEnd = 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/** @public */
export interface GridColumnEndStyleProps {
  gridColumnEnd?: ResponsiveProp<GridColumnEnd>
}

/** @internal */
export const GRID_COLUMN_END_STYLE_PROP_KEYS = ['gridColumnEnd'] as const

// assert exact keys
GRID_COLUMN_END_STYLE_PROP_KEYS satisfies ExactKeyTuple<
  GridColumnEndStyleProps,
  typeof GRID_COLUMN_END_STYLE_PROP_KEYS
>
