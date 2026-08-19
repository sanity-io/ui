import {clsx} from 'clsx/lite'
import {useEffect, useImperativeHandle, useRef, useState} from 'react'

import {_isScrollable} from '../../helpers/scroll'
import {StackOwnProps} from '../../primitives/stack/stack'
import {useTheme_v2} from '../../theme/useTheme'

import {virtualList, virtualListItem} from './virtualList.css'

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
export interface VirtualListProps<Item = any> {
  as?: React.ElementType | keyof React.JSX.IntrinsicElements
  gap?: number
  getItemKey?: (item: Item, itemIndex: number) => string
  items?: Item[]
  onChange?: (opts: VirtualListChangeOpts) => void
  renderItem?: (item: Item) => React.ReactNode
}

/**
 * @beta
 */
export function VirtualList(
  props: VirtualListProps &
    StackOwnProps &
    Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'children' | 'onChange'>,
): React.JSX.Element {
  const {
    as = 'div',
    className,
    gap = 0,
    getItemKey,
    items = [],
    onChange,
    ref: forwardedRef,
    renderItem,
    ...restProps
  } = props
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

      const ro = new ResizeObserver((entries) => {
        setScrollHeight(entries[0].contentRect.height)
      })

      ro.observe(scrollEl)

      handleScroll()

      // oxlint-disable-next-line consistent-return
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

    // oxlint-disable-next-line consistent-return
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

  const children = useChildren({
    fromIndex,
    gap,
    itemHeight,
    space,
    toIndex,
    getItemKey,
    items,
    renderItem,
  })

  // Rendering the polymorphic `as` needs one concrete element type for JSX to
  // type-check the div-flavored props (the same widening styled-components'
  // `as` prop performed here before).
  // oxlint-disable-next-line no-unsafe-type-assertion
  const Component = as as 'div'

  return (
    <Component
      className={clsx(virtualList, className)}
      data-ui="VirtualList"
      {...restProps}
      ref={ref}
    >
      <div ref={wrapperRef} style={{height}}>
        {children}
      </div>
    </Component>
  )
}

function useChildren({
  fromIndex,
  gap,
  getItemKey,
  itemHeight,
  items,
  renderItem,
  space,
  toIndex,
}: Pick<VirtualListProps, 'getItemKey' | 'renderItem'> &
  Required<Pick<VirtualListProps, 'items'>> & {
    fromIndex: number
    gap: number
    itemHeight: number
    space: number[]
    toIndex: number
  }) {
  if (!renderItem || items.length === 0) return null

  if (itemHeight === -1) {
    return [
      <div className={virtualListItem} key={0}>
        {renderItem(items[0])}
      </div>,
    ]
  }

  return items.slice(fromIndex, toIndex).map((item, _itemIndex) => {
    const itemIndex = fromIndex + _itemIndex
    const node = renderItem(item)
    const key = getItemKey ? getItemKey(item, itemIndex) : itemIndex

    return (
      <div
        className={virtualListItem}
        key={key}
        style={{top: itemIndex * (itemHeight + space[gap])}}
      >
        {node}
      </div>
    )
  })
}

function findScrollable(parentNode: ParentNode | null) {
  let _scrollEl = parentNode

  while (_scrollEl && !_isScrollable(_scrollEl)) {
    _scrollEl = _scrollEl.parentNode
  }

  return _scrollEl
}
