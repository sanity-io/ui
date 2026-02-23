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
 * Inherited from {@link BoxOwnProps}:
 * - All spacing props: `margin`, `padding`, and per-side variants.
 * - All sizing props: `width`, `height`, `minWidth`, `minHeight`, `maxWidth`.
 * - All position props: `position`, `inset`, and per-side inset variants.
 * - All visual props: `border`, `radius`, `shadow`, `overflow`, `muted`, `outline`.
 * - Flex child props: `flex`.
 * - Gap props: `gap`, `gapX`, `gapY`.
 * - Grid props: `gridTemplateColumns`, `gridTemplateRows`, etc.
 * - Other: `textAlign`, `pointerEvents`, `sizing`.
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
   *
   * Accepted values:
   * - `"baseline"` – Aligns items along their content baseline.
   * - `"center"` – Centers items along the cross axis.
   * - `"flex-end"` – Aligns items to the end of the cross axis.
   * - `"flex-start"` – Aligns items to the start of the cross axis.
   * - `"stretch"` – Stretches items to fill the container along the cross axis.
   *
   * @type {ResponsiveProp\<AlignItems\>}
   * @defaultValue undefined
   * @optional
   */
  align?: ResponsiveProp<AlignItems>

  /**
   * Sets the direction in which flex items are placed within the container.
   *
   * @remarks
   * Mapped internally to the `flexDirection` prop of the underlying {@link Box}.
   * Supports responsive values.
   *
   * Accepted values:
   * - `"row"` – Items are placed along the horizontal axis (left to right in LTR).
   * - `"row-reverse"` – Items are placed along the horizontal axis in reverse order.
   * - `"column"` – Items are placed along the vertical axis (top to bottom).
   * - `"column-reverse"` – Items are placed along the vertical axis in reverse order.
   *
   * @type {ResponsiveProp\<FlexDirection\>}
   * @defaultValue `"row"`
   * @optional
   */
  direction?: ResponsiveProp<FlexDirection>

  /**
   * Controls the distribution of space between and around items along the main axis.
   *
   * @remarks
   * Mapped internally to the `justifyContent` prop of the underlying {@link Box}.
   * Supports responsive values.
   *
   * Accepted values:
   * - `"flex-start"` – Items are packed toward the start of the main axis.
   * - `"flex-end"` – Items are packed toward the end of the main axis.
   * - `"center"` – Items are centered along the main axis.
   * - `"space-between"` – Items are evenly distributed; first item at the start, last at the end.
   * - `"space-around"` – Items are evenly distributed with equal space around each item.
   * - `"space-evenly"` – Items are evenly distributed with equal space between each item and the container edges.
   *
   * @type {ResponsiveProp\<JustifyContent\>}
   * @defaultValue undefined
   * @optional
   */
  justify?: ResponsiveProp<JustifyContent>

  /**
   * Controls whether flex items wrap onto multiple lines or are forced onto a single line.
   *
   * @remarks
   * Mapped internally to the `flexWrap` prop of the underlying {@link Box}.
   * Supports responsive values.
   *
   * Accepted values:
   * - `"wrap"` – Allows items to wrap onto multiple lines from top to bottom.
   * - `"wrap-reverse"` – Allows items to wrap onto multiple lines from bottom to top.
   * - `"nowrap"` – Forces all items onto a single line.
   *
   * @type {ResponsiveProp\<FlexWrap\>}
   * @defaultValue undefined
   * @optional
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
 * ### Props
 *
 * | Prop | Type | Default | Required | Description |
 * |------|------|---------|----------|-------------|
 * | `as` | `BoxElementType` | `"div"` | No | The HTML element or component type to render. |
 * | `align` | `ResponsiveProp<AlignItems>` | — | No | Aligns items along the cross axis. |
 * | `direction` | `ResponsiveProp<FlexDirection>` | `"row"` | No | Sets the direction of the flex layout. |
 * | `justify` | `ResponsiveProp<JustifyContent>` | — | No | Distributes items along the main axis. |
 * | `wrap` | `ResponsiveProp<FlexWrap>` | — | No | Controls whether items wrap onto multiple lines. |
 * | `gap` | `ResponsiveProp<Space>` | — | No | Sets the gap between flex children (inherited from Box). |
 * | `flex` | `ResponsiveProp<Flex>` | — | No | Controls flex grow/shrink behavior (inherited from Box). |
 * | `padding` | `ResponsiveProp<Padding>` | — | No | Sets inner padding (inherited from Box). |
 * | `margin` | `ResponsiveProp<Margin>` | — | No | Sets outer margin (inherited from Box). |
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
