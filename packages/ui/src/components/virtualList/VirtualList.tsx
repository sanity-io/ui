import {_isScrollable, _ResizeObserver, type ComponentType, type Props} from '@sanity/ui/core'
import {vars} from '@sanity/ui/css'
import {Box} from '@sanity/ui/primitives/box'
import type {Space} from '@sanity/ui/theme'
import {
  type CSSProperties,
  type ReactNode,
  startTransition,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'

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
export type VirtualListOwnProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Item = any,
> = {
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
): React.JSX.Element {
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

    const scrollableParent = _findScrollableParent(ref.current.parentNode)

    if (scrollableParent !== document.documentElement && scrollableParent) {
      if (!(scrollableParent instanceof HTMLElement)) return

      const handleScroll = () => {
        setScrollTop(scrollableParent.scrollTop)
      }

      scrollableParent.addEventListener('scroll', handleScroll, {passive: true})

      const ro = new _ResizeObserver((entries) => {
        setScrollHeight(entries[0].contentRect.height)
      })

      ro.observe(scrollableParent)

      handleScroll()

      return () => {
        scrollableParent.removeEventListener('scroll', handleScroll)

        ro.unobserve(scrollableParent)
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

    // eslint-disable-next-line react-hooks/set-state-in-effect
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
    startTransition(() => setItemHeight(-1))
  }, [renderItem])

  const children = useChildren({
    fromIndex,
    gap,
    getItemKey,
    itemHeight,
    items,
    renderItem,
    toIndex,
    gapValue,
    setGapValue,
    setItemHeight,
  })

  const wrapperStyle: CSSProperties = useMemo(() => ({height}), [height])

  return (
    <Box data-ui="VirtualList" {...rest} ref={ref} as={as} position="relative">
      <div ref={wrapperRef} style={wrapperStyle}>
        {children}
      </div>
    </Box>
  )
}

function useChildren({
  fromIndex,
  gap,
  getItemKey,
  itemHeight,
  items,
  renderItem,
  toIndex,
  gapValue,
  setGapValue,
  setItemHeight,
}: Pick<VirtualListProps, 'getItemKey' | 'renderItem'> &
  Required<Pick<VirtualListProps, 'items'>> & {
    fromIndex: number
    gap: Space
    itemHeight: number
    toIndex: number
    gapValue: number
    setGapValue: React.Dispatch<React.SetStateAction<number>>
    setItemHeight: React.Dispatch<React.SetStateAction<number>>
  }) {
  if (!renderItem || items.length === 0) return null

  if (itemHeight === -1) {
    return [
      <>
        <Box
          key={0}
          ref={(el) => {
            if (el) setItemHeight(el.offsetHeight)
          }}
          insetLeft={0}
          insetRight={0}
          insetTop={0}
          position="absolute"
        >
          {renderItem(items[0])}
        </Box>
        <div
          ref={(el) => {
            if (el) setGapValue(el.offsetHeight)
          }}
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
        key={key}
        insetLeft={0}
        insetRight={0}
        position="absolute"
        style={{top: itemIndex * (itemHeight + gapValue)}}
      >
        {node}
      </Box>
    )
  })
}

function _findScrollableParent(parentNode: ParentNode | null) {
  let _scrollEl = parentNode

  while (_scrollEl && !_isScrollable(_scrollEl)) {
    _scrollEl = _scrollEl.parentNode
  }

  return _scrollEl
}
