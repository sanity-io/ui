import {clsx} from 'clsx/lite'
import {Children, Fragment, isValidElement, useCallback, useMemo, useRef, useState} from 'react'

import {useClickOutsideEvent} from '../../hooks/useClickOutsideEvent'
import {Box} from '../../primitives/box/box'
import {Popover} from '../../primitives/popover/popover'
import {Stack} from '../../primitives/stack/stack'
import {Text} from '../../primitives/text/text'
import {_getArrayProp} from '../../styles/helpers'

import {breadcrumbs, expandButton} from './breadcrumbs.css'

/**
 * @beta
 */
export interface BreadcrumbsProps {
  maxLength?: number
  separator?: React.ReactNode
  gap?: number | number[]
  /**
   * @deprecated Use `gap` instead.
   */
  space?: never
}

/**
 * @beta
 */
export function Breadcrumbs(
  props: BreadcrumbsProps & Omit<React.HTMLProps<HTMLOListElement>, 'as' | 'type'>,
) {
  const {children, className, gap = 2, maxLength, ref, separator, ...restProps} = props
  const space = _getArrayProp(gap)
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
    space,
  })

  return (
    <ol className={clsx(breadcrumbs, className)} data-ui="Breadcrumbs" {...restProps} ref={ref}>
      {items.map((item, itemIndex) => (
        // oxlint-disable-next-line no-array-index-key
        <Fragment key={itemIndex}>
          {itemIndex > 0 && (
            <Box aria-hidden as="li" paddingX={space}>
              {separator || <Text muted>/</Text>}
            </Box>
          )}
          <Box as="li">{item}</Box>
        </Fragment>
      ))}
    </ol>
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
  space,
}: {
  collapse: () => void
  expand: () => void
  expandElementRef: React.RefObject<HTMLButtonElement | null>
  maxLength: number | undefined
  open: boolean
  popoverElementRef: React.RefObject<HTMLDivElement | null>
  // oxlint-disable-next-line no-unnecessary-type-arguments
  rawItems: React.ReactElement<unknown, string | React.JSXElementConstructor<any>>[]
  space: number[]
}) {
  const len = rawItems.length

  if (maxLength && len > maxLength) {
    const beforeLength = Math.ceil(maxLength / 2)
    const afterLength = Math.floor(maxLength / 2)

    return [
      ...rawItems.slice(0, beforeLength - 1),
      <Popover
        key="button"
        constrainSize
        content={
          <Stack as="ol" overflow="auto" padding={space} gap={space}>
            {rawItems.slice(beforeLength - 1, len - afterLength)}
          </Stack>
        }
        open={open}
        placement="top"
        portal
        ref={popoverElementRef}
      >
        <Button
          className={expandButton}
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
}
