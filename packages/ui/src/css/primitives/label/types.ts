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
   */
  align?: TextAlignStyleProps['textAlign']

  /**
   * A custom CSS class name to append to the element.
   */
  className?: string

  /**
   * When `true`, reduces the visual prominence of the label by applying a
   * muted foreground color from the theme.
   *
   * @defaultValue false
   */
  muted?: boolean

  /**
   * Sets the font size of the label using the theme's label font size scale.
   *
   * @remarks
   * Supports responsive values. The label font size scale is independent from
   * the text and heading font size scales.
   *
   * @defaultValue 1
   */
  size?: ResponsiveProp<FontLabelSize>
}
