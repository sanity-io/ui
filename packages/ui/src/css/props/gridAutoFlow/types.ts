import type {ResponsiveProp} from '../../types'

/**
 * Accepted values for the `gridAutoFlow` style prop.
 *
 * @remarks
 * Maps to the CSS `grid-auto-flow` property. Controls how auto-placed items
 * are inserted into the grid.
 *
 * - `"row"` – Items are placed by filling each row in turn, adding new rows as necessary.
 * - `"column"` – Items are placed by filling each column in turn, adding new columns as necessary.
 * - `"row dense"` – Items are placed by filling each row, using a dense packing algorithm that attempts to fill holes earlier in the grid.
 * - `"column dense"` – Items are placed by filling each column, using a dense packing algorithm that attempts to fill holes earlier in the grid.
 *
 * @public
 */
export type GridAutoFlow = 'row' | 'column' | 'row dense' | 'column dense'

/**
 * Style props for controlling how auto-placed items are inserted into a grid layout.
 *
 * @public
 */
export interface GridAutoFlowStyleProps {
  /**
   * Controls how auto-placed items are inserted into the grid.
   *
   * @remarks
   * Maps to the CSS `grid-auto-flow` property. Supports responsive values.
   */
  gridAutoFlow?: ResponsiveProp<GridAutoFlow>
}
