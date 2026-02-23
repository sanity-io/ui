import type {FlexStyleProps} from '../../props/flex/types'
import type {FontStyleProps} from '../../props/font/types'
import type {MarginStyleProps} from '../../props/margin/types'
import type {MaxWidthStyleProps} from '../../props/maxWidth/types'
import type {ResponsiveProp} from '../../types'

import type {FontCodeSize} from '@sanity/ui/theme'

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
   *
   * @type {string}
   * @defaultValue undefined
   * @optional
   */
  className?: string

  /**
   * Sets the font size of the code text using the theme's code font size scale.
   *
   * @remarks
   * Maps to the theme's code font size scale. Supports responsive values.
   *
   * Accepted values: `0 | 1 | 2 | 3 | 4`
   *
   * @type {ResponsiveProp\<FontCodeSize\>}
   * @defaultValue 2
   * @optional
   */
  size?: ResponsiveProp<FontCodeSize>
}
