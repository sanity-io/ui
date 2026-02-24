import {type ExactKeyTuple} from '../../_keys'
import type {ResponsiveProp} from '../../types'

/** @public */
export type GridRowEnd = 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/** @public */
export interface GridRowEndStyleProps {
  gridRowEnd?: ResponsiveProp<GridRowEnd>
}

/** @internal */
export const GRID_ROW_END_STYLE_PROP_KEYS = ['gridRowEnd'] as const

// assert exact keys
GRID_ROW_END_STYLE_PROP_KEYS satisfies ExactKeyTuple<
  GridRowEndStyleProps,
  typeof GRID_ROW_END_STYLE_PROP_KEYS
>
