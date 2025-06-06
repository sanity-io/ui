import type {ResponsiveProp} from '../../types'

/** @public */
export type GridTemplateColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/**
 * @public
 * @deprecated Use `GridTemplateColumns` instead
 */
export type Columns = GridTemplateColumns

/** @public */
export interface GridTemplateColumnsStyleProps {
  /**
   * @deprecated Use `gridTemplateColumns` instead
   */
  columns?: ResponsiveProp<Columns>
  gridTemplateColumns?: ResponsiveProp<GridTemplateColumns>
}
