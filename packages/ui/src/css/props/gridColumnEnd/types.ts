import type {ResponsiveProp} from '../../types'

/**
 * Accepted values for the `gridColumnEnd` style prop.
 *
 * @remarks
 * Maps to the CSS `grid-column-end` property. Specifies the grid line
 * at which a grid item's column placement ends.
 *
 * - `"auto"` – The item is placed automatically according to the grid's auto-placement algorithm.
 * - `1`–`12` – Specifies the ending grid line number for the item's column placement.
 *
 * @public
 */
export type GridColumnEnd = 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/**
 * Style props for controlling the ending grid line of an item's column placement.
 *
 * @public
 */
export interface GridColumnEndStyleProps {
  /**
   * Specifies the grid line at which the item's column placement ends.
   *
   * @remarks
   * Maps to the CSS `grid-column-end` property. Supports responsive values.
   */
  gridColumnEnd?: ResponsiveProp<GridColumnEnd>
}
