import type {Radius} from '@sanity/ui/theme'

import type {ResponsiveProp} from '../../types'

/**
 * Style props for controlling the border radius of an element.
 *
 * @public
 */
export interface RadiusStyleProps {
  /**
   * Sets the border radius of the element.
   *
   * @remarks
   * Maps to the CSS `border-radius` property. Supports responsive values.
   *
   * Uses the radius scale defined by the theme.
   */
  radius?: ResponsiveProp<Radius | 'full'>
}
