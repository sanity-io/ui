import {type ExactKeyTuple} from '../../_keys'
import type {ResponsiveProp} from '../../types'

/** @public */
export type GridTemplateRows = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/** @public */
export interface GridTemplateRowsStyleProps {
  gridTemplateRows?: ResponsiveProp<GridTemplateRows>
}

/** @internal */
export const GRID_TEMPLATE_ROWS_STYLE_PROP_KEYS = ['gridTemplateRows'] as const

// assert exact keys
GRID_TEMPLATE_ROWS_STYLE_PROP_KEYS satisfies ExactKeyTuple<
  GridTemplateRowsStyleProps,
  typeof GRID_TEMPLATE_ROWS_STYLE_PROP_KEYS
>
