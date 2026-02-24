import type {ResponsiveProp} from '../../types'

/**
 * Accepted values for the `alignItems` style prop.
 *
 * @remarks
 * Maps to the CSS `align-items` property.
 *
 * @public
 */
export type AlignItems = 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'stretch'

/**
 * Style props for controlling alignment of items along the cross axis in a flex or grid container.
 *
 * @public
 */
export interface AlignItemsStyleProps {
  /**
   * Controls alignment of items along the cross axis of a flex or grid container.
   *
   * @remarks
   * Maps to the CSS `align-items` property. Supports responsive values.
   */
  alignItems?: ResponsiveProp<AlignItems>
}
