import type {ResponsiveProp} from '../../types'

/**
 * Accepted values for the `flexDirection` style prop.
 *
 * @remarks
 * Maps to the CSS `flex-direction` property. Determines the main axis
 * direction in which flex items are placed within a flex container.
 *
 * - `"row"` – Items are placed along the horizontal axis (left to right in LTR).
 * - `"row-reverse"` – Items are placed along the horizontal axis in reverse order.
 * - `"column"` – Items are placed along the vertical axis (top to bottom).
 * - `"column-reverse"` – Items are placed along the vertical axis in reverse order.
 *
 * @public
 */
export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse'

/**
 * Style props for controlling the direction of flex items within a flex container.
 *
 * @public
 */
export interface FlexDirectionStyleProps {
  /**
   * Sets the direction in which flex items are placed within a flex container.
   *
   * @remarks
   * Maps to the CSS `flex-direction` property. Supports responsive values.
   *
   * Accepted values:
   * - `"row"` – Items are placed along the horizontal axis (left to right in LTR).
   * - `"row-reverse"` – Items are placed along the horizontal axis in reverse order.
   * - `"column"` – Items are placed along the vertical axis (top to bottom).
   * - `"column-reverse"` – Items are placed along the vertical axis in reverse order.
   *
   * @type {ResponsiveProp\<FlexDirection\>}
   * @defaultValue undefined
   * @optional
   */
  flexDirection?: ResponsiveProp<FlexDirection>
}
