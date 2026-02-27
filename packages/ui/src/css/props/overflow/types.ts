import type {ResponsiveProp} from '../../types'

/**
 * Accepted values for overflow style props.
 *
 * @remarks
 * Maps to the CSS `overflow`, `overflow-x`, and `overflow-y` properties.
 *
 * - `"visible"` – Content is not clipped and may overflow the element's box.
 * - `"hidden"` – Content is clipped to the element's box with no scrollbars.
 * - `"auto"` – Content is clipped to the element's box and scrollbars appear only when content overflows.
 *
 * @public
 */
export type Overflow = 'visible' | 'hidden' | 'auto'

/**
 * Style props for controlling how overflowing content is handled.
 *
 * @public
 */
export interface OverflowStyleProps {
  /**
   * Controls how overflowing content is handled on both axes.
   *
   * @remarks
   * Maps to the CSS `overflow` property. Supports responsive values.
   */
  overflow?: ResponsiveProp<Overflow>

  /**
   * Controls how overflowing content is handled on the horizontal axis.
   *
   * @remarks
   * Maps to the CSS `overflow-x` property. Supports responsive values.
   *
   * Overrides the horizontal portion of the `overflow` prop when both are specified.
   */
  overflowX?: ResponsiveProp<Overflow>

  /**
   * Controls how overflowing content is handled on the vertical axis.
   *
   * @remarks
   * Maps to the CSS `overflow-y` property. Supports responsive values.
   *
   * Overrides the vertical portion of the `overflow` prop when both are specified.
   */
  overflowY?: ResponsiveProp<Overflow>
}
