import type {ResponsiveProp} from '../../types'

/**
 * Accepted values for the `display` style prop.
 *
 * @remarks
 * Maps to the CSS `display` property.
 *
 * - `"block"` – Generates a block-level element box.
 * - `"inline-block"` – Generates an inline-level block container.
 * - `"flex"` – Generates a block-level flex container.
 * - `"inline-flex"` – Generates an inline-level flex container.
 * - `"grid"` – Generates a block-level grid container.
 * - `"inline-grid"` – Generates an inline-level grid container.
 * - `"none"` – Removes the element from the document flow; the element is not rendered.
 *
 * @public
 */
export type Display =
  | 'block'
  | 'inline-block'
  | 'flex'
  | 'inline-flex'
  | 'grid'
  | 'inline-grid'
  | 'none'

/**
 * Style props for controlling the display behavior of an element.
 *
 * @public
 */
export interface DisplayStyleProps {
  /**
   * Controls the display behavior (layout model) of the element.
   *
   * @remarks
   * Maps to the CSS `display` property. Supports responsive values.
   *
   * Accepted values:
   * - `"block"` – Generates a block-level element box.
   * - `"inline-block"` – Generates an inline-level block container.
   * - `"flex"` – Generates a block-level flex container.
   * - `"inline-flex"` – Generates an inline-level flex container.
   * - `"grid"` – Generates a block-level grid container.
   * - `"inline-grid"` – Generates an inline-level grid container.
   * - `"none"` – Removes the element from the document flow; the element is not rendered.
   *
   * @type {ResponsiveProp\<Display\>}
   * @defaultValue undefined
   * @optional
   */
  display?: ResponsiveProp<Display>
}
