import type {ResponsiveProp} from '../../types'

/**
 * Accepted values for the `gridTemplateRows` style prop.
 *
 * @remarks
 * Maps to the CSS `grid-template-rows` property. Defines the number
 * of explicit rows in the grid by specifying how many equal-height
 * rows to create.
 *
 * Accepted values: `1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12`
 *
 * @public
 */
export type GridTemplateRows = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/**
 * Style props for defining the explicit row structure of a grid container.
 *
 * @public
 */
export interface GridTemplateRowsStyleProps {
  /**
   * Defines the number of rows in a grid layout.
   *
   * @remarks
   * Maps to the CSS `grid-template-rows` property. The numeric value
   * specifies how many equal-height rows to create using `repeat(n, 1fr)`.
   * Supports responsive values.
   *
   * Accepted values: `1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12`
   *
   * @type {ResponsiveProp\<GridTemplateRows\>}
   * @defaultValue undefined
   * @optional
   */
  gridTemplateRows?: ResponsiveProp<GridTemplateRows>
}
