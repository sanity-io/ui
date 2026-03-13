import {type ExactKeyTuple} from '../../lib/props/_keys'
import type {ResponsiveProp} from '../../types'

/** @public */
export type GridColumn = 'auto' | 'full' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/** @public */
export interface GridColumnStyleProps {
  gridColumn?: ResponsiveProp<GridColumn>
}

/** @internal */
export const GRID_COLUMN_STYLE_PROP_KEYS = ['gridColumn'] as const

// assert exact keys
GRID_COLUMN_STYLE_PROP_KEYS satisfies ExactKeyTuple<
  GridColumnStyleProps,
  typeof GRID_COLUMN_STYLE_PROP_KEYS
>
