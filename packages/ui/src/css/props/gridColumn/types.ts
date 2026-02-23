import type {ResponsiveProp} from '../../types'

/**
 * Accepted values for the `gridColumn` style prop.
 *
 * @remarks
 * Controls how many columns a grid item spans or its placement within the grid.
 *
 * - `"auto"` – The item is placed automatically by the grid layout algorithm.
 * - `"full"` – The item spans all columns in the grid.
 * - `1`–`12` – The item spans the specified number of columns.
 *
 * @public
 */
export type GridColumn = 'auto' | 'full' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/**
 * Style props for controlling a grid item's column span or placement.
 *
 * @public
 */
export interface GridColumnStyleProps {
  /**
   * Controls how many columns a grid item spans or where it is placed.
   *
   * @remarks
   * Maps to the CSS `grid-column` shorthand property. Supports responsive values.
   *
   * Accepted values:
   * - `"auto"` – The item is placed automatically by the grid layout algorithm.
   * - `"full"` – The item spans all columns in the grid.
   * - `1`–`12` – The item spans the specified number of columns.
   *
   * @type {ResponsiveProp\<GridColumn\>}
   * @defaultValue undefined
   * @optional
   */
  gridColumn?: ResponsiveProp<GridColumn>
}
