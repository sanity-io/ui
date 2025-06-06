import type {ResponsiveProp} from '../../types'

/** @public */
export type GridColumnStart = 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/**
 * @public
 * @deprecated Use `GridColumnStart` instead
 */
export type GridItemColumnStart = 'auto' | number

/** @public */
export interface GridColumnStartStyleProps {
  /**
   * @deprecated Use `gridColumnStart` instead
   */
  columnStart?: ResponsiveProp<GridItemColumnStart>
  gridColumnStart?: ResponsiveProp<GridColumnStart>
}
