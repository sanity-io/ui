import type {ResponsiveProp} from '../../types'

/**
 * Accepted values for the `gridRowEnd` style prop.
 *
 * @remarks
 * Maps to the CSS `grid-row-end` property. Specifies the grid line at which
 * a grid item ends within the row axis.
 *
 * - `"auto"` – The item is placed automatically by the grid auto-placement algorithm.
 * - `1`–`12` – Specifies the ending grid line by numerical index.
 *
 * @public
 */
export type GridRowEnd = 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/**
 * Style props for controlling the ending grid line of an item along the row axis.
 *
 * @public
 */
export interface GridRowEndStyleProps {
  /**
   * Sets the ending grid line of the item along the row axis.
   *
   * @remarks
   * Maps to the CSS `grid-row-end` property. Supports responsive values.
   */
  gridRowEnd?: ResponsiveProp<GridRowEnd>
}
