import type {ResponsiveProp} from '../../types'

/**
 * Accepted values for the `gridTemplateColumns` style prop.
 *
 * @remarks
 * Maps to the CSS `grid-template-columns` property. Defines the number
 * of explicit columns in a grid layout, where each column receives an
 * equal fraction of the available space (`1fr`).
 *
 * Accepted values: `1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12`
 *
 * @public
 */
export type GridTemplateColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/**
 * Style props for defining the explicit column structure of a grid layout.
 *
 * @public
 */
export interface GridTemplateColumnsStyleProps {
  /**
   * Defines the number of columns in the grid layout.
   *
   * @remarks
   * Maps to the CSS `grid-template-columns` property. Each column is assigned
   * an equal fraction of the available space (`1fr` per column). Supports responsive values.
   *
   * Accepted values: `1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12`
   *
   * @type {ResponsiveProp\<GridTemplateColumns\>}
   * @defaultValue undefined
   * @optional
   */
  gridTemplateColumns?: ResponsiveProp<GridTemplateColumns>
}
