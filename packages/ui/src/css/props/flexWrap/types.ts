import type {ResponsiveProp} from '../../types'

/**
 * Accepted values for the `flexWrap` style prop.
 *
 * @remarks
 * Maps to the CSS `flex-wrap` property.
 *
 * - `"wrap"` – Allows flex items to wrap onto multiple lines from top to bottom.
 * - `"wrap-reverse"` – Allows flex items to wrap onto multiple lines from bottom to top.
 * - `"nowrap"` – Forces all flex items onto a single line.
 *
 * @public
 */
export type FlexWrap = 'wrap' | 'wrap-reverse' | 'nowrap'

/**
 * Style props for controlling whether flex items wrap within a flex container.
 *
 * @public
 */
export interface FlexWrapStyleProps {
  /**
   * Controls whether flex items wrap onto multiple lines or are forced onto a single line.
   *
   * @remarks
   * Maps to the CSS `flex-wrap` property. Supports responsive values.
   *
   * Accepted values:
   * - `"wrap"` – Allows items to wrap onto multiple lines from top to bottom.
   * - `"wrap-reverse"` – Allows items to wrap onto multiple lines from bottom to top.
   * - `"nowrap"` – Forces all items onto a single line.
   *
   * @type {ResponsiveProp\<FlexWrap\>}
   * @defaultValue undefined
   * @optional
   */
  flexWrap?: ResponsiveProp<FlexWrap>
}
