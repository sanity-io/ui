import {type ExactKeyTuple} from '../../_keys'
import type {ResponsiveProp} from '../../types'

/** @public */
export type GridAutoRows = 'auto' | 'min' | 'max' | 'fr'

/** @public */
export interface GridAutoRowsStyleProps {
  gridAutoRows?: ResponsiveProp<GridAutoRows>
}

/** @internal */
export const GRID_AUTO_ROWS_STYLE_PROP_KEYS = ['gridAutoRows'] as const

// assert exact keys
GRID_AUTO_ROWS_STYLE_PROP_KEYS satisfies ExactKeyTuple<
  GridAutoRowsStyleProps,
  typeof GRID_AUTO_ROWS_STYLE_PROP_KEYS
>
