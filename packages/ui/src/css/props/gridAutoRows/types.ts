import type {ResponsiveProp} from '../../types'

/**
 * Accepted values for the `gridAutoRows` style prop.
 *
 * @remarks
 * Maps to the CSS `grid-auto-rows` property. Controls the size of
 * implicitly created grid rows.
 *
 * - `"auto"` – Rows are sized based on the content within them.
 * - `"min"` – Rows are sized to `min-content`.
 * - `"max"` – Rows are sized to `max-content`.
 * - `"fr"` – Rows are sized to `1fr`, distributing available space equally.
 *
 * @public
 */
export type GridAutoRows = 'auto' | 'min' | 'max' | 'fr'

/**
 * Style props for controlling the size of implicitly created grid rows.
 *
 * @public
 */
export interface GridAutoRowsStyleProps {
  /**
   * Sets the size of implicitly created grid rows.
   *
   * @remarks
   * Maps to the CSS `grid-auto-rows` property. Supports responsive values.
   *
   * Implicitly created rows are those generated when grid items are placed
   * outside of the explicitly defined grid template.
   *
   * Accepted values:
   * - `"auto"` – Rows are sized based on the content within them.
   * - `"min"` – Rows are sized to `min-content`.
   * - `"max"` – Rows are sized to `max-content`.
   * - `"fr"` – Rows are sized to `1fr`, distributing available space equally.
   *
   * @type {ResponsiveProp\<GridAutoRows\>}
   * @defaultValue undefined
   * @optional
   */
  gridAutoRows?: ResponsiveProp<GridAutoRows>
}
