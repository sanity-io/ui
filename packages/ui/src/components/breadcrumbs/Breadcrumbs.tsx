import type {ComponentType, Props} from '@sanity/ui/core'
import {type GapStyleProps} from '@sanity/ui/css'
import {useClickOutsideEvent} from '@sanity/ui/hooks'
import {Box} from '@sanity/ui/primitives/box'
import {Button, type ButtonProps} from '@sanity/ui/primitives/button'
import {Flex} from '@sanity/ui/primitives/flex'
import {Popover, type PopoverProps} from '@sanity/ui/primitives/popover'
import {Stack} from '@sanity/ui/primitives/stack'
import {Text} from '@sanity/ui/primitives/text'
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
 * Extends {@link GapStyleProps} to provide spacing between breadcrumb items.
 *
 * @beta
 */
export type BreadcrumbsOwnProps = GapStyleProps & {
  /**
   * Props to pass to the expand button that appears when the breadcrumb
   * trail is truncated beyond `maxLength`.
   *
   * @remarks
   * Accepts all {@link ButtonProps} except `as`, `onClick`, and `selected`,
   * which are managed internally.
   */
  expandButton?: Omit<ButtonProps, 'as' | 'onClick' | 'selected'>

  /**
   * The maximum number of breadcrumb items to display before truncating.
   *
   * @remarks
   * When the number of items exceeds this value, middle items are collapsed
   * behind an expand button that reveals them in a {@link Popover}.
   */
  maxLength?: number

  /**
   * Props to pass to the {@link Popover} that displays the collapsed
   * breadcrumb items.
   */
  popover?: PopoverProps

  /**
   * Custom separator content to render between breadcrumb items.
   *
   * @remarks
   * Defaults to a muted `/` character when not provided.
   */
  separator?: ReactNode
}

/**
 * Accepted values for the `as` prop of the {@link Breadcrumbs} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `Breadcrumbs`.
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
 * The `Breadcrumbs` component renders a navigational breadcrumb trail with
 * automatic truncation and an expand popover for overflow items.
 *
 * @remarks
 * When the number of items exceeds `maxLength`, middle items are collapsed
 * behind an ellipsis button. Clicking the button reveals the hidden items
 * in a {@link Popover}. Items are separated by a configurable `separator`
 * (defaults to `/`).
 *
 * @beta
 */
export function Breadcrumbs<E extends BreadcrumbsElementType = typeof DEFAULT_BREADCRUMBS_ELEMENT>(
  props: BreadcrumbsProps<E>,
): React.JSX.Element {
  const {
    as = DEFAULT_BREADCRUMBS_ELEMENT,
    children,
    expandButton: expandButtonProps,
    gap = 2,
    gapX = gap,
    gapY = gap,
    maxLength,
    popover: popoverProps,
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
    popoverProps,
    rawItems,
    gapY,
    expandButtonProps,
  })

  return (
    <Flex as={as} data-ui="Breadcrumbs" {...rest} gap={gap} gapX={gapX} gapY={gapY} wrap="wrap">
      {items.map((item, itemIndex) => (
        <Fragment key={itemIndex}>
          {itemIndex > 0 && (
            <Box aria-hidden as="li" flex="none">
              {separator || <Text muted>/</Text>}
            </Box>
          )}
          <Box as="li" flex="none">
            {item}
          </Box>
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
  popoverProps,
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
  popoverProps?: PopoverProps
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
        key="button"
        constrainSize
        open={open}
        padding={2}
        placement="top"
        portal
        {...popoverProps}
        ref={popoverElementRef}
        content={
          <Stack as="ol" gap={gapY} overflow="auto">
            {rawItems.slice(beforeLength - 1, len - afterLength)}
          </Stack>
        }
      >
        <Button
          mode="bleed"
          padding={0}
          text="…"
          {...expandButtonProps}
          ref={expandElementRef}
          selected={open}
          onClick={open ? collapse : expand}
        />
      </Popover>,
      ...rawItems.slice(len - afterLength),
    ]
  }

  return rawItems
}
