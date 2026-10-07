import {useCallback, useImperativeHandle, useMemo, useRef, useState} from 'react'

import {Stack} from '../../primitives/stack/stack'
import {
  _closestItemElement,
  _findLastItemElement,
  _findNextItemElement,
  _findPrevItemElement,
  _focusItemElement,
  _getItemElements,
} from './helpers'
import {TreeContext} from './treeContext'
import {TreeContextValue, TreeState} from './types'

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export interface TreeProps {
  gap?: number | number[]
  /**
   * @deprecated Use `gap` instead.
   */
  space?: never
}

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export function Tree(
  props: TreeProps &
    Omit<React.HTMLProps<HTMLUListElement>, 'align' | 'as' | 'height' | 'role' | 'wrap'>,
): React.JSX.Element {
  const {children, gap = 1, onFocus, onMouseDown, ref: forwardedRef, ...restProps} = props
  const ref = useRef<HTMLUListElement | null>(null)
  const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(null)
  const path: string[] = useMemo(() => [], [])
  const [state, setState] = useState<TreeState>({})
  // Set by a pointer press and consumed by the focus event it causes, so that a press on the tree
  // element itself (between the items) leaves focus there instead of moving it to the first item
  const pointerDownRef = useRef(false)

  useImperativeHandle<HTMLUListElement | null, HTMLUListElement | null>(
    forwardedRef,
    () => ref.current,
  )

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
    [],
  )

  const setExpanded = useCallback((path: string, expanded: boolean) => {
    setState((s) => {
      const itemState = s[path]

      if (!itemState) return s

      return {...s, [path]: {...itemState, expanded}}
    })
  }, [])

  // The focused item is the tree's tab stop (roving tabindex) for as long as it is registered.
  // While there is none — before any item has been focused, or after the focused item unmounted —
  // the tree element takes the tab stop and `handleFocus` passes keyboard focus on to the first
  // item, resolved from the DOM at that moment. That way no item order is kept in state: the
  // first item follows the DOM, also when items are added, removed or moved without being focused.
  const tabStop = useMemo(() => {
    if (!focusedElement) return null

    const registered = Object.values(state).some((item) => item?.element === focusedElement)

    return registered ? focusedElement : null
  }, [focusedElement, state])

  const contextValue: TreeContextValue = useMemo(
    () => ({
      version: 0.0,
      focusedElement: tabStop,
      level: 0,
      path,
      registerItem,
      setExpanded,
      setFocusedElement,
      gap,
      state,
    }),
    [gap, path, registerItem, setExpanded, state, tabStop],
  )

  // The item elements are read from the DOM when a key is pressed instead of being kept in state,
  // so the handler closes over the `state` and `tabStop` of the render it was created in; those
  // change exactly when the tree re-renders anyway
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLUListElement>) => {
      const treeElement = ref.current

      if (!tabStop || !treeElement) return

      const focusItem = (el: HTMLElement | null | undefined) => {
        if (!el) return

        _focusItemElement(el)
        setFocusedElement(el)
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        focusItem(_findNextItemElement(state, _getItemElements(treeElement), tabStop))

        return
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        focusItem(_findPrevItemElement(state, _getItemElements(treeElement), tabStop))

        return
      }

      if (event.key === 'Home') {
        event.preventDefault()
        // The first item is a top-level item, so it is always visible
        focusItem(_getItemElements(treeElement)[0])

        return
      }

      if (event.key === 'End') {
        event.preventDefault()
        focusItem(_findLastItemElement(state, _getItemElements(treeElement)))

        return
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()

        const itemKey = tabStop.getAttribute('data-tree-key')

        if (!itemKey) return

        const itemState = state[itemKey]

        if (!itemState) return

        if (itemState.expanded) {
          setExpanded(itemKey, false)
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

        const focusedKey = tabStop.getAttribute('data-tree-key')

        if (!focusedKey) return

        if (!state[focusedKey]?.expanded) {
          setExpanded(focusedKey, true)
        }
      }
    },
    [setExpanded, state, tabStop],
  )

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLUListElement>) => {
      pointerDownRef.current = true
      onMouseDown?.(event)
    },
    [onMouseDown],
  )

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLUListElement>) => {
      const pointerDown = pointerDownRef.current

      pointerDownRef.current = false

      if (event.target === event.currentTarget) {
        // The tree element is only focusable while no item is the tab stop (see `tabStop`).
        // Keyboard focus is passed on to the first item, which then reports its own focus here; a
        // pointer press on the tree element itself (between the items) leaves focus where it is.
        if (!pointerDown) {
          const [firstItemElement] = _getItemElements(event.currentTarget)

          if (firstItemElement) _focusItemElement(firstItemElement)
        }

        return
      }

      // The focused element may be the item's link (`href`) or something inside it; the item
      // element is what `registerItem` and the navigation keys work with
      const itemElement = _closestItemElement(event.target)

      if (itemElement) setFocusedElement(itemElement)

      // Call the element's `focus` handler
      onFocus?.(event)
    },
    [onFocus],
  )

  return (
    <TreeContext.Provider value={contextValue}>
      <Stack
        as="ul"
        data-ui="Tree"
        {...restProps}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        ref={ref}
        role="tree"
        gap={gap}
        tabIndex={tabStop ? undefined : 0}
      >
        {children}
      </Stack>
    </TreeContext.Provider>
  )
}
