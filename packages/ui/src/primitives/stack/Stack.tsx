import {_splitKeys, type Props} from '@sanity/ui/core'
import {stack, STACK_STYLE_PROP_KEYS, type StackStyleProps} from '@sanity/ui/css'
import {type BoxElementType} from '@sanity/ui/primitives/box'

/**
 * The default HTML element type rendered by the {@link Stack} component.
 *
 * @public
 */
export const DEFAULT_STACK_ELEMENT = 'div'

/**
 * Style props for the {@link Stack} component.
 *
 * @remarks
 * Inherits all properties from {@link StackStyleProps}, which provides
 * layout and spacing utilities for vertical stacking.
 *
 * @public
 */
export type StackOwnProps = StackStyleProps

/**
 * Accepted values for the `as` prop of the {@link Stack} component.
 *
 * @remarks
 * Inherits all element types from {@link BoxElementType}. The rendered element
 * receives all applicable HTML attributes for the chosen element type.
 *
 * @public
 */
export type StackElementType = BoxElementType

/**
 * Props for the {@link Stack} component.
 *
 * @remarks
 * Combines {@link StackOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<div>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link StackElementType}.
 *
 * @public
 */
export type StackProps<E extends StackElementType = StackElementType> = Props<StackOwnProps, E>

/**
 * The `Stack` component is a layout primitive for arranging elements vertically
 * with consistent spacing between them.
 *
 * @remarks
 * `Stack` renders its children in a vertical flow with a configurable `gap`
 * between each child. It is commonly used for building forms, content sections,
 * and any vertical arrangement of elements.
 *
 * @public
 */
export function Stack<E extends StackElementType = typeof DEFAULT_STACK_ELEMENT>(
  props: StackProps<E>,
): React.JSX.Element {
  const [
    // split style props
    styleProps,
    {
      as: Element = DEFAULT_STACK_ELEMENT,
      children,
      // split DOM props
      ...domProps
    },
  ] = _splitKeys(props as StackProps<typeof DEFAULT_STACK_ELEMENT>, STACK_STYLE_PROP_KEYS)

  return (
    <Element data-ui="Stack" {...domProps} className={stack(styleProps)}>
      {children}
    </Element>
  )
}
