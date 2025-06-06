import type {ResponsiveProp} from '../../types'

/** @public */
export type GridAutoFlow = 'row' | 'column' | 'row dense' | 'column dense'

/** @public */
export interface GridAutoFlowStyleProps {
  /**
   * @deprecated Use `gridAutoFlow` instead
   */
  autoFlow?: ResponsiveProp<GridAutoFlow>
  gridAutoFlow?: ResponsiveProp<GridAutoFlow>
}
