import type {ElementTone, FontTextSize} from '@sanity/ui/theme'

import type {ResponsiveProp} from '../../types'

/**
 * Accepted values for the Badge `tone` prop.
 *
 * @remarks
 * Inherits from {@link ElementTone}. Controls the color scheme applied to the badge.
 *
 * Accepted values: `"default" | "neutral" | "primary" | "suggest" | "positive" | "caution" | "critical"`
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
   *
   * @type {string}
   * @defaultValue undefined
   * @optional
   */
  className?: string

  /**
   * Sets the font size of the badge text content.
   *
   * @remarks
   * Uses the text font size scale defined by the theme. Supports responsive values.
   *
   * Accepted values: `0 | 1 | 2 | 3 | 4`
   *
   * @type {ResponsiveProp\<FontTextSize\>}
   * @defaultValue 1
   * @optional
   */
  fontSize?: ResponsiveProp<FontTextSize>

  /**
   * Sets the color tone of the badge.
   *
   * @remarks
   * Controls the background and foreground colors applied to the badge based
   * on the current theme.
   *
   * Accepted values:
   * - `"default"` – The default, neutral badge appearance.
   * - `"neutral"` – A neutral tone with subdued coloring.
   * - `"primary"` – The primary accent tone, typically used for selections.
   * - `"suggest"` – A suggestive tone for informational emphasis.
   * - `"positive"` – Indicates a positive or successful state.
   * - `"caution"` – Indicates a warning or cautionary state.
   * - `"critical"` – Indicates a critical or error state.
   *
   * @type {BadgeTone}
   * @defaultValue "default"
   * @optional
   */
  tone?: BadgeTone
}
