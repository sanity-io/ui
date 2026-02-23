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
   *
   * Accepted values:
   * - `"visible"` – Content is not clipped and may overflow the element's box.
   * - `"hidden"` – Content is clipped to the element's box with no scrollbars.
   * - `"auto"` – Content is clipped and scrollbars appear only when content overflows.
   *
   * @type {ResponsiveProp\<Overflow\>}
   * @defaultValue undefined
   * @optional
   */
  overflow?: ResponsiveProp<Overflow>

  /**
   * Controls how overflowing content is handled on the horizontal axis.
   *
   * @remarks
   * Maps to the CSS `overflow-x` property. Supports responsive values.
   *
   * Overrides the horizontal portion of the `overflow` prop when both are specified.
   *
   * Accepted values:
   * - `"visible"` – Content is not clipped and may overflow horizontally.
   * - `"hidden"` – Content is clipped horizontally with no scrollbar.
   * - `"auto"` – Content is clipped horizontally and a scrollbar appears only when content overflows.
   *
   * @type {ResponsiveProp\<Overflow\>}
   * @defaultValue undefined
   * @optional
   */
  overflowX?: ResponsiveProp<Overflow>

  /**
   * Controls how overflowing content is handled on the vertical axis.
   *
   * @remarks
   * Maps to the CSS `overflow-y` property. Supports responsive values.
   *
   * Overrides the vertical portion of the `overflow` prop when both are specified.
   *
   * Accepted values:
   * - `"visible"` – Content is not clipped and may overflow vertically.
   * - `"hidden"` – Content is clipped vertically with no scrollbar.
   * - `"auto"` – Content is clipped vertically and a scrollbar appears only when content overflows.
   *
   * @type {ResponsiveProp\<Overflow\>}
   * @defaultValue undefined
   * @optional
   */
  overflowY?: ResponsiveProp<Overflow>
}
