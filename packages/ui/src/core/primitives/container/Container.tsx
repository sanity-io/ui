import {container, type ContainerStyleProps} from '@sanity/ui/css'

import type {Props} from '../../types'
import {Box, type BoxElementType, type BoxOwnProps} from '../box/Box'

/**
 * The default HTML element type rendered by the {@link Container} component.
 *
 * @public
 */
export const DEFAULT_CONTAINER_ELEMENT = 'div'

/**
 * Own props for the {@link Container} component.
 *
 * @remarks
 * Extends {@link BoxOwnProps} (with `width` omitted, since the container manages
 * its own width via the theme's container width scale) and {@link ContainerStyleProps}
 * to provide a complete set of layout and sizing capabilities.
 *
 * Inherited from {@link BoxOwnProps}:
 * - All layout props: `display`, `flex`, `flexDirection`, `alignItems`, `justifyContent`, etc.
 * - All spacing props: `margin`, `padding`, and per-side variants.
 * - All sizing props: `height`, `minWidth`, `minHeight`, `maxWidth` (but not `width`).
 * - All position props: `position`, `inset`, and per-side inset variants.
 * - All visual props: `border`, `radius`, `shadow`, `overflow`, `muted`, `outline`.
 *
 * Inherited from {@link ContainerStyleProps}:
 * - `width` – Sets the maximum width of the container using the theme's container width scale.
 *
 * @public
 */
export type ContainerOwnProps = Omit<BoxOwnProps, 'width'> & ContainerStyleProps

/**
 * Accepted values for the `as` prop of the {@link Container} component.
 *
 * @remarks
 * Inherits all element types from {@link BoxElementType}. The rendered element
 * receives all applicable HTML attributes for the chosen element type.
 *
 * @public
 */
export type ContainerElementType = BoxElementType

/**
 * Props for the {@link Container} component.
 *
 * @remarks
 * Combines {@link ContainerOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<div>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link ContainerElementType}.
 *
 * @public
 */
export type ContainerProps<E extends ContainerElementType = ContainerElementType> = Props<
  ContainerOwnProps,
  E
>

/**
 * The `Container` component wraps content in a centered, width-constrained layout
 * using the theme's container width scale.
 *
 * @remarks
 * `Container` renders a {@link Box} element with a maximum width determined by the
 * `width` prop, which maps to the theme's predefined container width scale. It is
 * used to constrain content to a readable line length or a standard page width.
 *
 * The container centers itself horizontally within its parent and supports all
 * the same layout and spacing props as {@link Box}.
 *
 * ### Props
 *
 * | Prop | Type | Default | Required | Description |
 * |------|------|---------|----------|-------------|
 * | `as` | `ContainerElementType` | `"div"` | No | The HTML element or component type to render. |
 * | `width` | `ResponsiveProp<ContainerWidth>` | `2` | No | Sets the maximum width using the theme's container width scale (`0 \| 1 \| 2 \| 3 \| 4 \| 5 \| "auto"`). |
 *
 * All other props from {@link BoxOwnProps} (except `width`) are also accepted.
 *
 * @public
 */
export function Container<E extends ContainerElementType = typeof DEFAULT_CONTAINER_ELEMENT>(
  props: ContainerProps<E>,
): React.JSX.Element {
  const {
    as = DEFAULT_CONTAINER_ELEMENT,
    className,
    width = 2,
    ...rest
  } = props as ContainerProps<typeof DEFAULT_CONTAINER_ELEMENT>

  return <Box data-ui="Container" {...rest} as={as} className={container({className, width})} />
}
