import type {ResponsiveProp} from '../../types'

/**
 * Accepted values for border style props.
 *
 * @remarks
 * Controls the visual style of borders applied to an element.
 *
 * - `"solid"` – Renders a solid border line.
 * - `"muted"` – Renders a border with reduced visual emphasis.
 * - `"none"` – Removes the border.
 *
 * @public
 */
export type BorderStyle = 'solid' | 'muted' | 'none'

/**
 * Style props for controlling borders on each side of an element.
 *
 * @public
 */
export interface BorderStyleProps {
  /**
   * Sets the border on all sides of the element.
   *
   * @remarks
   * When set to `true`, applies a solid border. When set to `false`, removes the border.
   * A {@link BorderStyle} string value can also be provided for finer control. Supports responsive values.
   */
  border?: ResponsiveProp<BorderStyle | boolean>

  /**
   * Sets the border on the top side of the element.
   *
   * @remarks
   * When set to `true`, applies a solid border on the top. When set to `false`, removes it.
   * A {@link BorderStyle} string value can also be provided for finer control. Supports responsive values.
   *
   * Overrides the top portion of the `border` prop when both are specified.
   */
  borderTop?: ResponsiveProp<BorderStyle | boolean>

  /**
   * Sets the border on the right side of the element.
   *
   * @remarks
   * When set to `true`, applies a solid border on the right. When set to `false`, removes it.
   * A {@link BorderStyle} string value can also be provided for finer control. Supports responsive values.
   *
   * Overrides the right portion of the `border` prop when both are specified.
   */
  borderRight?: ResponsiveProp<BorderStyle | boolean>

  /**
   * Sets the border on the bottom side of the element.
   *
   * @remarks
   * When set to `true`, applies a solid border on the bottom. When set to `false`, removes it.
   * A {@link BorderStyle} string value can also be provided for finer control. Supports responsive values.
   *
   * Overrides the bottom portion of the `border` prop when both are specified.
   */
  borderBottom?: ResponsiveProp<BorderStyle | boolean>

  /**
   * Sets the border on the left side of the element.
   *
   * @remarks
   * When set to `true`, applies a solid border on the left. When set to `false`, removes it.
   * A {@link BorderStyle} string value can also be provided for finer control. Supports responsive values.
   *
   * Overrides the left portion of the `border` prop when both are specified.
   */
  borderLeft?: ResponsiveProp<BorderStyle | boolean>
}
