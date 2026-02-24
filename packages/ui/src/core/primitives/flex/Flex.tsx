import type {
  AlignItems,
  FlexDirection,
  FlexWrap,
  JustifyContent,
  ResponsiveProp,
} from '@sanity/ui/css'

import type {Props} from '../../types'
import {Box, type BoxElementType, type BoxOwnProps} from '../box/Box'

/**
 * The default HTML element type rendered by the {@link Flex} component.
 *
 * @public
 */
export const DEFAULT_FLEX_ELEMENT = 'div'

/**
 * Own props for the {@link Flex} component.
 *
 * @remarks
 * Extends {@link BoxOwnProps} (with `align`, `display`, `flexDirection`, and `flexWrap`
 * omitted, since they are mapped from Flex-specific shorthand props) and adds
 * convenience props for controlling flex container behavior.
 *
 * @public
 */
export type FlexOwnProps = Omit<BoxOwnProps, 'align' | 'display' | 'flexDirection' | 'flexWrap'> & {
  /**
   * Controls the alignment of items along the cross axis of the flex container.
   *
   * @remarks
   * Mapped internally to the `alignItems` prop of the underlying {@link Box}.
   * Supports responsive values.
   */
  align?: ResponsiveProp<AlignItems>

  /**
   * Sets the direction in which flex items are placed within the container.
   *
   * @remarks
   * Mapped internally to the `flexDirection` prop of the underlying {@link Box}.
   * Supports responsive values.
   *
   * @defaultValue `"row"`
   */
  direction?: ResponsiveProp<FlexDirection>

  /**
   * Controls the distribution of space between and around items along the main axis.
   *
   * @remarks
   * Mapped internally to the `justifyContent` prop of the underlying {@link Box}.
   * Supports responsive values.
   */
  justify?: ResponsiveProp<JustifyContent>

  /**
   * Controls whether flex items wrap onto multiple lines or are forced onto a single line.
   *
   * @remarks
   * Mapped internally to the `flexWrap` prop of the underlying {@link Box}.
   * Supports responsive values.
   */
  wrap?: ResponsiveProp<FlexWrap>
}

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
 * The `Flex` component renders a {@link Box} with `display="flex"` and maps
 * its convenience props (`align`, `direction`, `justify`, `wrap`) to the
 * corresponding Box style props (`alignItems`, `flexDirection`, `justifyContent`,
 * `flexWrap`).
 *
 * It serves as the primary building block for one-dimensional layouts
 * (horizontal or vertical) and can be composed with other layout primitives
 * such as {@link Box}, {@link Card}, {@link Stack}, and {@link Grid}.
 *
 * @public
 */
export function Flex<E extends FlexElementType = typeof DEFAULT_FLEX_ELEMENT>(
  props: FlexProps<E>,
): React.JSX.Element {
  const {
    align,
    as = DEFAULT_FLEX_ELEMENT,
    direction = 'row',
    justify,
    wrap,
    ...rest
  } = props as FlexProps<typeof DEFAULT_FLEX_ELEMENT>

  return (
    <Box
      data-ui="Flex"
      {...rest}
      alignItems={align}
      as={as}
      display="flex"
      flexDirection={direction}
      flexWrap={wrap}
      justifyContent={justify}
    />
  )
}
