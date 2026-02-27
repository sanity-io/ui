import type {ResponsiveProp} from '../../types'

/**
 * Accepted values for the `position` style prop.
 *
 * @remarks
 * Maps to the CSS `position` property. Determines how an element is
 * positioned within the document flow.
 *
 * - `"absolute"` – Removes the element from the normal document flow and positions it relative to its closest positioned ancestor.
 * - `"fixed"` – Removes the element from the normal document flow and positions it relative to the viewport.
 * - `"relative"` – Positions the element relative to its normal position in the document flow.
 * - `"static"` – Positions the element according to the normal document flow (default browser behavior).
 * - `"sticky"` – Positions the element based on the scroll position; toggles between `relative` and `fixed` depending on the scroll threshold.
 *
 * @public
 */
export type Position = 'absolute' | 'fixed' | 'relative' | 'static' | 'sticky'

/**
 * Style props for controlling the CSS positioning scheme of an element.
 *
 * @public
 */
export interface PositionStyleProps {
  /**
   * Controls how the element is positioned within the document.
   *
   * @remarks
   * Maps to the CSS `position` property. Supports responsive values.
   */
  position?: ResponsiveProp<Position>
}
