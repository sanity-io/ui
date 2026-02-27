import {_splitKeys, type Props} from '@sanity/ui/core'
import {grid, GRID_STYLE_PROP_KEYS, type GridStyleProps} from '@sanity/ui/css'
import {type BoxElementType} from '@sanity/ui/primitives/box'

/**
 * The default HTML element type rendered by the {@link Grid} component.
 *
 * @public
 */
export const DEFAULT_GRID_ELEMENT = 'div'

/**
 * Style props for the {@link Grid} component.
 *
 * @remarks
 * Inherits all properties from {@link GridStyleProps}, which provides a comprehensive set of
 * CSS grid utility style props for template columns, template rows, auto flow, gap, and spacing.
 *
 * @public
 */
export type GridOwnProps = GridStyleProps

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
 * The `Grid` component is a layout primitive for building two-dimensional layouts
 * using CSS grid.
 *
 * @remarks
 * `Grid` renders a single HTML element (default `<div>`) with `display: grid` applied.
 * It provides props for configuring grid template columns, rows, auto flow, and gap,
 * and is commonly used for arranging content into rows and columns.
 *
 * @public
 */
export function Grid<E extends GridElementType = typeof DEFAULT_GRID_ELEMENT>(
  props: GridProps<E>,
): React.JSX.Element {
  const [
    // split style props
    styleProps,
    {
      as: Element = DEFAULT_GRID_ELEMENT,
      children,
      // split DOM props
      ...domProps
    },
  ] = _splitKeys(props as GridProps<typeof DEFAULT_GRID_ELEMENT>, GRID_STYLE_PROP_KEYS)

  return (
    <Element data-ui="Grid" {...domProps} className={grid(styleProps)}>
      {children}
    </Element>
  )
}
