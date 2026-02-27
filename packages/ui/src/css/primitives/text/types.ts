import type {FontTextSize} from '@sanity/ui/theme'

import type {FlexStyleProps} from '../../props/flex/types'
import type {FontStyleProps} from '../../props/font/types'
import type {MarginStyleProps} from '../../props/margin/types'
import type {MaxWidthStyleProps} from '../../props/maxWidth/types'
import type {TextAlignStyleProps} from '../../props/textAlign/types'
import type {ResponsiveProp} from '../../types'

/**
 * Style props for the {@link Text} component.
 *
 * @remarks
 * Combines flex, font, margin, and max-width style prop groups with
 * text-specific props for alignment, muted state, and font size.
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
   */
  align?: TextAlignStyleProps['textAlign']

  /**
   * A custom CSS class name to append to the element.
   */
  className?: string

  /**
   * When `true`, reduces the visual prominence of the text by applying a
   * muted foreground color from the theme.
   */
  muted?: boolean

  /**
   * Sets the font size of the text using the theme's text size scale.
   *
   * @remarks
   * Supports responsive values. The size maps to a predefined set of
   * font-size and line-height values defined in the theme.
   *
   * @defaultValue 2
   */
  size?: ResponsiveProp<FontTextSize>
}
