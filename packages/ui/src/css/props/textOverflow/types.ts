/**
 * Accepted values for the `textOverflow` style prop.
 *
 * @remarks
 * Controls how overflowing inline text content is treated.
 *
 * - `"ellipsis"` – Truncates overflowing text and appends an ellipsis character (`…`).
 * - `"clip"` – Clips overflowing text at the edge of the content area without any visual indicator.
 *
 * @public
 */
export type TextOverflow = 'ellipsis' | 'clip'

/**
 * Style props for controlling how overflowing text content is displayed.
 *
 * @public
 */
export interface TextOverflowStyleProps {
  /**
   * Controls how overflowing text is treated.
   *
   * @remarks
   * When set to `"ellipsis"`, renders text as a single line which is truncated
   * with a `…` character when it overflows. When set to `"clip"`, overflowing
   * text is clipped at the edge of the content area.
   *
   * Maps to the CSS `text-overflow` property. Requires the element to have
   * constrained dimensions and `overflow: hidden` (or equivalent) in order
   * to take effect.
   *
   * Accepted values:
   * - `"ellipsis"` – Truncates overflowing text and appends `…`.
   * - `"clip"` – Clips overflowing text with no visual indicator.
   *
   * @type {TextOverflow}
   * @defaultValue undefined
   * @optional
   *
   * @beta
   */
  textOverflow?: TextOverflow
}
