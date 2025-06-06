import type {ResponsiveProp} from '../../types'

/** @public */
export type GridRow = 'auto' | 'full' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/**
 * @public
 * @deprecated Use `GridRow` instead
 */
export type GridItemRow = 'auto' | 'full' | number

/** @public */
export interface GridRowStyleProps {
  /**
   * @deprecated Use `gridRow` instead
   */
  row?: ResponsiveProp<GridItemRow>
  gridRow?: ResponsiveProp<GridRow>
}
