import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {Stack} from '../../primitives'
import {_findNextItemElement, _findPrevItemElement, _focusItemElement} from './helpers'
import {TreeContext} from './treeContext'
import {TreeContextValue, TreeState} from './types'

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export interface TreeProps {
  space?: number | number[]
}

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export function Tree(
  props: TreeProps &
    Omit<React.HTMLProps<HTMLDivElement>, 'align' | 'as' | 'height' | 'ref' | 'role' | 'wrap'>
): React.ReactElement {
  const {children, space = 1, ...restProps} = props
  const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(null)
  const path: string[] = useMemo(() => [], [])
  const rootRef = useRef<HTMLDivElement | null>(null)
  const [itemElements, setItemElements] = useState<HTMLElement[]>([])
  const [state, setState] = useState<TreeState>({})

  const registerItem = useCallback(
    (element: HTMLElement, path: string, expanded: boolean, selected: boolean) => {
      setState((s) => ({...s, [path]: {element, expanded}}))

      if (selected) {
        setFocusedElement(element)
      }

      return () => {
        setState((s) => {
          const newState = {...s}

          delete newState[path]

          return newState
        })
      }
    },
    []
  )

  const setExpanded = useCallback((path: string, expanded: boolean) => {
    setState((s) => {
      const itemState = s[path]

      if (!itemState) return s

      return {...s, [path]: {...itemState, expanded}}
    })
  }, [])

  const contextValue: TreeContextValue = useMemo(
    () => ({
      version: 0.0,
      focusedElement: focusedElement || itemElements[0] || null,
      level: 0,
      path,
      registerItem,
      setExpanded,
      setFocusedElement,
      space,
      state,
    }),
    [focusedElement, itemElements, path, registerItem, setExpanded, space, state]
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!focusedElement) return

      if (event.key === 'ArrowDown') {
        event.preventDefault()

        const nextEl = _findNextItemElement(state, itemElements, focusedElement)

        if (nextEl) {
          _focusItemElement(nextEl)
          setFocusedElement(nextEl)
        }

        return
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()

        const prevEl = _findPrevItemElement(state, itemElements, focusedElement)

        if (prevEl) {
          _focusItemElement(prevEl)
          setFocusedElement(prevEl)
        }

        return
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()

        const itemKey = focusedElement.getAttribute('data-tree-key')

        if (!itemKey) return

        const itemState = state[itemKey]

        if (!itemState) return

        if (itemState.expanded) {
          setState((s) => {
            const itemState = s[itemKey]

            if (!itemState) return s

            return {...s, [itemKey]: {...itemState, expanded: false}}
          })
        } else {
          const itemPath = itemKey.split('/')

          itemPath.pop()

          const parentKey = itemPath.join('/')
          const parentState = parentKey && state[parentKey]

          if (parentState) {
            parentState.element.focus()
            setFocusedElement(parentState.element)
          }
        }

        return
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()

        const focusedKey = focusedElement.getAttribute('data-tree-key')

        if (!focusedKey) return

        if (!state[focusedKey]?.expanded) {
          setState((s) => {
            const itemState = s[focusedKey]

            if (!itemState) return s

            return {...s, [focusedKey]: {...itemState, expanded: true}}
          })
        }

        return
      }
    },
    [focusedElement, itemElements, state]
  )

  useEffect(() => {
    if (!rootRef.current) return
    const _itemElements = Array.from(
      rootRef.current.querySelectorAll('[data-ui="TreeItem"]')
    ) as HTMLElement[]

    setItemElements(_itemElements)
  }, [children])

  return (
    <TreeContext.Provider value={contextValue}>
      <Stack
        as="ul"
        data-ui="Tree"
        {...restProps}
        onKeyDown={handleKeyDown}
        ref={rootRef}
        role="tree"
        space={space}
      >
        {children}
      </Stack>
    </TreeContext.Provider>
  )
}
