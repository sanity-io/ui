import {type ExactKeyTuple} from '../../_keys'
import type {ResponsiveProp} from '../../types'

/** @public */
export type GridRow = 'auto' | 'full' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/** @public */
export interface GridRowStyleProps {
  gridRow?: ResponsiveProp<GridRow>
}

/** @internal */
export const GRID_ROW_STYLE_PROP_KEYS = ['gridRow'] as const

// assert exact keys
GRID_ROW_STYLE_PROP_KEYS satisfies ExactKeyTuple<GridRowStyleProps, typeof GRID_ROW_STYLE_PROP_KEYS>
