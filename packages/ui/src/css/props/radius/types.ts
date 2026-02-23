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
   *
   * Accepted values:
   * - `0` – No border radius (sharp corners).
   * - `1` – Extra-small border radius.
   * - `2` – Small border radius.
   * - `3` – Medium border radius.
   * - `4` – Large border radius.
   * - `5` – Extra-large border radius.
   * - `6` – Extra-extra-large border radius.
   * - `"full"` – Fully rounded (pill shape / circle).
   *
   * @type {ResponsiveProp\<Radius | 'full'\>}
   * @defaultValue undefined
   * @optional
   */
  radius?: ResponsiveProp<Radius | 'full'>
}
