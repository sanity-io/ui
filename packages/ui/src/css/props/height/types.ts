import type {ResponsiveProp} from '../../types'

/**
 * Accepted values for the `height` style prop.
 *
 * @remarks
 * Maps to the CSS `height` property.
 *
 * - `"fill"` – Sets the height to `100%` of the containing element.
 * - `"auto"` – The element's height is determined by its content.
 * - `"min"` – Sets the height to `min-content`.
 * - `"max"` – Sets the height to `max-content`.
 * - `"fit"` – Sets the height to `fit-content`.
 * - `"stretch"` – Stretches the element to fill available space.
 *
 * @public
 */
export type Height = 'fill' | 'auto' | 'min' | 'max' | 'fit' | 'stretch'

/**
 * Style props for controlling the height of an element.
 *
 * @public
 */
export interface HeightStyleProps {
  /**
   * Sets the height of the element.
   *
   * @remarks
   * Maps to the CSS `height` property. Supports responsive values.
   */
  height?: ResponsiveProp<Height>
}
