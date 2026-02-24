import type {ResponsiveProp} from '../../types'

/**
 * Accepted values for the `gridRow` style prop.
 *
 * @remarks
 * Maps to the CSS `grid-row` shorthand property. Controls how many rows
 * a grid item spans or which row it starts/ends on.
 *
 * - `"auto"` – The item is placed automatically by the grid auto-placement algorithm.
 * - `"full"` – The item spans all available rows.
 * - `1`–`12` – The item spans the specified number of rows.
 *
 * @public
 */
export type GridRow = 'auto' | 'full' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/**
 * Style props for controlling how a grid item is placed along the row (block) axis.
 *
 * @public
 */
export interface GridRowStyleProps {
  /**
   * Controls the grid item's placement and span along the row axis.
   *
   * @remarks
   * Maps to the CSS `grid-row` shorthand property. Supports responsive values.
   */
  gridRow?: ResponsiveProp<GridRow>
}
