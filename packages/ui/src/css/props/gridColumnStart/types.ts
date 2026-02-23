import type {ResponsiveProp} from '../../types'

/**
 * Accepted values for the `gridColumnStart` style prop.
 *
 * @remarks
 * Maps to the CSS `grid-column-start` property. Determines the starting
 * grid line of an item within a grid container's column axis.
 *
 * - `"auto"` – The item is placed automatically by the grid auto-placement algorithm.
 * - `1`–`12` – Specifies the starting column grid line number.
 *
 * @public
 */
export type GridColumnStart = 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/**
 * Style props for controlling the starting column grid line of an item within a grid container.
 *
 * @public
 */
export interface GridColumnStartStyleProps {
  /**
   * Sets the starting column grid line of the element within a grid container.
   *
   * @remarks
   * Maps to the CSS `grid-column-start` property. Supports responsive values.
   *
   * Accepted values:
   * - `"auto"` – The item is placed automatically by the grid auto-placement algorithm.
   * - `1`–`12` – Specifies the starting column grid line number.
   *
   * @type {ResponsiveProp\<GridColumnStart\>}
   * @defaultValue undefined
   * @optional
   */
  gridColumnStart?: ResponsiveProp<GridColumnStart>
}
