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

/**
 * The default HTML element type rendered by the {@link VirtualList} component.
 *
 * @beta
 */
export const DEFAULT_VIRTUAL_LIST_ELEMENT = 'div'

/**
 * Options passed to the {@link VirtualListOwnProps.onChange} callback when
 * the visible range or layout measurements change.
 *
 * @beta
 */
export interface VirtualListChangeOpts {
  /** The index of the first visible item in the list. */
  fromIndex: number

  /** The computed gap in pixels between items. */
  gap: number

  /** The measured height in pixels of a single item. */
  itemHeight: number

  /** The height in pixels of the scrollable viewport. */
  scrollHeight: number

  /** The current scroll position in pixels. */
  scrollTop: number

  /** The index of the last visible item in the list (exclusive). */
  toIndex: number
}

/**
 * Own props for the {@link VirtualList} component.
 *
 * @remarks
 * Provides configuration for virtualized rendering of large lists,
 * including item rendering, keying, spacing, and change notifications.
 *
 * @typeParam Item - The shape of each item in the list.
 *
 * @beta
 */
export type VirtualListOwnProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Item = any,
> = {
  /**
   * The spacing between items, using the theme's space scale.
   */
  gap?: Space

  /**
   * A function that returns a unique key for each item, used for
   * React reconciliation of virtualized items.
   *
   * @remarks
   * When not provided, the item's index is used as the key.
   */
  getItemKey?: (item: Item, itemIndex: number) => string

  /**
   * The array of items to render in the virtualized list.
   */
  items?: Item[]

  /**
   * A callback that fires when the visible range or layout measurements change.
   */
  onChange?: (opts: VirtualListChangeOpts) => void

  /**
   * A render function for each item in the list.
   */
  renderItem?: (item: Item) => ReactNode
}

/**
 * Accepted values for the `as` prop of the {@link VirtualList} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `VirtualList`.
 *
 * @beta
 */
export type VirtualListElementType = 'div' | ComponentType

/**
 * Props for the {@link VirtualList} component.
 *
 * @remarks
 * Combines {@link VirtualListOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<div>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link VirtualListElementType}.
 *
 * @beta
 */
export type VirtualListProps<E extends VirtualListElementType = VirtualListElementType> = Props<
  VirtualListOwnProps,
  E
>

/**
 * The `VirtualList` component efficiently renders large lists by only
 * mounting the items currently visible within the scrollable viewport.
 *
 * @remarks
 * `VirtualList` measures a single item's height on first render, then
 * calculates which items are visible based on the scroll position and
 * viewport size. Only the visible subset of items is rendered, with
 * absolute positioning used to place them correctly within a sized wrapper.
 *
 * @beta
 */
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

function findScrollable(parentNode: ParentNode | null) {
  let _scrollEl = parentNode

  while (_scrollEl && !_isScrollable(_scrollEl)) {
    _scrollEl = _scrollEl.parentNode
  }

  return _scrollEl
}
