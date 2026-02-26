import type {ComponentType, Props} from '@sanity/ui/core'
import {type GapStyleProps} from '@sanity/ui/css'
import {useClickOutsideEvent} from '@sanity/ui/hooks'
import {Box} from '@sanity/ui/primitives/box'
import {Button, type ButtonProps} from '@sanity/ui/primitives/button'
import {Flex} from '@sanity/ui/primitives/flex'
import {Popover} from '@sanity/ui/primitives/popover'
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

/** @beta */
export const DEFAULT_BREADCRUMBS_ELEMENT = 'nav'

/** @beta */
export type BreadcrumbsOwnProps = GapStyleProps & {
  expandButton?: Omit<ButtonProps, 'as' | 'onClick' | 'selected'>
  maxLength?: number
  separator?: ReactNode
}

/** @beta */
export type BreadcrumbsElementType = 'div' | 'nav' | ComponentType

/** @beta */
export type BreadcrumbsProps<E extends BreadcrumbsElementType = BreadcrumbsElementType> = Props<
  BreadcrumbsOwnProps,
  E
>

/** @beta */
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
        key="button"
        ref={popoverElementRef}
        constrainSize
        content={
          <Stack as="ol" gap={gapY} overflow="auto">
            {rawItems.slice(beforeLength - 1, len - afterLength)}
          </Stack>
        }
        open={open}
        padding={2}
        placement="top"
        portal
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
