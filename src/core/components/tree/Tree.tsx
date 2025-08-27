import type {ResponsiveProp} from '@sanity/ui/css'
import type {Space} from '@sanity/ui/theme'
import {
  type FocusEvent,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'

import {Stack} from '../../primitives/stack/Stack'
import type {ComponentType, Props} from '../../types'
import {_findNextItemElement, _findPrevItemElement, _focusItemElement} from './helpers'
import {TreeContext} from './TreeContext'
import type {TreeContextValue, TreeState} from './types'

/** @beta */
export const DEFAULT_TREE_ELEMENT = 'div'

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export type TreeOwnProps = {
  gap?: ResponsiveProp<Space>
}

/** @beta */
export type TreeElementType = 'div' | ComponentType

/** @beta */
export type TreeProps<E extends TreeElementType = TreeElementType> = Props<TreeOwnProps, E>

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export function Tree<E extends TreeElementType = typeof DEFAULT_TREE_ELEMENT>(
  props: TreeProps<E>,
): React.JSX.Element {
  const {
    children,
    gap = 1,
    onFocus,
    ref: forwardedRef,
    ...rest
  } = props as TreeProps<typeof DEFAULT_TREE_ELEMENT>

  const ref = useRef<HTMLDivElement | null>(null)
  const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(null)
  const focusedElementRef = useRef(focusedElement)
  const path: string[] = useMemo(() => [], [])
  const [itemElements, setItemElements] = useState<HTMLElement[]>([])
  const [state, setState] = useState<TreeState>({})
  const stateRef = useRef(state)

  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(forwardedRef, () => ref.current)

  useEffect(() => {
    focusedElementRef.current = focusedElement
  }, [focusedElement])

  useEffect(() => {
    stateRef.current = state
  }, [state])

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

  const contextValue: TreeContextValue = useMemo(
    () => ({
      version: 0.0,
      focusedElement: focusedElement || itemElements[0] || null,
      gap,
      level: 0,
      path,
      registerItem,
      setExpanded,
      setFocusedElement,
      state,
    }),
    [focusedElement, gap, itemElements, path, registerItem, setExpanded, state],
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (!focusedElementRef.current) return

      if (event.key === 'ArrowDown') {
        event.preventDefault()

        const nextEl = _findNextItemElement(
          stateRef.current,
          itemElements,
          focusedElementRef.current,
        )

        if (nextEl) {
          _focusItemElement(nextEl)
          setFocusedElement(nextEl)
        }

        return
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()

        const prevEl = _findPrevItemElement(
          stateRef.current,
          itemElements,
          focusedElementRef.current,
        )

        if (prevEl) {
          _focusItemElement(prevEl)
          setFocusedElement(prevEl)
        }

        return
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()

        const itemKey = focusedElementRef.current.getAttribute('data-tree-key')

        if (!itemKey) return

        const itemState = stateRef.current[itemKey]

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
          const parentState = parentKey && stateRef.current[parentKey]

          if (parentState) {
            parentState.element.focus()
            setFocusedElement(parentState.element)
          }
        }

        return
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()

        const focusedKey = focusedElementRef.current.getAttribute('data-tree-key')

        if (!focusedKey) return

        if (!stateRef.current[focusedKey]?.expanded) {
          setState((s) => {
            const itemState = s[focusedKey]

            if (!itemState) return s

            return {...s, [focusedKey]: {...itemState, expanded: true}}
          })
        }

        return
      }
    },
    [itemElements],
  )

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLDivElement>) => {
      setFocusedElement(event.target)

      // Call the element's `focus` handler
      onFocus?.(event)
    },
    [onFocus],
  )

  useEffect(() => {
    if (!ref.current) return
    const _itemElements = Array.from(
      ref.current.querySelectorAll('[data-ui="TreeItem"]'),
    ) as HTMLElement[]

    setItemElements(_itemElements)
  }, [children])

  return (
    <TreeContext.Provider value={contextValue}>
      <Stack
        as="ul"
        data-ui="Tree"
        {...rest}
        gap={gap}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        ref={ref}
        role="tree"
      >
        {children}
      </Stack>
    </TreeContext.Provider>
  )
}
