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
   *
   * @type {string}
   * @defaultValue undefined
   * @optional
   */
  className?: string

  /**
   * When `true`, renders a checkered background pattern on the card.
   *
   * @type {boolean}
   * @defaultValue undefined
   * @optional
   */
  checkered?: boolean

  /**
   * Sets the color scheme of the card.
   *
   * @remarks
   * Determines whether the card renders in a light or dark color mode.
   * Child components inherit this scheme unless they specify their own.
   *
   * Accepted values:
   * - `"light"` – Uses the light color scheme from the theme.
   * - `"dark"` – Uses the dark color scheme from the theme.
   *
   * @type {ColorScheme}
   * @defaultValue undefined
   * @optional
   */
  scheme?: ColorScheme

  /**
   * Sets the color tone of the card.
   *
   * @remarks
   * Controls the background and foreground colors applied to the card
   * based on the active theme. Child components inherit this tone unless
   * they specify their own.
   *
   * Accepted values:
   * - `"transparent"` – No background color; inherits from the parent context.
   * - `"default"` – The default card tone from the theme.
   * - `"neutral"` – A neutral, subdued tone.
   * - `"primary"` – The primary/brand tone, typically used for selections.
   * - `"suggest"` – A suggestive tone for recommendations or hints.
   * - `"positive"` – A positive/success tone.
   * - `"caution"` – A cautionary/warning tone.
   * - `"critical"` – A critical/error tone.
   * - `"inherit"` – Inherits the tone from the nearest parent `Card`.
   *
   * @type {CardTone | 'inherit'}
   * @defaultValue undefined
   * @optional
   */
  tone?: CardTone | 'inherit'
}
