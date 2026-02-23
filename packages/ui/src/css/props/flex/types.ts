import type {ResponsiveProp} from '../../types'

/**
 * Accepted values for the `flex` style prop.
 *
 * @remarks
 * Maps to the CSS `flex` shorthand property. Numeric values `1`–`12` set the flex grow
 * factor while leaving flex-shrink at `1` and flex-basis at `0%`.
 *
 * - `"none"` – Equivalent to `flex: none` (`0 0 auto`). The element will not grow or shrink.
 * - `"auto"` – Equivalent to `flex: auto` (`1 1 auto`). The element sizes based on its content but can grow and shrink.
 * - `"initial"` – Equivalent to `flex: initial` (`0 1 auto`). The element sizes based on its content, can shrink, but will not grow.
 * - `1`–`12` – Sets the flex grow factor to the given number.
 *
 * @public
 */
export type Flex = 'none' | 'auto' | 'initial' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/**
 * Style props for controlling how an element grows and shrinks within a flex container.
 *
 * @public
 */
export interface FlexStyleProps {
  /**
   * Controls how the element grows and shrinks within a flex container.
   *
   * @remarks
   * Maps to the CSS `flex` shorthand property. Supports responsive values.
   *
   * Accepted values:
   * - `"none"` – The element will not grow or shrink (`0 0 auto`).
   * - `"auto"` – The element sizes based on its content but can grow and shrink (`1 1 auto`).
   * - `"initial"` – The element sizes based on its content, can shrink, but will not grow (`0 1 auto`).
   * - `1`–`12` – Sets the flex grow factor to the given number.
   *
   * @type {ResponsiveProp\<Flex\>}
   * @defaultValue undefined
   * @optional
   */
  flex?: ResponsiveProp<Flex>
}
