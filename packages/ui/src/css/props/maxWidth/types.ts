import type {ContainerWidth} from '@sanity/ui/theme'

import type {ResponsiveProp} from '../../types'

/**
 * Accepted values for the `maxWidth` style prop.
 *
 * @remarks
 * Includes all values from the container width scale (`0`–`5`, `"auto"`) plus `"fill"`.
 *
 * - `0`–`5` – Constrains the element's maximum width to one of the predefined container widths from the theme.
 * - `"auto"` – The maximum width is determined by the element's content.
 * - `"fill"` – The maximum width is set to `100%` of the parent container.
 *
 * @public
 */
export type MaxWidth = ContainerWidth | 'auto' | 'fill'

/**
 * Style props for constraining the maximum width of an element.
 *
 * @public
 */
export interface MaxWidthStyleProps {
  /**
   * Sets the maximum width of the element.
   *
   * @remarks
   * Maps to the CSS `max-width` property. Supports responsive values.
   *
   * Uses the container width scale defined by the theme, plus the special
   * values `"auto"` and `"fill"`.
   *
   * Accepted values:
   * - `0`–`5` – Constrains to a predefined container width from the theme.
   * - `"auto"` – The maximum width is determined by the element's content.
   * - `"fill"` – Sets the maximum width to `100%` of the parent container.
   *
   * @type {ResponsiveProp\<MaxWidth\>}
   * @defaultValue undefined
   * @optional
   */
  maxWidth?: ResponsiveProp<MaxWidth>
}
