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

/** @beta */
export const DEFAULT_BREADCRUMBS_ELEMENT = 'nav'

/** @beta */
export type BreadcrumbsOwnProps = GapStyleProps & {
  expandButton?: Omit<ButtonProps<'button'>, 'as' | 'onClick' | 'selected'>
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
    className,
    expandButton: expandButtonProps,
    gap = 2,
    gapX,
    gapY,
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

  const items = useMemo(() => {
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
  }, [collapse, expand, expandButtonProps, gapY, maxLength, open, rawItems])

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
