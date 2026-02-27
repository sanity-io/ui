import {_splitKeys, type Props} from '@sanity/ui/core'
import {
  type BoxStyleProps,
  container,
  CONTAINER_STYLE_PROP_KEYS,
  type ContainerStyleProps,
} from '@sanity/ui/css'
import {type BoxElementType} from '@sanity/ui/primitives/box'

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
 * Combines {@link BoxStyleProps} (with `width` omitted) and {@link ContainerStyleProps}
 * to provide layout utilities alongside container-specific width constraints.
 *
 * @public
 */
export type ContainerOwnProps = Omit<BoxStyleProps, 'width'> & ContainerStyleProps

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
 * The `Container` component constrains the width of its content to a predefined
 * set of max-width values from the theme, centering it horizontally.
 *
 * @remarks
 * Use `Container` to limit the width of page-level or section-level content
 * for readability. The `width` prop selects from the theme's container width
 * scale.
 *
 * @public
 */
export function Container<E extends ContainerElementType = typeof DEFAULT_CONTAINER_ELEMENT>(
  props: ContainerProps<E>,
): React.JSX.Element {
  const [styleProps, domProps] = _splitKeys(
    props as ContainerProps<typeof DEFAULT_CONTAINER_ELEMENT>,
    CONTAINER_STYLE_PROP_KEYS,
  )

  return <div data-ui="Container" {...domProps} className={container(styleProps)} />
}
