import type {Shadow} from '@sanity/ui/theme'

import type {ResponsiveProp} from '../../types'

/**
 * Style props for controlling the box shadow applied to an element.
 *
 * @public
 */
export interface ShadowStyleProps {
  /**
   * Sets the box shadow elevation level of the element.
   *
   * @remarks
   * Maps to a themed set of `box-shadow` values. Higher values produce
   * a more pronounced shadow, conveying greater elevation. Supports responsive values.
   *
   * Uses the shadow scale defined by the theme.
   *
   * Accepted values: `0 | 1 | 2 | 3 | 4 | 5`
   *
   * @type {ResponsiveProp\<Shadow\>}
   * @defaultValue undefined
   * @optional
   */
  shadow?: ResponsiveProp<Shadow>
}
