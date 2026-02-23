import type {FontWeight} from '@sanity/ui/theme'

/**
 * Style props for controlling the font weight of text content.
 *
 * @public
 */
export interface FontStyleProps {
  /**
   * Sets the font weight of the text content.
   *
   * @remarks
   * Maps to the CSS `font-weight` property.
   *
   * Accepted values:
   * - `"regular"` – Normal font weight.
   * - `"medium"` – Medium font weight.
   * - `"semibold"` – Semi-bold font weight.
   * - `"bold"` – Bold font weight.
   *
   * @type {FontWeight}
   * @defaultValue undefined
   * @optional
   */
  weight?: FontWeight
}
