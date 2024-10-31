import {
  ForwardedRef,
  forwardRef,
  ReactElement,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'

import {useTheme_v2} from '../../_compat'
import {_isScrollable} from '../../helpers'
import {_ResizeObserver} from '../../observers'
import {Box, StackProps} from '../../primitives'
import {Props} from '../../types'

/**
 * @beta
 */
export interface VirtualListChangeOpts {
  fromIndex: number
  gap: number
  itemHeight: number
  scrollHeight: number
  scrollTop: number
  toIndex: number
}

/**
 * @beta
 */
export interface VirtualListProps<Item = any> extends Omit<StackProps, 'gap'> {
  gap?: number
  getItemKey?: (item: Item, itemIndex: number) => string
  items?: Item[]
  onChange?: (opts: VirtualListChangeOpts) => void
  renderItem?: (item: Item) => ReactNode
}

/**
 * @beta
 */
export const VirtualList = forwardRef(function VirtualList(
  props: Props<VirtualListProps, 'div'>,
  forwardedRef: ForwardedRef<HTMLDivElement>,
): ReactElement {
  const {as = 'div', gap = 0, getItemKey, items = [], onChange, renderItem, ...restProps} = props
  const {space} = useTheme_v2()
  const ref = useRef<HTMLDivElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [scrollHeight, setScrollHeight] = useState(0)
  const [itemHeight, setItemHeight] = useState(-1)

  // Sync ref to parent
  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(forwardedRef, () => ref.current)

  useEffect(() => {
    if (!wrapperRef.current) return

    const firstElement = wrapperRef.current.firstChild

    if (firstElement instanceof HTMLElement) {
      setItemHeight(firstElement.offsetHeight)
    }
  }, [renderItem])

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
  const height = itemHeight ? len * (itemHeight + space[gap]) - space[gap] : 0
  const fromIndex = height ? Math.max(Math.floor((scrollTop / height) * len) - 2, 0) : 0
  const toIndex = height ? Math.ceil(((scrollTop + scrollHeight) / height) * len) + 1 : 0

  useEffect(() => {
    if (!onChange) return
    onChange({fromIndex, gap: space[gap], itemHeight, scrollHeight, scrollTop, toIndex})
  }, [fromIndex, gap, itemHeight, onChange, scrollHeight, scrollTop, space, toIndex])

  const children = useMemo(() => {
    if (!renderItem || items.length === 0) return null

    if (itemHeight === -1) {
      return [
        <Box insetTop={0} insetLeft={0} key={0} position="absolute">
          {renderItem(items[0])}
        </Box>,
      ]
    }

    return items.slice(fromIndex, toIndex).map((item, _itemIndex) => {
      const itemIndex = fromIndex + _itemIndex
      const node = renderItem(item)
      const key = getItemKey ? getItemKey(item, itemIndex) : itemIndex

      return (
        <Box
          insetLeft={0}
          key={key}
          position="absolute"
          style={{top: itemIndex * (itemHeight + space[gap])}}
        >
          {node}
        </Box>
      )
    })
  }, [fromIndex, gap, getItemKey, itemHeight, items, renderItem, space, toIndex])

  const wrapperStyle = useMemo(() => ({height}), [height])

  return (
    <Box
      // Root
      as={as}
      data-ui="VirtualList"
      {...restProps}
      position="relative"
      ref={ref}
    >
      <div ref={wrapperRef} style={wrapperStyle}>
        {children}
      </div>
    </Box>
  )
})

VirtualList.displayName = 'ForwardRef(VirtualList)'

function findScrollable(parentNode: ParentNode | null) {
  let _scrollEl = parentNode

  while (_scrollEl && !_isScrollable(_scrollEl)) {
    _scrollEl = _scrollEl.parentNode
  }

  return _scrollEl
}
