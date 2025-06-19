import {type ResponsiveProp} from '@sanity/ui/css'
import type {Space} from '@sanity/ui/theme'
import {
  Children,
  cloneElement,
  type KeyboardEvent,
  type ReactElement,
  useCallback,
  useState,
} from 'react'

import {Flex, type FlexOwnProps} from '../../primitives/flex/flex'
import type {ComponentType, Props} from '../../types/props'
import type {TabProps} from './tab'

/** @public */
export const DEFAULT_TAB_LIST_ELEMENT = 'div'

/** @public */
export type TabListChild = ReactElement<Props<TabProps, 'button'>> | null | undefined | false

/** @public */
export type TabListOwnProps = Omit<FlexOwnProps, 'as' | 'height'> & {
  children: TabListChild[]
  /** @deprecated Use `gap` instead */
  space?: ResponsiveProp<Space>
}

/** @public */
export type TabListElementType = 'div' | 'span' | ComponentType

/** @public */
export type TabListProps<E extends TabListElementType = TabListElementType> = Props<
  TabListOwnProps,
  E
>

/** @public */
export function TabList<E extends TabListElementType = typeof DEFAULT_TAB_LIST_ELEMENT>(
  props: TabListProps<E>,
): React.JSX.Element {
  const {
    as = DEFAULT_TAB_LIST_ELEMENT,
    children: childrenProp,
    gap = 1,
    space = 1,
    wrap = 'nowrap',
    ...rest
  } = props as TabListProps<typeof DEFAULT_TAB_LIST_ELEMENT>

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
    <Flex
      data-ui="TabList"
      {...rest}
      as={as}
      gap={gap ?? space}
      onKeyDown={handleKeyDown}
      role="tablist"
      wrap={wrap}
    >
      {tabs}
    </Flex>
  )
}

function _isReactElement(node: unknown): node is ReactElement<Props<TabProps, 'button'>> {
  return Boolean(node)
}
