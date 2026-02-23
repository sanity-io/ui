/**
 * Accepted values for the `boxSizing` style prop.
 *
 * @remarks
 * Maps to the CSS `box-sizing` property.
 *
 * - `"content"` – The `width` and `height` properties apply only to the content of the element, excluding padding and border (`content-box`).
 * - `"border"` – The `width` and `height` properties include padding and border, but not margin (`border-box`).
 *
 * @public
 */
export type BoxSizing = 'content' | 'border'

/**
 * Style props for controlling how the total width and height of an element are calculated.
 *
 * @public
 */
export interface BoxSizingStyleProps {
  /**
   * Controls how the total width and height of the element are calculated.
   *
   * @remarks
   * Maps to the CSS `box-sizing` property.
   *
   * Accepted values:
   * - `"content"` – Width and height apply only to the content area, excluding padding and border (`content-box`).
   * - `"border"` – Width and height include padding and border, but not margin (`border-box`).
   *
   * @type {BoxSizing}
   * @defaultValue undefined
   * @optional
   */
  boxSizing?: BoxSizing
}
