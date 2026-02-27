import type {Props} from '../../types'
import {Box, type BoxElementType, type BoxOwnProps} from '../box/Box'

/**
 * The default HTML element type rendered by the {@link Grid} component.
 *
 * @public
 */
export const DEFAULT_GRID_ELEMENT = 'div'

/**
 * Own props for the {@link Grid} component.
 *
 * @remarks
 * Extends {@link BoxOwnProps} with `display` omitted (since it is always set to `"grid"`).
 *
 * All grid-specific layout props inherited from {@link BoxOwnProps} are available:
 * - `gap`, `gapX`, `gapY` – Controls the gutter between grid items.
 * - `gridTemplateColumns` – Defines the number of equal-width columns (`1`–`12`).
 * - `gridTemplateRows` – Defines the number of equal-height rows (`1`–`12`).
 * - `gridAutoColumns` – Sets the size of implicitly created columns (`"auto"` | `"min"` | `"max"` | `"fr"`).
 * - `gridAutoRows` – Sets the size of implicitly created rows (`"auto"` | `"min"` | `"max"` | `"fr"`).
 * - `gridAutoFlow` – Controls auto-placement flow (`"row"` | `"column"` | `"row dense"` | `"column dense"`).
 * - `gridColumn` – Controls a child item's column span or placement.
 * - `gridColumnStart`, `gridColumnEnd` – Controls a child item's column start/end lines.
 * - `gridRow` – Controls a child item's row span or placement.
 * - `gridRowStart`, `gridRowEnd` – Controls a child item's row start/end lines.
 *
 * Additionally, all spacing, sizing, position, border, radius, shadow, overflow,
 * and other visual props from {@link BoxOwnProps} are available.
 *
 * All style props support responsive values via the `ResponsiveProp` type.
 *
 * @public
 */
export type GridOwnProps = Omit<BoxOwnProps, 'display'>

/**
 * Accepted values for the `as` prop of the {@link Grid} component.
 *
 * @remarks
 * Inherits all element types from {@link BoxElementType}. The rendered element
 * receives all applicable HTML attributes for the chosen element type.
 *
 * @public
 */
export type GridElementType = BoxElementType

/**
 * Props for the {@link Grid} component.
 *
 * @remarks
 * Combines {@link GridOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<div>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link GridElementType}.
 *
 * @public
 */
export type GridProps<E extends GridElementType = GridElementType> = Props<GridOwnProps, E>

/**
 * A layout primitive for building 2-dimensional layouts based on CSS Grid.
 *
 * @remarks
 * The `Grid` component renders a single HTML element (default `<div>`) with
 * `display: grid` applied. It provides access to all CSS Grid layout properties
 * through the design system's style prop interface.
 *
 * Use `gridTemplateColumns` and `gridTemplateRows` to define the explicit grid
 * structure, and `gap` / `gapX` / `gapY` to control gutters between items.
 * Child items can be placed using `gridColumn`, `gridRow`, and their
 * start/end variants.
 *
 * @public
 */
export function Grid<E extends GridElementType = typeof DEFAULT_GRID_ELEMENT>(
  props: GridProps<E>,
): React.JSX.Element {
  const {
    as = DEFAULT_GRID_ELEMENT,
    children,
    ...rest
  } = props as GridProps<typeof DEFAULT_GRID_ELEMENT>

  return (
    <Box data-ui="Grid" {...rest} as={as} display="grid">
      {children}
    </Box>
  )
}
