import type {FontCodeSize} from '@sanity/ui/theme'

import type {FlexStyleProps} from '../../props/flex/types'
import type {FontStyleProps} from '../../props/font/types'
import type {MarginStyleProps} from '../../props/margin/types'
import type {MaxWidthStyleProps} from '../../props/maxWidth/types'
import type {ResponsiveProp} from '../../types'

/**
 * Style props for the {@link Code} component.
 *
 * @remarks
 * Combines {@link FlexStyleProps}, {@link FontStyleProps} (excluding `align`),
 * {@link MarginStyleProps}, and {@link MaxWidthStyleProps} with code-specific
 * sizing options.
 *
 * @public
 */
export interface CodeStyleProps
  extends FlexStyleProps,
    Omit<FontStyleProps, 'align'>,
    MarginStyleProps,
    MaxWidthStyleProps {
  /**
   * A custom CSS class name to append to the element.
   */
  className?: string

  /**
   * Sets the font size of the code text using the theme's code font size scale.
   *
   * @remarks
   * Maps to the theme's code font size scale. Supports responsive values.
   *
   * @defaultValue 2
   */
  size?: ResponsiveProp<FontCodeSize>
}
