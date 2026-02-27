import type {FontHeadingSize} from '@sanity/ui/theme'

import type {FlexStyleProps} from '../../props/flex/types'
import type {FontStyleProps} from '../../props/font/types'
import type {MarginStyleProps} from '../../props/margin/types'
import type {MaxWidthStyleProps} from '../../props/maxWidth/types'
import type {TextAlignStyleProps} from '../../props/textAlign/types'
import type {ResponsiveProp} from '../../types'

/**
 * Style props for the {@link Heading} component.
 *
 * @remarks
 * Extends {@link FontStyleProps}, {@link FlexStyleProps}, {@link MarginStyleProps},
 * and {@link MaxWidthStyleProps} to provide typographic control over heading elements.
 *
 * @public
 */
export interface HeadingStyleProps
  extends FontStyleProps,
    FlexStyleProps,
    MarginStyleProps,
    MaxWidthStyleProps {
  /**
   * Sets the horizontal text alignment of the heading content.
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
   * When `true`, reduces the visual prominence of the heading by applying
   * a muted foreground color from the theme.
   *
   * @defaultValue false
   */
  muted?: boolean

  /**
   * Sets the font size of the heading using the theme's heading size scale.
   *
   * @remarks
   * Supports responsive values. Maps to a set of predefined font sizes
   * defined in the theme's heading typography scale.
   *
   * @defaultValue 2
   */
  size?: ResponsiveProp<FontHeadingSize>
}
