import type {ContainerWidth} from '@sanity/ui/theme'

import type {ResponsiveProp} from '../../types'

/**
 * Style props for the {@link Container} component.
 *
 * @public
 */
export interface ContainerStyleProps {
  /**
   * A custom CSS class name to append to the element.
   */
  className?: string

  /**
   * Sets the maximum width of the container using the theme's container width scale.
   *
   * @remarks
   * The container width scale maps numeric indices to predefined `max-width` values
   * defined by the theme. Supports responsive values.
   *
   * - `0` – Narrowest container width from the theme scale.
   * - `1` – Second narrowest container width.
   * - `2` – Medium container width.
   * - `3` – Wide container width.
   * - `4` – Extra-wide container width.
   * - `5` – Widest container width from the theme scale.
   * - `"auto"` – No maximum width constraint; the container sizes to its parent.
   */
  width?: ResponsiveProp<ContainerWidth>
}
