/**
 * Accepted values for the `textAlign` style prop.
 *
 * @remarks
 * Maps to the CSS `text-align` property.
 *
 * - `"left"` – Aligns text to the left edge of the element.
 * - `"right"` – Aligns text to the right edge of the element.
 * - `"center"` – Centers text horizontally within the element.
 * - `"justify"` – Stretches lines so each line has equal width.
 * - `"initial"` – Resets the text alignment to the default value.
 *
 * @public
 */
export type TextAlign = 'left' | 'right' | 'center' | 'justify' | 'initial'

/**
 * Style props for controlling the horizontal alignment of text content.
 *
 * @public
 */
export interface TextAlignStyleProps {
  /**
   * Controls the horizontal alignment of text content within the element.
   *
   * @remarks
   * Maps to the CSS `text-align` property.
   */
  textAlign?: TextAlign
}
