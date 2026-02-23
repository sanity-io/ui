import {stack} from '@sanity/ui/css'

import type {Props} from '../../types'
import {Box, type BoxElementType, type BoxOwnProps} from '../box/Box'

/**
 * The default HTML element type rendered by the {@link Stack} component.
 *
 * @public
 */
export const DEFAULT_STACK_ELEMENT = 'div'

/**
 * Own props for the {@link Stack} component.
 *
 * @remarks
 * Extends {@link BoxOwnProps} with several layout-related props omitted because they
 * are internally managed by the `Stack` component (which renders as a CSS grid with
 * `grid-auto-rows: min`).
 *
 * Omitted props (managed internally):
 * - `align` / `alignItems`
 * - `columns` / `gridTemplateColumns`
 * - `direction` / `flexDirection`
 * - `display`
 * - `flexWrap`
 * - `gapX` / `gapY`
 * - `justify` / `justifyContent`
 * - `rows` / `gridTemplateRows`
 *
 * Available inherited props from {@link BoxOwnProps} include:
 * - **Spacing:** `margin`, `marginX`, `marginY`, `padding`, `paddingX`, `paddingY` (and per-side variants).
 * - **Sizing:** `width`, `height`, `minWidth`, `minHeight`, `maxWidth`.
 * - **Visual:** `border`, `radius`, `shadow`, `overflow`, `muted`, `outline`.
 * - **Position:** `position`, `inset`, and per-side inset variants.
 * - **Gap:** `gap` – Controls the vertical spacing between stacked items.
 * - **Other:** `flex`, `textAlign`, `pointerEvents`, `sizing`.
 *
 * @public
 */
export type StackOwnProps = Omit<
  BoxOwnProps,
  | 'align'
  | 'alignItems'
  | 'columns'
  | 'gridTemplateColumns'
  | 'direction'
  | 'display'
  | 'flexDirection'
  | 'flexWrap'
  | 'gapX'
  | 'gapY'
  | 'justify'
  | 'justifyContent'
  | 'rows'
  | 'gridTemplateRows'
>

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
 * The `Stack` component is used to vertically stack elements on top of each other
 * with consistent spacing between them.
 *
 * @remarks
 * `Stack` renders as a CSS grid container with `grid-auto-rows: min` and
 * `display: grid`, arranging its children in a single vertical column. The
 * `gap` prop controls the spacing between stacked items using the theme's
 * spacing scale.
 *
 * It is built on top of the {@link Box} component and inherits all of its
 * spacing, sizing, position, and visual style props (with certain layout props
 * like `display`, `flexDirection`, `gridTemplateColumns`, etc. omitted because
 * they are managed internally).
 *
 * ### Props
 *
 * | Prop | Type | Default | Required | Description |
 * |------|------|---------|----------|-------------|
 * | `as` | `StackElementType` | `"div"` | No | The HTML element or component type to render. |
 * | `gap` | `ResponsiveProp<Space>` | `undefined` | No | Sets the vertical spacing between stacked items. Accepted values: `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 \| 9`. |
 *
 * @public
 */
export function Stack<E extends StackElementType = typeof DEFAULT_STACK_ELEMENT>(
  props: StackProps<E>,
): React.JSX.Element {
  const {
    as = DEFAULT_STACK_ELEMENT,
    className,
    gap,
    ...rest
  } = props as StackProps<typeof DEFAULT_STACK_ELEMENT>

  return (
    <Box
      data-ui="Stack"
      {...rest}
      as={as}
      gridAutoRows="min"
      className={stack({className})}
      display="grid"
      gap={gap}
    />
  )
}
