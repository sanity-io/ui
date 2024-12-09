import {
  Children,
  CSSProperties,
  forwardRef,
  isValidElement,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'
import {useClickOutsideEvent} from '../../hooks'
import {Box, Button, ButtonProps, Flex, Popover, Stack, Text} from '../../primitives'
import {Root} from './breadcrumbs.styles'

/**
 * @beta
 */
export interface BreadcrumbsProps {
  expandButton?: Omit<ButtonProps, 'onClick' | 'selected'> & {style?: CSSProperties}
  gap?: number | number[]
  gapX?: number | number[]
  gapY?: number | number[]
  maxLength?: number
  separator?: React.ReactNode
  /** @deprecated - Use `gap`, `gapX`, `gapY` instead */
  space?: number | number[]
}

const DEFAULT_EXPAND_BUTTON_PROPS: BreadcrumbsProps['expandButton'] = {
  padding: 1,
  style: {margin: '-4px 0'},
}

/**
 * @beta
 */
export const Breadcrumbs = forwardRef(function Breadcrumbs(
  props: BreadcrumbsProps & Omit<React.HTMLProps<HTMLOListElement>, 'as' | 'ref' | 'type'>,
  ref: React.ForwardedRef<HTMLOListElement>,
) {
  const {
    children,
    expandButton: expandButtonProps = DEFAULT_EXPAND_BUTTON_PROPS,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    gap: _gapProp,
    gapX = props.gap ?? props.space ?? 2,
    gapY = props.gap ?? props.space ?? 2,
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

  const len = items.length

  return (
    <Root data-ui="Breadcrumbs" {...restProps} ref={ref}>
      <Flex align="flex-start" as="ol" gapX={gapX} gapY={gapY} wrap="wrap">
        {items.map((item, itemIndex) => (
          <Flex align="flex-start" as="li" gapX={gapX} gapY={gapY} key={itemIndex}>
            <Box>{item}</Box>
            {itemIndex < len - 1 && <Box aria-hidden>{separator || <Text muted>/</Text>}</Box>}
          </Flex>
        ))}
      </Flex>
    </Root>
  )
})
Breadcrumbs.displayName = 'ForwardRef(Breadcrumbs)'
