import type {FlexStyleProps} from '../../props/flex/types'
import type {FontStyleProps} from '../../props/font/types'
import type {MarginStyleProps} from '../../props/margin/types'
import type {MaxWidthStyleProps} from '../../props/maxWidth/types'
import type {TextAlignStyleProps} from '../../props/textAlign/types'

import type {ResponsiveProp} from '../../types'

import type {FontTextSize} from '@sanity/ui/theme'

/**
 * Style props for the {@link Text} component.
 *
 * @remarks
 * Combines flex, font, margin, and max-width style prop groups with
 * text-specific props for alignment, muted state, and font size.
 *
 * Inherited style prop groups:
 * - {@link FlexStyleProps}
 * - {@link FontStyleProps}
 * - {@link MarginStyleProps}
 * - {@link MaxWidthStyleProps}
 *
 * @public
 */
export interface TextStyleProps
  extends FlexStyleProps,
    FontStyleProps,
    MarginStyleProps,
    MaxWidthStyleProps {
  /**
   * Controls the horizontal alignment of the text content.
   *
   * @remarks
   * Maps to the CSS `text-align` property.
   *
   * Accepted values:
   * - `"left"` – Aligns text to the left edge.
   * - `"right"` – Aligns text to the right edge.
   * - `"center"` – Centers text horizontally.
   * - `"justify"` – Stretches lines so each line has equal width.
   * - `"initial"` – Resets text alignment to the default value.
   *
   * @type {TextAlignStyleProps['textAlign']}
   * @defaultValue undefined
   * @optional
   */
  align?: TextAlignStyleProps['textAlign']

  /**
   * A custom CSS class name to append to the element.
   *
   * @type {string}
   * @defaultValue undefined
   * @optional
   */
  className?: string

  /**
   * When `true`, reduces the visual prominence of the text by applying a
   * muted foreground color from the theme.
   *
   * @type {boolean}
   * @defaultValue undefined
   * @optional
   */
  muted?: boolean

  /**
   * Sets the font size of the text using the theme's text size scale.
   *
   * @remarks
   * Supports responsive values. The size maps to a predefined set of
   * font-size and line-height values defined in the theme.
   *
   * Accepted values: `0 | 1 | 2 | 3 | 4`
   *
   * @type {ResponsiveProp\<FontTextSize\>}
   * @defaultValue 2
   * @optional
   */
  size?: ResponsiveProp<FontTextSize>
}
