import type {ResponsiveProp} from '../../types'

/**
 * Accepted values for inset style props.
 *
 * @remarks
 * Currently only supports `0`, which positions the element flush against
 * the edges of its containing block.
 *
 * @public
 */
export type Inset = 0

/**
 * Style props for controlling the inset (offset) positioning of an element.
 *
 * @remarks
 * Inset props are used in combination with a non-static `position` value
 * (e.g. `"absolute"` or `"fixed"`) to anchor the element to the edges of its
 * positioned ancestor.
 *
 * @public
 */
export interface InsetStyleProps {
  /**
   * Sets the inset on all sides of the element.
   *
   * @remarks
   * Maps to the CSS `inset` shorthand property. Supports responsive values.
   *
   * When set to `0`, the element is positioned flush against all edges of its
   * containing block.
   *
   * Accepted values: `0`
   *
   * @type {ResponsiveProp\<Inset\>}
   * @defaultValue undefined
   * @optional
   */
  inset?: ResponsiveProp<Inset>

  /**
   * Sets the top inset of the element.
   *
   * @remarks
   * Maps to the CSS `top` property. Supports responsive values.
   *
   * When set to `0`, the element is positioned flush against the top edge of its
   * containing block. Overrides the top portion of the `inset` prop when both
   * are specified.
   *
   * Accepted values: `0`
   *
   * @type {ResponsiveProp\<Inset\>}
   * @defaultValue undefined
   * @optional
   */
  insetTop?: ResponsiveProp<Inset>

  /**
   * Sets the right inset of the element.
   *
   * @remarks
   * Maps to the CSS `right` property. Supports responsive values.
   *
   * When set to `0`, the element is positioned flush against the right edge of its
   * containing block. Overrides the right portion of the `inset` prop when both
   * are specified.
   *
   * Accepted values: `0`
   *
   * @type {ResponsiveProp\<Inset\>}
   * @defaultValue undefined
   * @optional
   */
  insetRight?: ResponsiveProp<Inset>

  /**
   * Sets the bottom inset of the element.
   *
   * @remarks
   * Maps to the CSS `bottom` property. Supports responsive values.
   *
   * When set to `0`, the element is positioned flush against the bottom edge of its
   * containing block. Overrides the bottom portion of the `inset` prop when both
   * are specified.
   *
   * Accepted values: `0`
   *
   * @type {ResponsiveProp\<Inset\>}
   * @defaultValue undefined
   * @optional
   */
  insetBottom?: ResponsiveProp<Inset>

  /**
   * Sets the left inset of the element.
   *
   * @remarks
   * Maps to the CSS `left` property. Supports responsive values.
   *
   * When set to `0`, the element is positioned flush against the left edge of its
   * containing block. Overrides the left portion of the `inset` prop when both
   * are specified.
   *
   * Accepted values: `0`
   *
   * @type {ResponsiveProp\<Inset\>}
   * @defaultValue undefined
   * @optional
   */
  insetLeft?: ResponsiveProp<Inset>
}
