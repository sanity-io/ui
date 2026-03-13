import {type ExactKeyTuple} from '../../lib/props/_keys'
import type {ResponsiveProp} from '../../types'

/** @public */
export type GridAutoFlow = 'row' | 'column' | 'row dense' | 'column dense'

/** @public */
export interface GridAutoFlowStyleProps {
  gridAutoFlow?: ResponsiveProp<GridAutoFlow>
}

/** @internal */
export const GRID_AUTO_FLOW_STYLE_PROP_KEYS = ['gridAutoFlow'] as const

// assert exact keys
GRID_AUTO_FLOW_STYLE_PROP_KEYS satisfies ExactKeyTuple<
  GridAutoFlowStyleProps,
  typeof GRID_AUTO_FLOW_STYLE_PROP_KEYS
>
