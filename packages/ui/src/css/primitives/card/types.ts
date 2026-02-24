import type {CardTone, ColorScheme} from '@sanity/ui/theme'

/**
 * Style props for the {@link Card} component's visual appearance.
 *
 * @remarks
 * Controls the color scheme, tone, and visual treatment of a `Card` element.
 * These props work in conjunction with the theme to determine the card's
 * background color, foreground color, and other visual characteristics.
 *
 * @public
 */
export interface CardStyleProps {
  /**
   * A custom CSS class name to append to the element.
   */
  className?: string

  /**
   * When `true`, renders a checkered background pattern on the card.
   */
  checkered?: boolean

  /**
   * Sets the color scheme of the card.
   *
   * @remarks
   * Determines whether the card renders in a light or dark color mode.
   * Child components inherit this scheme unless they specify their own.
   */
  scheme?: ColorScheme

  /**
   * Sets the color tone of the card.
   *
   * @remarks
   * Controls the background and foreground colors applied to the card
   * based on the active theme. Child components inherit this tone unless
   * they specify their own.
   */
  tone?: CardTone | 'inherit'
}
