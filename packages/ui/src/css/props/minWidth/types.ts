import type {ResponsiveProp} from '../../types'

/**
 * Accepted values for the `minWidth` style prop.
 *
 * @remarks
 * Maps to the CSS `min-width` property.
 *
 * - `0` – Sets the minimum width to `0`.
 * - `"auto"` – The browser calculates the minimum width based on content.
 * - `"full"` – Sets the minimum width to `100%` of the containing block.
 * - `"min"` – Sets the minimum width to `min-content`.
 * - `"max"` – Sets the minimum width to `max-content`.
 * - `"fit"` – Sets the minimum width to `fit-content`.
 *
 * @public
 */
export type MinWidth = 0 | 'auto' | 'full' | 'min' | 'max' | 'fit'

/**
 * Style props for controlling the minimum width of an element.
 *
 * @public
 */
export interface MinWidthStyleProps {
  /**
   * Sets the minimum width of the element.
   *
   * @remarks
   * Maps to the CSS `min-width` property. Supports responsive values.
   */
  minWidth?: ResponsiveProp<MinWidth>
}
