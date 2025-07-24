import type {ResponsiveProp} from '../../types'

/** @public */
export type GridAutoFlow = 'row' | 'column' | 'row dense' | 'column dense'

/** @public */
export interface GridAutoFlowStyleProps {
  gridAutoFlow?: ResponsiveProp<GridAutoFlow>
}
