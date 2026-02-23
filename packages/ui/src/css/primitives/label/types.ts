import type {FlexStyleProps} from '../../props/flex/types'
import type {FontStyleProps} from '../../props/font/types'
import type {MarginStyleProps} from '../../props/margin/types'
import type {MaxWidthStyleProps} from '../../props/maxWidth/types'
import type {TextAlignStyleProps} from '../../props/textAlign/types'

import type {ResponsiveProp} from '../../types'

import type {FontLabelSize} from '@sanity/ui/theme'

/**
 * Style props for the {@link Label} component.
 *
 * @remarks
 * Extends {@link FlexStyleProps}, {@link FontStyleProps}, {@link MarginStyleProps},
 * and {@link MaxWidthStyleProps} to provide a complete set of typographic and
 * layout props for label elements.
 *
 * @public
 */
export interface LabelStyleProps
  extends FlexStyleProps,
    FontStyleProps,
    MarginStyleProps,
    MaxWidthStyleProps {
  /**
   * Controls the horizontal alignment of the label text content.
   *
   * @remarks
   * Maps to the CSS `text-align` property.
   *
   * Accepted values:
   * - `"left"` – Aligns text to the left edge of the element.
   * - `"right"` – Aligns text to the right edge of the element.
   * - `"center"` – Centers text horizontally within the element.
   * - `"justify"` – Stretches lines so each line has equal width.
   * - `"initial"` – Resets the text alignment to the default value.
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
   * When `true`, reduces the visual prominence of the label by applying a
   * muted foreground color from the theme.
   *
   * @type {boolean}
   * @defaultValue false
   * @optional
   */
  muted?: boolean

  /**
   * Sets the font size of the label using the theme's label font size scale.
   *
   * @remarks
   * Supports responsive values. The label font size scale is independent from
   * the text and heading font size scales.
   *
   * Accepted values: `0 | 1 | 2 | 3 | 4 | 5`
   *
   * @type {ResponsiveProp\<FontLabelSize\>}
   * @defaultValue 1
   * @optional
   */
  size?: ResponsiveProp<FontLabelSize>
}
