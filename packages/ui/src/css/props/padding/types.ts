import type {Space} from '@sanity/ui/theme'

import type {ResponsiveProp} from '../../types'

/** @public */
export type Padding = Space

/**
 * Style props for controlling the inner spacing (padding) of an element.
 *
 * @remarks
 * All padding props use the spacing scale defined by the theme.
 *
 * @public
 */
export interface PaddingStyleProps {
  /**
   * Sets the padding on all sides of the element.
   *
   * @remarks
   * Maps to the CSS `padding` property. Supports responsive values.
   *
   * Uses the spacing scale defined by the theme.
   *
   * Accepted values: `0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9`
   *
   * @type {ResponsiveProp\<Padding\>}
   * @defaultValue undefined
   * @optional
   */
  padding?: ResponsiveProp<Padding>

  /**
   * Sets the padding on the top side of the element.
   *
   * @remarks
   * Maps to the CSS `padding-top` property. Supports responsive values.
   *
   * Uses the spacing scale defined by the theme. Overrides the top portion
   * of the `padding` and `paddingY` props when specified.
   *
   * Accepted values: `0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9`
   *
   * @type {ResponsiveProp\<Padding\>}
   * @defaultValue undefined
   * @optional
   */
  paddingTop?: ResponsiveProp<Padding>

  /**
   * Sets the padding on the right side of the element.
   *
   * @remarks
   * Maps to the CSS `padding-right` property. Supports responsive values.
   *
   * Uses the spacing scale defined by the theme. Overrides the right portion
   * of the `padding` and `paddingX` props when specified.
   *
   * Accepted values: `0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9`
   *
   * @type {ResponsiveProp\<Padding\>}
   * @defaultValue undefined
   * @optional
   */
  paddingRight?: ResponsiveProp<Padding>

  /**
   * Sets the padding on the bottom side of the element.
   *
   * @remarks
   * Maps to the CSS `padding-bottom` property. Supports responsive values.
   *
   * Uses the spacing scale defined by the theme. Overrides the bottom portion
   * of the `padding` and `paddingY` props when specified.
   *
   * Accepted values: `0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9`
   *
   * @type {ResponsiveProp\<Padding\>}
   * @defaultValue undefined
   * @optional
   */
  paddingBottom?: ResponsiveProp<Padding>

  /**
   * Sets the padding on the left side of the element.
   *
   * @remarks
   * Maps to the CSS `padding-left` property. Supports responsive values.
   *
   * Uses the spacing scale defined by the theme. Overrides the left portion
   * of the `padding` and `paddingX` props when specified.
   *
   * Accepted values: `0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9`
   *
   * @type {ResponsiveProp\<Padding\>}
   * @defaultValue undefined
   * @optional
   */
  paddingLeft?: ResponsiveProp<Padding>

  /**
   * Sets the padding on both the left and right sides of the element.
   *
   * @remarks
   * A shorthand for setting `padding-left` and `padding-right` simultaneously.
   * Supports responsive values.
   *
   * Uses the spacing scale defined by the theme. Overrides the horizontal portions
   * of the `padding` prop when specified. Can be further overridden by `paddingLeft`
   * and `paddingRight`.
   *
   * Accepted values: `0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9`
   *
   * @type {ResponsiveProp\<Padding\>}
   * @defaultValue undefined
   * @optional
   */
  paddingX?: ResponsiveProp<Padding>

  /**
   * Sets the padding on both the top and bottom sides of the element.
   *
   * @remarks
   * A shorthand for setting `padding-top` and `padding-bottom` simultaneously.
   * Supports responsive values.
   *
   * Uses the spacing scale defined by the theme. Overrides the vertical portions
   * of the `padding` prop when specified. Can be further overridden by `paddingTop`
   * and `paddingBottom`.
   *
   * Accepted values: `0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9`
   *
   * @type {ResponsiveProp\<Padding\>}
   * @defaultValue undefined
   * @optional
   */
  paddingY?: ResponsiveProp<Padding>
}
