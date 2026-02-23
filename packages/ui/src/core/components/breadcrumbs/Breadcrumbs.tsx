import {breadcrumbs, type GapStyleProps} from '@sanity/ui/css'
import {
  Children,
  Fragment,
  isValidElement,
  type ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'

import {useClickOutsideEvent} from '../../hooks/useClickOutsideEvent'
import {Box} from '../../primitives/box/Box'
import {Button, type ButtonProps} from '../../primitives/button/Button'
import {Flex} from '../../primitives/flex/Flex'
import {Popover} from '../../primitives/popover/Popover'
import {Stack} from '../../primitives/stack/Stack'
import {Text} from '../../primitives/text/Text'
import type {ComponentType, Props} from '../../types'

/**
 * The default HTML element type rendered by the {@link Breadcrumbs} component.
 *
 * @beta
 */
export const DEFAULT_BREADCRUMBS_ELEMENT = 'nav'

/**
 * Own props for the {@link Breadcrumbs} component.
 *
 * @remarks
 * Extends {@link GapStyleProps} to provide gap control between breadcrumb items,
 * and adds breadcrumbs-specific properties for overflow collapsing, custom
 * separators, and expand-button configuration.
 *
 * Inherited from {@link GapStyleProps}:
 * - `gap` (`ResponsiveProp<Space>`) – Sets the gap between items in both directions. Accepted values: `0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9`. Default: `2`.
 * - `gapX` (`ResponsiveProp<Space>`) – Sets the horizontal gap. Default: inherits from `gap`.
 * - `gapY` (`ResponsiveProp<Space>`) – Sets the vertical gap. Default: inherits from `gap`.
 *
 * @beta
 */
export type BreadcrumbsOwnProps = GapStyleProps & {
  /**
   * Props forwarded to the expand button that appears when breadcrumb items
   * are collapsed due to `maxLength`.
   *
   * @remarks
   * Accepts all {@link ButtonProps} for a `<button>` element except `as`,
   * `onClick`, and `selected`, which are managed internally. Use this to
   * customize the visual appearance of the expand trigger (e.g. `mode`,
   * `tone`, `fontSize`).
   *
   * @type {Omit\<ButtonProps\<'button'\>, 'as' | 'onClick' | 'selected'\>}
   * @defaultValue undefined
   * @optional
   */
  expandButton?: Omit<ButtonProps<'button'>, 'as' | 'onClick' | 'selected'>

  /**
   * Sets the maximum number of breadcrumb items visible before the middle
   * items are collapsed into an expand button.
   *
   * @remarks
   * When the number of children exceeds `maxLength`, the component splits
   * the visible items into two groups: the first `ceil(maxLength / 2)` items
   * and the last `floor(maxLength / 2)` items. The items in between are
   * hidden and accessible via an ellipsis expand button that opens a
   * {@link Popover} containing the collapsed items.
   *
   * When `undefined` or not provided, all items are displayed without
   * collapsing.
   *
   * @type {number}
   * @defaultValue undefined
   * @optional
   */
  maxLength?: number

  /**
   * A custom separator element rendered between each breadcrumb item.
   *
   * @remarks
   * When provided, this element is rendered between every pair of adjacent
   * breadcrumb items. When `undefined`, a muted `/` character is rendered
   * as the default separator.
   *
   * @type {ReactNode}
   * @defaultValue (a muted `/` text element)
   * @optional
   */
  separator?: ReactNode
}

/**
 * Accepted values for the `as` prop of the {@link Breadcrumbs} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `Breadcrumbs`.
 *
 * Accepted values: `"div"` | `"nav"` | `ComponentType`
 *
 * @beta
 */
export type BreadcrumbsElementType = 'div' | 'nav' | ComponentType

/**
 * Props for the {@link Breadcrumbs} component.
 *
 * @remarks
 * Combines {@link BreadcrumbsOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<nav>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link BreadcrumbsElementType}.
 *
 * @beta
 */
export type BreadcrumbsProps<E extends BreadcrumbsElementType = BreadcrumbsElementType> = Props<
  BreadcrumbsOwnProps,
  E
>

/**
 * A navigation component that displays a trail of hierarchical links,
 * with automatic overflow collapsing when the trail exceeds a specified length.
 *
 * @remarks
 * The `Breadcrumbs` component renders a horizontal list of breadcrumb items
 * inside a {@link Flex} container. Items are separated by a configurable
 * separator element (default: a muted `/` character).
 *
 * When the number of children exceeds the `maxLength` threshold, the middle
 * items are collapsed behind an ellipsis expand button. Clicking the button
 * opens a {@link Popover} containing the hidden items in a scrollable
 * {@link Stack}.
 *
 * Each child element is wrapped in a `<li>` element for semantic correctness.
 * The separators are marked with `aria-hidden` to prevent them from being
 * announced by screen readers.
 *
 * ### Default prop values
 *
 * | Prop | Type | Default | Required | Description |
 * |------|------|---------|----------|-------------|
 * | `as` | `BreadcrumbsElementType` | `"nav"` | No | The HTML element or component type to render. |
 * | `gap` | `ResponsiveProp<Space>` | `2` | No | Gap between breadcrumb items (including separators). Accepted values: `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 \| 9`. |
 * | `gapX` | `ResponsiveProp<Space>` | (inherits `gap`) | No | Horizontal gap between items. |
 * | `gapY` | `ResponsiveProp<Space>` | (inherits `gap`) | No | Vertical gap between items. |
 * | `maxLength` | `number` | `undefined` | No | Maximum visible items before middle items are collapsed. |
 * | `separator` | `ReactNode` | (muted `/` text) | No | Custom separator rendered between each item. |
 * | `expandButton` | `Omit<ButtonProps, ...>` | `undefined` | No | Props forwarded to the expand trigger button. |
 *
 * @beta
 */
export function Breadcrumbs<E extends BreadcrumbsElementType = typeof DEFAULT_BREADCRUMBS_ELEMENT>(
  props: BreadcrumbsProps<E>,
): React.JSX.Element {
  const {
    as = DEFAULT_BREADCRUMBS_ELEMENT,
    children,
    className,
    expandButton: expandButtonProps,
    gap = 2,
    gapX = gap,
    gapY = gap,
    maxLength,
    separator,
    ...rest
  } = props as BreadcrumbsProps<typeof DEFAULT_BREADCRUMBS_ELEMENT>

  const [open, setOpen] = useState(false)
  const expandElementRef = useRef<HTMLButtonElement | null>(null)
  const popoverElementRef = useRef<HTMLDivElement | null>(null)

  const collapse = useCallback(() => setOpen(false), [])
  const expand = useCallback(() => setOpen(true), [])

  useClickOutsideEvent(collapse, () => [expandElementRef.current, popoverElementRef.current])

  const rawItems = useMemo(() => Children.toArray(children).filter(isValidElement), [children])

  const items = useItems({
    collapse,
    expand,
    expandElementRef,
    maxLength,
    open,
    popoverElementRef,
    rawItems,
    gapY,
    expandButtonProps,
  })

  return (
    <Flex
      as={as}
      data-ui="Breadcrumbs"
      {...rest}
      className={breadcrumbs({className})}
      gap={gap}
      gapX={gapX}
      gapY={gapY}
    >
      {items.map((item, itemIndex) => (
        <Fragment key={itemIndex}>
          {itemIndex > 0 && (
            <Box aria-hidden as="li">
              {separator || <Text muted>/</Text>}
            </Box>
          )}
          <Box as="li">{item}</Box>
        </Fragment>
      ))}
    </Flex>
  )
}

function useItems({
  collapse,
  expand,
  expandElementRef,
  maxLength,
  open,
  popoverElementRef,
  rawItems,
  gapY,
  expandButtonProps,
}: {
  collapse: () => void
  expand: () => void
  expandElementRef: React.RefObject<HTMLButtonElement | null>
  maxLength: number | undefined
  open: boolean
  popoverElementRef: React.RefObject<HTMLDivElement | null>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rawItems: React.ReactElement<unknown, string | React.JSXElementConstructor<any>>[]
  gapY: NonNullable<GapStyleProps['gapY']>
  expandButtonProps: BreadcrumbsOwnProps['expandButton']
}): React.JSX.Element[] {
  const len = rawItems.length

  if (maxLength && len > maxLength) {
    const beforeLength = Math.ceil(maxLength / 2)
    const afterLength = Math.floor(maxLength / 2)

    return [
      ...rawItems.slice(0, beforeLength - 1),
      <Popover
        constrainSize
        content={
          <Stack as="ol" gap={gapY} overflow="auto">
            {rawItems.slice(beforeLength - 1, len - afterLength)}
          </Stack>
        }
        key="button"
        open={open}
        padding={2}
        placement="top"
        portal
        ref={popoverElementRef}
      >
        <Button
          mode="bleed"
          padding={0}
          text="…"
          {...expandButtonProps}
          onClick={open ? collapse : expand}
          ref={expandElementRef}
          selected={open}
        />
      </Popover>,
      ...rawItems.slice(len - afterLength),
    ]
  }

  return rawItems
}
