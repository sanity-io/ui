import type {Props} from '@sanity/ui/core'
import type {BoxStyleProps} from '@sanity/ui/css'
import {Box, type BoxElementType} from '@sanity/ui/primitives/box'

/**
 * The default HTML element type rendered by the {@link Inline} component.
 *
 * @public
 */
export const DEFAULT_INLINE_ELEMENT = 'div'

/**
 * Own props for the {@link Inline} component.
 *
 * @remarks
 * Extends {@link BoxStyleProps} with flex-specific and grid-specific layout props omitted,
 * since the `Inline` component manages its own flex container behavior internally.
 *
 * @public
 */
export type InlineOwnProps = Omit<
  BoxStyleProps,
  | 'alignItems'
  | 'flexDirection'
  | 'flexWrap'
  | 'justifyContent'
  | 'gridAutoColumns'
  | 'gridAutoFlow'
  | 'gridAutoRows'
  | 'gridColumnEnd'
  | 'gridColumnStart'
  | 'gridColumn'
  | 'gridRowEnd'
  | 'gridRowStart'
  | 'gridRow'
  | 'gridTemplateColumns'
  | 'gridTemplateRows'
  // eslint-disable-next-line no-warning-comments
  // todo: omit deprecated flex and grid props
>

/**
 * Accepted values for the `as` prop of the {@link Inline} component.
 *
 * @remarks
 * Inherits all element types from {@link BoxElementType}. The rendered element
 * receives all applicable HTML attributes for the chosen element type.
 *
 * @public
 */
export type InlineElementType = BoxElementType

/**
 * Props for the {@link Inline} component.
 *
 * @remarks
 * Combines {@link InlineOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<div>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link InlineElementType}.
 *
 * @public
 */
export type InlineProps<E extends InlineElementType = InlineElementType> = Props<InlineOwnProps, E>

/**
 * The `Inline` component is a layout utility for arranging and spacing items
 * horizontally in a wrapping flow.
 *
 * @remarks
 * `Inline` renders a {@link Box} configured as a flex container with `flex-wrap: wrap`
 * and `align-items: center`. Use the `gap` prop to control the spacing between items.
 *
 * @public
 */
export function Inline<E extends InlineElementType = typeof DEFAULT_INLINE_ELEMENT>(
  props: InlineProps<E>,
): React.JSX.Element {
  const {
    as = DEFAULT_INLINE_ELEMENT,
    children,
    gap,
    ...rest
  } = props as InlineProps<typeof DEFAULT_INLINE_ELEMENT>

  return (
    <Box
      data-ui="Inline"
      {...rest}
      alignItems="center"
      as={as}
      display="flex"
      flexWrap="wrap"
      gap={gap}
    >
      {children}
    </Box>
  )
}
