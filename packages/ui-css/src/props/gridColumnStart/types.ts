import {type ExactKeyTuple} from '../../_keys'
import type {ResponsiveProp} from '../../types'

/** @public */
export type GridColumnStart = 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/** @public */
export interface GridColumnStartStyleProps {
  gridColumnStart?: ResponsiveProp<GridColumnStart>
}

/** @internal */
export const GRID_COLUMN_START_STYLE_PROP_KEYS = ['gridColumnStart'] as const

// assert exact keys
GRID_COLUMN_START_STYLE_PROP_KEYS satisfies ExactKeyTuple<
  GridColumnStartStyleProps,
  typeof GRID_COLUMN_START_STYLE_PROP_KEYS
>
