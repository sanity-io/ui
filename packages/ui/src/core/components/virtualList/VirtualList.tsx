import {vars} from '@sanity/ui/css'
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

import {_isScrollable} from '../../helpers/scroll'
import {_ResizeObserver} from '../../observers/resize'
import {Box} from '../../primitives/box/Box'
import type {ComponentType, Props} from '../../types'

/**
 * The default HTML element type rendered by the {@link VirtualList} component.
 *
 * @beta
 */
export const DEFAULT_VIRTUAL_LIST_ELEMENT = 'div'

/**
 * Options object passed to the {@link VirtualListOwnProps.onChange | onChange}
 * callback of the {@link VirtualList} component whenever the visible range
 * or scroll metrics change.
 *
 * @beta
 */
export interface VirtualListChangeOpts {
  /**
   * The index of the first item currently rendered in the visible window.
   */
  fromIndex: number

  /**
   * The computed gap value (in pixels) between list items, derived from
   * the theme's spacing scale for the provided `gap` prop.
   */
  gap: number

  /**
   * The measured height (in pixels) of a single list item. Determined
   * automatically by rendering the first item and measuring its offset height.
   */
  itemHeight: number

  /**
   * The height (in pixels) of the scrollable viewport containing the list.
   */
  scrollHeight: number

  /**
   * The current vertical scroll offset (in pixels) of the scrollable container.
   */
  scrollTop: number

  /**
   * The index (exclusive) of the last item currently rendered in the visible window.
   */
  toIndex: number
}

/**
 * Own props for the {@link VirtualList} component.
 *
 * @remarks
 * Defines the configuration for a virtualized list that only renders the
 * items currently visible in the scrollable viewport, improving performance
 * for large data sets.
 *
 * @typeParam Item - The shape of each item in the list. Defaults to `any`.
 *
 * @beta
 */
export type VirtualListOwnProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Item = any,
> = {
  /**
   * Sets the vertical gap between list items.
   *
   * @remarks
   * Uses the spacing scale defined by the theme. The gap value is measured
   * from the DOM on mount to determine the pixel spacing between items for
   * accurate virtual positioning.
   *
   * @defaultValue 0
   */
  gap?: Space

  /**
   * A function that returns a unique key for each item, used as the React
   * `key` prop when rendering list items.
   *
   * @remarks
   * Receives the item and its index in the `items` array. When not provided,
   * the item's index is used as the key.
   *
   * Providing a stable key function improves rendering performance and avoids
   * unnecessary re-mounts when the visible window shifts.
   */
  getItemKey?: (item: Item, itemIndex: number) => string

  /**
   * The full array of items to render in the virtualized list.
   *
   * @remarks
   * Only the items within the currently visible scroll window are rendered
   * to the DOM. The list measures the height of the first item on mount to
   * calculate the total content height and determine which items are visible.
   *
   * @defaultValue `[]`
   */
  items?: Item[]

  /**
   * Callback fired whenever the visible range or scroll metrics change.
   *
   * @remarks
   * Receives a {@link VirtualListChangeOpts} object containing the current
   * `fromIndex`, `toIndex`, `scrollTop`, `scrollHeight`, `itemHeight`, and
   * `gap` values. Useful for implementing infinite scroll, loading indicators,
   * or analytics tracking.
   */
  onChange?: (opts: VirtualListChangeOpts) => void

  /**
   * A render function called for each visible item to produce its React element.
   *
   * @remarks
   * Receives a single item from the `items` array and must return a React node
   * representing that item's UI. When not provided or when `items` is empty,
   * the list renders nothing.
   *
   * The returned element is wrapped in an absolutely positioned {@link Box}
   * container that handles vertical placement within the virtualized scroll area.
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
 * A virtualized list component that only renders the items currently visible
 * within the scrollable viewport, optimizing performance for large data sets.
 *
 * @remarks
 * The `VirtualList` component measures the height of a single item and the
 * scroll metrics of its nearest scrollable ancestor (or the window if none
 * exists) to compute which items are visible. Only the visible slice of the
 * `items` array is rendered, each absolutely positioned within a wrapper
 * element whose total height matches the full list.
 *
 * On mount, the component renders the first item to measure its height and
 * the gap between items. Subsequent renders position only the visible items
 * at their computed offsets, keeping DOM node count constant regardless of
 * list length.
 *
 * The `onChange` callback fires whenever the visible range or scroll metrics
 * change, enabling infinite-scroll patterns and loading indicators.
 *
 * This API might change. DO NOT USE IN PRODUCTION.
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
    // console.log('renderItem', renderItem)
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
    <Box data-ui="VirtualList" {...rest} as={as} position="relative" ref={ref}>
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
          ref={(el) => {
            if (el) setItemHeight(el.offsetHeight)
          }}
          insetTop={0}
          insetLeft={0}
          insetRight={0}
          key={0}
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
}

function findScrollable(parentNode: ParentNode | null) {
  let _scrollEl = parentNode

  while (_scrollEl && !_isScrollable(_scrollEl)) {
    _scrollEl = _scrollEl.parentNode
  }

  return _scrollEl
}
