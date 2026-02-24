import {type ExactKeyTuple} from '../../_keys'
import type {ResponsiveProp} from '../../types'

/** @public */
export type GridTemplateColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/** @public */
export interface GridTemplateColumnsStyleProps {
  gridTemplateColumns?: ResponsiveProp<GridTemplateColumns>
}

/** @internal */
export const GRID_TEMPLATE_COLUMNS_STYLE_PROP_KEYS = ['gridTemplateColumns'] as const

// assert exact keys
GRID_TEMPLATE_COLUMNS_STYLE_PROP_KEYS satisfies ExactKeyTuple<
  GridTemplateColumnsStyleProps,
  typeof GRID_TEMPLATE_COLUMNS_STYLE_PROP_KEYS
>
