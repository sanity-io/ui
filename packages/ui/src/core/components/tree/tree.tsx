import {useCallback, useMemo, useState} from 'react'

import {Stack} from '../../primitives/stack/stack'
import {_focusItemElement, _focusNextItemElement, _getItemFocusTarget} from './helpers'
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
  const {children, gap = 1, onFocus, onMouseDown, ref, tabIndex = 0, ...restProps} = props
  const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(null)
  const path: string[] = useMemo(() => [], [])
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
    [],
  )

  const setExpanded = useCallback((path: string, expanded: boolean) => {
    setState((s) => {
      const itemState = s[path]

      if (!itemState) return s

      return {...s, [path]: {...itemState, expanded}}
    })
  }, [])

  // The focused item is the tab stop while it is mounted. Until then, and after it unmounts, the
  // tree element is, and passes focus on to the first item (see `handleFocus`).
  const tabStop = Object.values(state).some((item) => item?.element === focusedElement)
    ? focusedElement
    : null

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

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLUListElement>) => {
      // Keys pressed in content inside an item (`text` can be any node) are left to that content
      if (event.target !== (tabStop ? _getItemFocusTarget(tabStop) : event.currentTarget)) return

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        _focusNextItemElement(event.currentTarget, tabStop, 1)

        return
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        _focusNextItemElement(event.currentTarget, tabStop, -1)

        return
      }

      if (!tabStop) return

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
            _focusItemElement(parentState.element)
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

        return
      }
    },
    [setExpanded, state, tabStop],
  )

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLUListElement>) => {
      if (event.target === event.currentTarget) {
        // Focus passed on to an item is reported by the item's own focus event
        if (_focusNextItemElement(event.currentTarget, null, 1)) return
      } else {
        // The focused element is an item, the link of an item with an `href`, or inside an item
        setFocusedElement(event.target.closest<HTMLElement>('[data-ui="TreeItem"]'))
      }

      // Call the element's `focus` handler
      onFocus?.(event)
    },
    [onFocus],
  )

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLUListElement>) => {
      // A press between the items does not focus the tree element (and thereby the first item)
      if (event.target === event.currentTarget) event.preventDefault()

      onMouseDown?.(event)
    },
    [onMouseDown],
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
        tabIndex={tabStop ? undefined : tabIndex}
      >
        {children}
      </Stack>
    </TreeContext.Provider>
  )
}
