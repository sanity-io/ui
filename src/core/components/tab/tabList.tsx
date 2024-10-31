import {
  Children,
  cloneElement,
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  ReactElement,
  useCallback,
  useState,
} from 'react'

import {Inline, InlineProps} from '../../primitives'
import {Props} from '../../types'
import {TabProps} from './tab'

/**
 * @public
 */
export type TabListChild = ReactElement<Props<TabProps, 'button'>> | null | undefined | false

/**
 * @public
 */
export interface TabListProps extends Omit<InlineProps, 'as' | 'height'> {
  children: TabListChild[]
}

function _isReactElement(node: unknown): node is ReactElement<Props<TabProps, 'button'>> {
  return Boolean(node)
}

/**
 * @public
 */
export const TabList = forwardRef(function TabList(
  props: Props<TabListProps, 'div'>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {children: childrenProp, ...restProps} = props
  const [focusedIndex, setFocusedIndex] = useState(-1)

  const children = Children.toArray(childrenProp).filter(_isReactElement)

  const tabs = children.map((child, childIndex) =>
    cloneElement(child, {
      focused: focusedIndex === childIndex,
      key: childIndex,
      onFocus: () => setFocusedIndex(childIndex),
    }),
  )

  const numTabs = tabs.length

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        setFocusedIndex((prevIndex) => (prevIndex + numTabs - 1) % numTabs)
      }

      if (event.key === 'ArrowRight') {
        setFocusedIndex((prevIndex) => (prevIndex + 1) % numTabs)
      }
    },
    [numTabs],
  )

  return (
    <Inline data-ui="TabList" {...restProps} onKeyDown={handleKeyDown} ref={ref} role="tablist">
      {tabs}
    </Inline>
  )
})

TabList.displayName = 'ForwardRef(TabList)'
