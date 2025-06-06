import {vars} from '@sanity/ui/css'
import type {Space} from '@sanity/ui/theme'
import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'

import {_isScrollable} from '../../helpers/scroll'
import {_ResizeObserver} from '../../observers/resize'
import {Box} from '../../primitives/box/box'
import type {ComponentType, Props} from '../../types/props'

/** @beta */
export const DEFAULT_VIRTUAL_LIST_ELEMENT = 'div'

/** @beta */
export interface VirtualListChangeOpts {
  fromIndex: number
  gap: number
  itemHeight: number
  scrollHeight: number
  scrollTop: number
  toIndex: number
}

/** @beta */
export type VirtualListOwnProps<Item = any> = {
  gap?: Space
  getItemKey?: (item: Item, itemIndex: number) => string
  items?: Item[]
  onChange?: (opts: VirtualListChangeOpts) => void
  renderItem?: (item: Item) => ReactNode
}

/** @beta */
export type VirtualListElementType = 'div' | ComponentType

/** @beta */
export type VirtualListProps<E extends VirtualListElementType = VirtualListElementType> = Props<
  VirtualListOwnProps,
  E
>

/** @beta */
export function VirtualList<E extends VirtualListElementType = typeof DEFAULT_VIRTUAL_LIST_ELEMENT>(
  props: VirtualListProps<E>,
) {
  const {
    as = DEFAULT_VIRTUAL_LIST_ELEMENT,
    gap = 0,
    getItemKey,
    items = [],
    onChange,
    renderItem,
    ref: forwardedRef,
    ...rest
  } = props as VirtualListProps<typeof DEFAULT_VIRTUAL_LIST_ELEMENT>

  const ref = useRef<HTMLDivElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [scrollHeight, setScrollHeight] = useState(0)
  const [itemHeight, setItemHeight] = useState(-1)

  const [gapValue, setGapValue] = useState(0)

  // Sync ref to parent
  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(forwardedRef, () => ref.current)

  useEffect((): (() => void) | undefined => {
    if (!ref.current) return

    const scrollEl = findScrollable(ref.current.parentNode)

    if (scrollEl) {
      if (!(scrollEl instanceof HTMLElement)) return

      const handleScroll = () => {
        setScrollTop(scrollEl.scrollTop)
      }

      scrollEl.addEventListener('scroll', handleScroll, {passive: true})

      const ro = new _ResizeObserver((entries) => {
        setScrollHeight(entries[0].contentRect.height)
      })

      ro.observe(scrollEl)

      handleScroll()

      return () => {
        scrollEl.removeEventListener('scroll', handleScroll)

        ro.unobserve(scrollEl)
        ro.disconnect()
      }
    }

    const handleScroll = () => {
      setScrollTop(window.scrollY)
    }

    const handleResize = () => {
      setScrollHeight(window.innerHeight)
    }

    window.addEventListener('scroll', handleScroll, {passive: true})
    window.addEventListener('resize', handleResize)

    setScrollHeight(window.innerHeight)

    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const len = items.length
  const height = itemHeight ? len * (itemHeight + gapValue) - gapValue : 0
  const fromIndex = height ? Math.max(Math.floor((scrollTop / height) * len) - 2, 0) : 0
  const toIndex = height ? Math.ceil(((scrollTop + scrollHeight) / height) * len) + 1 : 0

  useEffect(() => {
    onChange?.({
      fromIndex,
      gap: gapValue,
      itemHeight,
      scrollHeight,
      scrollTop,
      toIndex,
    })
  }, [fromIndex, gapValue, itemHeight, onChange, scrollHeight, scrollTop, toIndex])

  useEffect(() => {
    // console.log('renderItem', renderItem)
    setItemHeight(-1)
  }, [renderItem])

  const children = useMemo(() => {
    if (!renderItem || items.length === 0) return null

    if (itemHeight === -1) {
      return [
        <>
          <Box
            ref={(el) => (el ? setItemHeight(el.offsetHeight) : undefined)}
            insetTop={0}
            insetLeft={0}
            insetRight={0}
            key={0}
            position="absolute"
          >
            {renderItem(items[0])}
          </Box>
          <div
            ref={(el) => (el ? setGapValue(el.offsetHeight) : undefined)}
            style={{height: vars.space[gap]}}
          />
        </>,
      ]
    }

    return items.slice(fromIndex, toIndex).map((item, _itemIndex) => {
      const itemIndex = fromIndex + _itemIndex
      const node = renderItem(item)
      const key = getItemKey ? getItemKey(item, itemIndex) : itemIndex

      return (
        <Box
          insetLeft={0}
          insetRight={0}
          key={key}
          position="absolute"
          style={{top: itemIndex * (itemHeight + gapValue)}}
        >
          {node}
        </Box>
      )
    })
  }, [fromIndex, gap, gapValue, getItemKey, itemHeight, items, renderItem, toIndex])

  const wrapperStyle: CSSProperties = useMemo(() => ({height}), [height])

  return (
    <Box data-ui="VirtualList" {...rest} as={as} position="relative" ref={ref}>
      <div ref={wrapperRef} style={wrapperStyle}>
        {children}
      </div>
    </Box>
  )
}

function findScrollable(parentNode: ParentNode | null) {
  let _scrollEl = parentNode

  while (_scrollEl && !_isScrollable(_scrollEl)) {
    _scrollEl = _scrollEl.parentNode
  }

  return _scrollEl
}
