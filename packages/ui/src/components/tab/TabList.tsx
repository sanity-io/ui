import {type KeyboardEvent, useCallback, useEffect, useRef, useState} from 'react'

import type {ComponentType, Props} from '../../core/types'
import {Flex, type FlexOwnProps} from '../../primitives/flex/Flex'
import {TabContext} from './TabListContext'
import type {TabContextListValue} from './types'

/** @public */
export const DEFAULT_TAB_LIST_ELEMENT = 'div'

/** @public */
export interface TabListOwnProps extends FlexOwnProps {
  autoActivate?: boolean
}

/** @public */
export type TabListElementType = 'div' | 'span' | ComponentType

/** @public */
export type TabListProps<E extends TabListElementType = TabListElementType> = Omit<
  Props<TabListOwnProps, E>,
  'role'
>

/** @public */
export function TabList<E extends TabListElementType = typeof DEFAULT_TAB_LIST_ELEMENT>(
  props: TabListProps<E>,
): React.JSX.Element {
  const {
    as = DEFAULT_TAB_LIST_ELEMENT,
    autoActivate = false,
    children,
    gap = 2,
    onKeyDown,
    wrap = 'wrap',
    ...rest
  } = props as TabListProps<typeof DEFAULT_TAB_LIST_ELEMENT>

  const [focusedId, setFocusedId] = useState<string | undefined>(undefined)
  const [activeId, setActiveId] = useState<string | undefined>(undefined)
  const [tabs, setTabs] = useState<{id: string; element: HTMLElement}[]>(() => [])

  const tabsRef = useRef(tabs)

  useEffect(() => {
    tabsRef.current = tabs
  }, [tabs])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event)

      if (event.key === 'ArrowLeft') {
        setFocusedId((prevId) => {
          const numTabs = tabsRef.current.length
          const prevIndex = prevId ? tabsRef.current.findIndex((tab) => tab.id === prevId) : -1
          const nextIndex = (prevIndex + numTabs - 1) % numTabs
          const nextId = tabsRef.current[nextIndex]?.id

          if (autoActivate) setActiveId(nextId)

          return nextId
        })
        return
      }

      if (event.key === 'ArrowRight') {
        setFocusedId((prevId) => {
          const numTabs = tabsRef.current.length
          const prevIndex = prevId ? tabsRef.current.findIndex((tab) => tab.id === prevId) : -1
          const nextIndex = (prevIndex + 1) % numTabs

          const nextId = tabsRef.current[nextIndex]?.id

          if (autoActivate) setActiveId(nextId)

          return nextId
        })
        return
      }

      // Home (Optional): Moves focus to the first tab.
      if (event.key === 'Home') {
        const nextId = tabsRef.current[0]?.id
        if (autoActivate) setActiveId(nextId)
        setFocusedId(nextId)
        return
      }

      // End (Optional): Moves focus to the last tab.
      if (event.key === 'End') {
        const nextId = tabsRef.current[tabsRef.current.length - 1]?.id
        if (autoActivate) setActiveId(nextId)
        setFocusedId(nextId)
        return
      }
    },
    [autoActivate, onKeyDown],
  )

  const context: TabContextListValue = {
    version: 0.0,
    focusedId,
    activeId: activeId,
    registerTab: (id, element, selectedProp) => {
      setTabs((prevTabs) => {
        const newTabs = [...prevTabs]
        newTabs.push({id, element})
        newTabs.sort((a, b) => {
          // sort by position in DOM
          return a.element.compareDocumentPosition(b.element) & Node.DOCUMENT_POSITION_FOLLOWING
            ? -1
            : 1
        })
        return newTabs
      })

      if (selectedProp) {
        setActiveId(id)
      }

      return () => {
        setTabs((prevTabs) => {
          const newTabs = [...prevTabs]

          newTabs.splice(
            newTabs.findIndex((tab) => tab.id === id),
            1,
          )

          return newTabs
        })
      }
    },
    focusTab: (id) => {
      setFocusedId(id)
      if (autoActivate) setActiveId(id)
    },
    activateTab: setActiveId,
  }

  return (
    <TabContext.Provider value={context}>
      <Flex
        data-ui="TabList"
        {...rest}
        as={as}
        gap={gap}
        role="tablist"
        wrap={wrap}
        onKeyDown={handleKeyDown}
      >
        {children}
      </Flex>
    </TabContext.Provider>
  )
}
