import {breadcrumbs, composeClassNames, GapStyleProps} from '@sanity/ui/css'
import {Space} from '@sanity/ui/theme'
import {
  Children,
  ForwardedRef,
  forwardRef,
  Fragment,
  isValidElement,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'

import {useClickOutsideEvent} from '../../hooks'
import {Box, Button, ButtonProps, Flex, Popover, Stack, Text} from '../../primitives'
import {Props} from '../../types'

/**
 * @beta
 */
export interface BreadcrumbsProps extends GapStyleProps {
  expandButton?: Omit<ButtonProps, 'onClick' | 'selected'>
  maxLength?: number
  separator?: ReactNode
  /** @deprecated - Use `gap`, `gapX`, `gapY` instead */
  space?: number | number[]
}

/**
 * @beta
 */
export const Breadcrumbs = forwardRef(function Breadcrumbs(
  props: Props<BreadcrumbsProps, 'div'>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {
    children,
    className,
    expandButton: expandButtonProps,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    gap: _gapProp,
    gapX = props.gap ?? (props.space as Space | undefined) ?? 2,
    gapY = props.gap ?? (props.space as Space | undefined) ?? 2,
    maxLength,
    separator,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    space: _spaceProp,
    ...restProps
  } = props
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
            <Stack as="ol" overflow="auto" space={gapY}>
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
      as="nav"
      data-ui="Breadcrumbs"
      {...restProps}
      className={composeClassNames(className, breadcrumbs())}
      gapX={gapX}
      gapY={gapY}
      ref={ref}
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
})

Breadcrumbs.displayName = 'ForwardRef(Breadcrumbs)'
