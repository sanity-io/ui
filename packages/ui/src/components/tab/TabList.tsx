import type {ComponentType, Props} from '@sanity/ui/core'
import {Flex, type FlexOwnProps} from '@sanity/ui/primitives/flex'
import {type KeyboardEvent, useCallback, useEffect, useRef, useState} from 'react'

import {TabContext} from './TabListContext'
import type {TabContextListValue} from './types'

/**
 * The default HTML element type rendered by the {@link TabList} component.
 *
 * @public
 */
export const DEFAULT_TAB_LIST_ELEMENT = 'div'

/**
 * Own props for the {@link TabList} component.
 *
 * @remarks
 * Extends {@link FlexOwnProps} to inherit all flex container layout props.
 *
 * @public
 */
export interface TabListOwnProps extends FlexOwnProps {
  /**
   * When `true`, tabs are automatically activated (selected) when they
   * receive focus via keyboard navigation.
   */
  autoActivate?: boolean
}

/**
 * Accepted values for the `as` prop of the {@link TabList} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `TabList`.
 *
 * @public
 */
export type TabListElementType = 'div' | 'span' | ComponentType

/**
 * Props for the {@link TabList} component.
 *
 * @remarks
 * Combines {@link TabListOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop, with the `role` attribute omitted
 * since it is always set to `"tablist"`. When `as` is not provided,
 * the component renders a `<div>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link TabListElementType}.
 *
 * @public
 */
export type TabListProps<E extends TabListElementType = TabListElementType> = Omit<
  Props<TabListOwnProps, E>,
  'role'
>

/**
 * The `TabList` component is a container for {@link Tab} components that
 * provides keyboard navigation and focus management following the WAI-ARIA
 * tabs pattern.
 *
 * @remarks
 * `TabList` renders a {@link Flex} container with `role="tablist"` and manages
 * keyboard navigation (ArrowLeft, ArrowRight, Home, End) across its child
 * {@link Tab} components. It tracks the currently focused and active tab,
 * and optionally auto-activates tabs on focus when `autoActivate` is `true`.
 *
 * @public
 */
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
      // register tab
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
        // unregister tab
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
        // display="flex"
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
