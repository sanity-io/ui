import type {FlexStyleProps} from '../../props/flex/types'
import type {FontStyleProps} from '../../props/font/types'
import type {MarginStyleProps} from '../../props/margin/types'
import type {MaxWidthStyleProps} from '../../props/maxWidth/types'
import type {TextAlignStyleProps} from '../../props/textAlign/types'
import type {ResponsiveProp} from '../../types'

import type {FontHeadingSize} from '@sanity/ui/theme'

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
   * When `true`, reduces the visual prominence of the heading by applying
   * a muted foreground color from the theme.
   *
   * @type {boolean}
   * @defaultValue false
   * @optional
   */
  muted?: boolean

  /**
   * Sets the font size of the heading using the theme's heading size scale.
   *
   * @remarks
   * Supports responsive values. Maps to a set of predefined font sizes
   * defined in the theme's heading typography scale.
   *
   * Accepted values: `0 | 1 | 2 | 3 | 4 | 5`
   *
   * @type {ResponsiveProp\<FontHeadingSize\>}
   * @defaultValue 2
   * @optional
   */
  size?: ResponsiveProp<FontHeadingSize>
}
