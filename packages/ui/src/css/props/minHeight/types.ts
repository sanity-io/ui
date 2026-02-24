import type {ResponsiveProp} from '../../types'

/**
 * Accepted values for the `minHeight` style prop.
 *
 * @remarks
 * Maps to the CSS `min-height` property.
 *
 * - `0` – Sets the minimum height to `0`.
 * - `"full"` – Sets the minimum height to `100%` of the parent container.
 *
 * @public
 */
export type MinHeight = 0 | 'full'

/**
 * Style props for controlling the minimum height of an element.
 *
 * @public
 */
export interface MinHeightStyleProps {
  /**
   * Sets the minimum height of the element.
   *
   * @remarks
   * Maps to the CSS `min-height` property. Supports responsive values.
   */
  minHeight?: ResponsiveProp<MinHeight>
}
