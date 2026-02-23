import type {ResponsiveProp} from '../../types'

/**
 * Accepted values for the `justifyContent` style prop.
 *
 * @remarks
 * Maps to the CSS `justify-content` property. Controls the distribution
 * of space between and around items along the main axis of a flex or grid container.
 *
 * - `"flex-start"` – Items are packed toward the start of the main axis.
 * - `"flex-end"` – Items are packed toward the end of the main axis.
 * - `"center"` – Items are centered along the main axis.
 * - `"space-between"` – Items are evenly distributed; the first item is at the start, the last item is at the end.
 * - `"space-around"` – Items are evenly distributed with equal space around each item.
 * - `"space-evenly"` – Items are evenly distributed with equal space between each item and the container edges.
 *
 * @public
 */
export type JustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'

/**
 * Style props for controlling the distribution of space between and around items along the main axis.
 *
 * @public
 */
export interface JustifyContentStyleProps {
  /**
   * Controls how items are distributed along the main axis of a flex or grid container.
   *
   * @remarks
   * Maps to the CSS `justify-content` property. Supports responsive values.
   *
   * Accepted values:
   * - `"flex-start"` – Items are packed toward the start of the main axis.
   * - `"flex-end"` – Items are packed toward the end of the main axis.
   * - `"center"` – Items are centered along the main axis.
   * - `"space-between"` – Items are evenly distributed; first item at the start, last at the end.
   * - `"space-around"` – Items are evenly distributed with equal space around each item.
   * - `"space-evenly"` – Items are evenly distributed with equal space between each item and edges.
   *
   * @type {ResponsiveProp\<JustifyContent\>}
   * @defaultValue undefined
   * @optional
   */
  justifyContent?: ResponsiveProp<JustifyContent>
}
