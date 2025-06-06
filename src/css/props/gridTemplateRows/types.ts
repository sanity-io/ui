import type {ResponsiveProp} from '../../types'

/** @public */
export type GridTemplateRows = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/**
 * @public
 * @deprecated Use `GridTemplateRows` instead
 */
export type Rows = GridTemplateRows

/** @public */
export interface GridTemplateRowsStyleProps {
  /**
   * @deprecated Use `gridTemplateRows` instead
   */
  rows?: ResponsiveProp<Rows>
  gridTemplateRows?: ResponsiveProp<GridTemplateRows>
}
