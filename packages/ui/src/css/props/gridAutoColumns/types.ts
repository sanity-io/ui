import type {ResponsiveProp} from '../../types'

/**
 * Accepted values for the `gridAutoColumns` style prop.
 *
 * @remarks
 * Maps to the CSS `grid-auto-columns` property. Specifies the size of
 * implicitly created grid columns.
 *
 * - `"auto"` – Columns are sized based on their content.
 * - `"min"` – Columns are sized to their minimum content size (`min-content`).
 * - `"max"` – Columns are sized to their maximum content size (`max-content`).
 * - `"fr"` – Columns are sized to an equal fraction of the available space (`1fr`).
 *
 * @public
 */
export type GridAutoColumns = 'auto' | 'min' | 'max' | 'fr'

/**
 * Style props for controlling the size of implicitly created grid columns.
 *
 * @public
 */
export interface GridAutoColumnsStyleProps {
  /**
   * Sets the size of implicitly created grid columns.
   *
   * @remarks
   * Maps to the CSS `grid-auto-columns` property. Supports responsive values.
   *
   * Implicitly created columns appear when grid items are placed outside
   * the bounds of the explicitly defined grid template.
   */
  gridAutoColumns?: ResponsiveProp<GridAutoColumns>
}
