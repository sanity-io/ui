import type {ButtonMode, ElementTone} from '@sanity/ui/theme'

import type {FlexStyleProps} from '../../props/flex/types'
import type {RadiusStyleProps} from '../../props/radius/types'
import type {WidthStyleProps} from '../../props/width/types'

/**
 * Style props for the {@link Button} component's visual appearance.
 *
 * @remarks
 * Extends {@link FlexStyleProps}, {@link RadiusStyleProps}, and {@link WidthStyleProps}
 * to provide layout control alongside button-specific visual properties.
 *
 * @public
 */
export interface ButtonStyleProps extends FlexStyleProps, RadiusStyleProps, WidthStyleProps {
  /**
   * A custom CSS class name to append to the element.
   */
  className?: string

  /**
   * Controls the visual rendering mode of the button.
   *
   * @remarks
   * Determines the level of visual emphasis the button carries.
   *
   * @defaultValue `"default"`
   */
  mode?: ButtonMode

  /**
   * Sets the color tone of the button, which determines its color scheme.
   *
   * @remarks
   * The tone maps to a set of semantic color tokens from the theme.
   *
   * @defaultValue `"default"`
   */
  tone?: ElementTone
}
