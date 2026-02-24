import {type ExactKeyTuple} from '../../_keys'
import type {ResponsiveProp} from '../../types'

/** @public */
export type GridRowStart = 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/** @public */
export interface GridRowStartStyleProps {
  gridRowStart?: ResponsiveProp<GridRowStart>
}

/** @internal */
export const GRID_ROW_START_STYLE_PROP_KEYS = ['gridRowStart'] as const

// assert exact keys
GRID_ROW_START_STYLE_PROP_KEYS satisfies ExactKeyTuple<
  GridRowStartStyleProps,
  typeof GRID_ROW_START_STYLE_PROP_KEYS
>
