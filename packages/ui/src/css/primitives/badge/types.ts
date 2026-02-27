import type {ElementTone, FontTextSize} from '@sanity/ui/theme'

import type {ResponsiveProp} from '../../types'

/**
 * Accepted values for the Badge `tone` prop.
 *
 * @remarks
 * Inherits from {@link ElementTone}. Controls the color scheme applied to the badge.
 *
 * @public
 */
export type BadgeTone = ElementTone

/**
 * Style props for the {@link Badge} component.
 *
 * @public
 */
export interface BadgeStyleProps {
  /**
   * A custom CSS class name to append to the element.
   */
  className?: string

  /**
   * Sets the font size of the badge text content.
   *
   * @remarks
   * Uses the text font size scale defined by the theme. Supports responsive values.
   *
   * @defaultValue 1
   */
  fontSize?: ResponsiveProp<FontTextSize>

  /**
   * Sets the color tone of the badge.
   *
   * @remarks
   * Controls the background and foreground colors applied to the badge based
   * on the current theme.
   *
   * @defaultValue "default"
   */
  tone?: BadgeTone
}
