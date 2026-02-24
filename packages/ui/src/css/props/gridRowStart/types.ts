import type {ResponsiveProp} from '../../types'

/**
 * Accepted values for the `gridRowStart` style prop.
 *
 * @remarks
 * Maps to the CSS `grid-row-start` property. Determines the starting
 * grid line of an item within a grid container's row axis.
 *
 * - `"auto"` – The item is placed automatically by the grid auto-placement algorithm.
 * - `1`–`12` – Specifies the starting row grid line number.
 *
 * @public
 */
export type GridRowStart = 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/**
 * Style props for controlling the starting row grid line of an item within a grid container.
 *
 * @public
 */
export interface GridRowStartStyleProps {
  /**
   * Sets the starting row grid line of the element within a grid container.
   *
   * @remarks
   * Maps to the CSS `grid-row-start` property. Supports responsive values.
   */
  gridRowStart?: ResponsiveProp<GridRowStart>
}
