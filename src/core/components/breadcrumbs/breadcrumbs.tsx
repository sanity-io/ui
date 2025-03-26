import {
  Children,
  forwardRef,
  Fragment,
  isValidElement,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'

import {useArrayProp, useClickOutsideEvent} from '../../hooks'
import {Box, Popover, Stack, Text} from '../../primitives'
import {ExpandButton, StyledBreadcrumbs} from './breadcrumbs.styles'

/**
 * @beta
 */
export interface BreadcrumbsProps {
  maxLength?: number
  separator?: React.ReactNode
  space?: number | number[]
}

/**
 * @beta
 */
export const Breadcrumbs = forwardRef(function Breadcrumbs(
  props: BreadcrumbsProps & Omit<React.HTMLProps<HTMLOListElement>, 'as' | 'ref' | 'type'>,
  ref: React.ForwardedRef<HTMLOListElement>,
) {
  const {children, maxLength, separator, space: spaceRaw = 2, ...restProps} = props
  const space = useArrayProp(spaceRaw)
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
            <Stack as="ol" overflow="auto" padding={space} space={space}>
              {rawItems.slice(beforeLength - 1, len - afterLength)}
            </Stack>
          }
          key="button"
          open={open}
          placement="top"
          portal
          ref={popoverElementRef}
        >
          <ExpandButton
            fontSize={1}
            mode="bleed"
            onClick={open ? collapse : expand}
            padding={1}
            ref={expandElementRef}
            selected={open}
            text="…"
          />
        </Popover>,
        ...rawItems.slice(len - afterLength),
      ]
    }

    return rawItems
  }, [collapse, expand, maxLength, open, rawItems, space])

  return (
    <StyledBreadcrumbs data-ui="Breadcrumbs" {...restProps} ref={ref}>
      {items.map((item, itemIndex) => (
        <Fragment key={itemIndex}>
          {itemIndex > 0 && (
            <Box aria-hidden as="li" paddingX={space}>
              {separator || <Text muted>/</Text>}
            </Box>
          )}
          <Box as="li">{item}</Box>
        </Fragment>
      ))}
    </StyledBreadcrumbs>
  )
})
Breadcrumbs.displayName = 'ForwardRef(Breadcrumbs)'
