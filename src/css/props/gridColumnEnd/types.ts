import type {ResponsiveProp} from '../../types'

/** @public */
export type GridColumnEnd = 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/**
 * @public
 * @deprecated Use `GridColumnEnd` instead
 */
export type GridItemColumnEnd = 'auto' | number

/** @public */
export interface GridColumnEndStyleProps {
  /**
   * @deprecated Use `gridColumnEnd` instead
   */
  columnEnd?: ResponsiveProp<GridItemColumnEnd>
  gridColumnEnd?: ResponsiveProp<GridColumnEnd>
}
