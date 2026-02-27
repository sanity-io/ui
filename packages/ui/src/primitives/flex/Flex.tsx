import {_splitKeys, type Props} from '@sanity/ui/core'
import {flex, FLEX_STYLE_PROP_KEYS, type FlexStyleProps} from '@sanity/ui/css'
import {type BoxElementType} from '@sanity/ui/primitives/box'

/**
 * The default HTML element type rendered by the {@link Flex} component.
 *
 * @public
 */
export const DEFAULT_FLEX_ELEMENT = 'div'

/**
 * Style props for the {@link Flex} component.
 *
 * @remarks
 * Inherits all properties from {@link FlexStyleProps}, which provides style props
 * for controlling flex container behavior including direction, alignment, justification,
 * wrapping, gap, and spacing.
 *
 * @public
 */
export type FlexOwnProps = FlexStyleProps

/**
 * Accepted values for the `as` prop of the {@link Flex} component.
 *
 * @remarks
 * Inherits all element types from {@link BoxElementType}. The rendered element
 * receives all applicable HTML attributes for the chosen element type.
 *
 * @public
 */
export type FlexElementType = BoxElementType

/**
 * Props for the {@link Flex} component.
 *
 * @remarks
 * Combines {@link FlexOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<div>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link FlexElementType}.
 *
 * @public
 */
export type FlexProps<E extends FlexElementType = FlexElementType> = Props<FlexOwnProps, E>

/**
 * A flex container component that provides shorthand props for controlling
 * the direction, alignment, justification, and wrapping of its children.
 *
 * @remarks
 * The `Flex` component renders a single HTML element (default `<div>`) with
 * `display: flex` applied. It serves as the primary building block for
 * one-dimensional layouts (horizontal or vertical) and can be composed with
 * other layout primitives such as {@link Box}, {@link Card}, {@link Stack},
 * and {@link Grid}.
 *
 * @public
 */
export function Flex<E extends FlexElementType = typeof DEFAULT_FLEX_ELEMENT>(
  props: FlexProps<E>,
): React.JSX.Element {
  const [
    // split style props
    styleProps,
    {
      as: Element = DEFAULT_FLEX_ELEMENT,
      children,
      // split DOM props
      ...domProps
    },
  ] = _splitKeys(props as FlexProps<typeof DEFAULT_FLEX_ELEMENT>, FLEX_STYLE_PROP_KEYS)

  return (
    <Element data-ui="Flex" {...domProps} className={flex(styleProps)}>
      {children}
    </Element>
  )
}
