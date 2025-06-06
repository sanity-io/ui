import type {ResponsiveProp} from '../../types'

/** @public */
export type GridRowEnd = 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/**
 * @public
 * @deprecated Use `GridRowEnd` instead
 */
export type GridItemRowEnd = 'auto' | number

/** @public */
export interface GridRowEndStyleProps {
  /**
   * @deprecated Use `gridRowEnd` instead
   */
  rowEnd?: ResponsiveProp<GridItemRowEnd>
  gridRowEnd?: ResponsiveProp<GridRowEnd>
}
