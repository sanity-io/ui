import type {Space} from '@sanity/ui/theme'

import type {ResponsiveProp} from '../../types'

/**
 * Accepted values for margin style props.
 *
 * @remarks
 * Includes all values from the theme spacing scale (`0`–`9`) plus `"auto"`.
 *
 * @public
 */
export type Margin = Space | 'auto'

/**
 * Style props for controlling the outer margin of an element.
 *
 * @public
 */
export interface MarginStyleProps {
  /**
   * Sets the margin on all sides of the element.
   *
   * @remarks
   * Maps to the CSS `margin` property. Supports responsive values.
   *
   * Uses the spacing scale defined by the theme, plus `"auto"` for automatic centering.
   */
  margin?: ResponsiveProp<Margin>

  /**
   * Sets the margin on both the left and right sides of the element.
   *
   * @remarks
   * Maps to the CSS `margin-left` and `margin-right` properties. Supports responsive values.
   *
   * Overrides the horizontal portion of the `margin` prop when both are specified.
   */
  marginX?: ResponsiveProp<Margin>

  /**
   * Sets the margin on both the top and bottom sides of the element.
   *
   * @remarks
   * Maps to the CSS `margin-top` and `margin-bottom` properties. Supports responsive values.
   *
   * Overrides the vertical portion of the `margin` prop when both are specified.
   */
  marginY?: ResponsiveProp<Margin>

  /**
   * Sets the margin on the top side of the element.
   *
   * @remarks
   * Maps to the CSS `margin-top` property. Supports responsive values.
   *
   * Overrides the top portion of `margin` and `marginY` when specified.
   */
  marginTop?: ResponsiveProp<Margin>

  /**
   * Sets the margin on the right side of the element.
   *
   * @remarks
   * Maps to the CSS `margin-right` property. Supports responsive values.
   *
   * Overrides the right portion of `margin` and `marginX` when specified.
   */
  marginRight?: ResponsiveProp<Margin>

  /**
   * Sets the margin on the bottom side of the element.
   *
   * @remarks
   * Maps to the CSS `margin-bottom` property. Supports responsive values.
   *
   * Overrides the bottom portion of `margin` and `marginY` when specified.
   */
  marginBottom?: ResponsiveProp<Margin>

  /**
   * Sets the margin on the left side of the element.
   *
   * @remarks
   * Maps to the CSS `margin-left` property. Supports responsive values.
   *
   * Overrides the left portion of `margin` and `marginX` when specified.
   */
  marginLeft?: ResponsiveProp<Margin>
}
