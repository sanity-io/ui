import type {FlexStyleProps} from '../../props/flex/types'
import type {RadiusStyleProps} from '../../props/radius/types'
import type {WidthStyleProps} from '../../props/width/types'
import type {ButtonMode, ElementTone} from '@sanity/ui/theme'

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
   *
   * @type {string}
   * @defaultValue undefined
   * @optional
   */
  className?: string

  /**
   * Controls the visual rendering mode of the button.
   *
   * @remarks
   * Determines the level of visual emphasis the button carries.
   *
   * Accepted values:
   * - `"default"` – Renders a filled button with a solid background.
   * - `"ghost"` – Renders a button with a transparent background and a visible border.
   * - `"bleed"` – Renders a button with no background or border; content bleeds into the surrounding layout.
   *
   * @type {ButtonMode}
   * @defaultValue `"default"`
   * @optional
   */
  mode?: ButtonMode

  /**
   * Sets the color tone of the button, which determines its color scheme.
   *
   * @remarks
   * The tone maps to a set of semantic color tokens from the theme.
   *
   * Accepted values:
   * - `"default"` – Neutral default tone.
   * - `"neutral"` – Neutral emphasis tone.
   * - `"primary"` – Primary action tone.
   * - `"suggest"` – Suggestive or informational tone.
   * - `"positive"` – Positive or success tone.
   * - `"caution"` – Warning or caution tone.
   * - `"critical"` – Destructive or critical action tone.
   *
   * @type {ElementTone}
   * @defaultValue `"default"`
   * @optional
   */
  tone?: ElementTone
}
