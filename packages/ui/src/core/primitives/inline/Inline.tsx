import type {Props} from '../../types'
import {Box, type BoxElementType, type BoxOwnProps} from '../box/Box'

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
 * Extends {@link BoxOwnProps} with the following props omitted because they are
 * managed internally by the component:
 * - `alignItems` – Fixed to `"center"`.
 * - `flexDirection` – Fixed to `"row"` (implicit via `display: flex`).
 * - `flexWrap` – Fixed to `"wrap"`.
 * - `justifyContent` – Not applicable; items flow naturally.
 * - All grid-related props (`gridAutoColumns`, `gridAutoFlow`, `gridAutoRows`,
 *   `gridColumn`, `gridColumnStart`, `gridColumnEnd`, `gridRow`, `gridRowStart`,
 *   `gridRowEnd`, `gridTemplateColumns`, `gridTemplateRows`) – Not applicable to
 *   the flex-based inline layout.
 *
 * Available inherited props from {@link BoxOwnProps} include:
 * - **Spacing:** `gap`, `gapX`, `gapY`, `margin`, `marginX`, `marginY`, `padding`, `paddingX`, `paddingY` (and per-side variants).
 * - **Sizing:** `width`, `height`, `minWidth`, `minHeight`, `maxWidth`.
 * - **Visual:** `border`, `radius`, `shadow`, `overflow`, `muted`, `outline`.
 * - **Position:** `position`, `inset`, and per-side inset variants.
 * - **Flex item:** `flex`.
 * - **Other:** `display`, `textAlign`, `pointerEvents`, `sizing`.
 *
 * @public
 */
export type InlineOwnProps = Omit<
  BoxOwnProps,
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
 * A layout utility component for aligning and spacing items horizontally in a
 * wrapping flex row.
 *
 * @remarks
 * The `Inline` component renders a flex container with `flex-wrap: wrap` and
 * `align-items: center`, making it suitable for laying out inline elements such
 * as tags, badges, or buttons that should flow naturally across multiple lines
 * when they exceed the container width.
 *
 * The `gap` prop controls the spacing between items in both the horizontal and
 * vertical directions.
 *
 * ### Default prop values
 *
 * | Prop | Type | Default | Required | Description |
 * |------|------|---------|----------|-------------|
 * | `as` | `InlineElementType` | `"div"` | No | The HTML element or component type to render. |
 * | `gap` | `ResponsiveProp<Space>` | `undefined` | No | Sets the gap between items in both directions. Accepted values: `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 \| 9`. |
 *
 * ### Internally managed props
 *
 * The following props are set internally and cannot be overridden:
 * - `alignItems` = `"center"`
 * - `display` = `"flex"`
 * - `flexWrap` = `"wrap"`
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
      gap={gap}
      flexWrap="wrap"
    >
      {children}
    </Box>
  )
}
