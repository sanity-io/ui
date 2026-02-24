import {type ExactKeyTuple} from '../../_keys'
import type {ResponsiveProp} from '../../types'

/** @public */
export type GridAutoColumns = 'auto' | 'min' | 'max' | 'fr'

/** @public */
export interface GridAutoColumnsStyleProps {
  gridAutoColumns?: ResponsiveProp<GridAutoColumns>
}

/** @internal */
export const GRID_AUTO_COLUMNS_STYLE_PROP_KEYS = ['gridAutoColumns'] as const

// assert exact keys
GRID_AUTO_COLUMNS_STYLE_PROP_KEYS satisfies ExactKeyTuple<
  GridAutoColumnsStyleProps,
  typeof GRID_AUTO_COLUMNS_STYLE_PROP_KEYS
>
