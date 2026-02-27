import type {ContainerWidth} from '@sanity/ui/theme'

import type {ResponsiveProp} from '../../types'

/**
 * Accepted values for the `width` style prop.
 *
 * @remarks
 * Controls the width of an element using a combination of the theme's container
 * width scale and several keyword values.
 *
 * - `0`–`5` / `"auto"` – Values from the {@link ContainerWidth} scale (includes `"auto"`).
 * - `"fill"` – The element fills the available width of its parent (`width: 100%`).
 * - `"stretch"` – The element stretches to fill available space (`width: -webkit-fill-available` / `stretch`).
 * - `"min"` – The element shrinks to fit its content (`width: min-content`).
 * - `"max"` – The element expands to fit its content (`width: max-content`).
 *
 * @public
 */
export type Width = ContainerWidth | 'auto' | 'fill' | 'stretch' | 'min' | 'max'

/**
 * Style props for controlling the width of an element.
 *
 * @public
 */
export interface WidthStyleProps {
  /**
   * Sets the width of the element.
   *
   * @remarks
   * Maps to the CSS `width` property. Supports responsive values.
   */
  width?: ResponsiveProp<Width>
}
