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

/**
 * The default HTML element type rendered by the {@link Tree} component.
 *
 * @beta
 */
export const DEFAULT_TREE_ELEMENT = 'div'

/**
 * Own props for the {@link Tree} component.
 *
 * @remarks
 * Defines the configuration for a tree view container that manages keyboard
 * navigation (ArrowUp, ArrowDown, ArrowLeft, ArrowRight), focus tracking,
 * and expand/collapse state for its {@link TreeItem} children.
 *
 * This API might change. DO NOT USE IN PRODUCTION.
 *
 * @beta
 */
export type TreeOwnProps = {
  /**
   * Sets the vertical gap between tree items.
   *
   * @remarks
   * Uses the spacing scale defined by the theme. Supports responsive values.
   * The gap is applied to an internal {@link Stack} component that wraps the
   * tree's children.
   *
   * @defaultValue 1
   */
  gap?: ResponsiveProp<Space>
}

/**
 * Accepted values for the `as` prop of the {@link Tree} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `Tree`.
 *
 * @beta
 */
export type TreeElementType = 'div' | ComponentType

/**
 * Props for the {@link Tree} component.
 *
 * @remarks
 * Combines {@link TreeOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<div>` element by default.
 *
 * Standard HTML attributes available include `onFocus`, `onKeyDown`, `ref`,
 * `className`, `style`, etc.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link TreeElementType}.
 *
 * @beta
 */
export type TreeProps<E extends TreeElementType = TreeElementType> = Props<TreeOwnProps, E>

/**
 * A hierarchical tree view component that manages keyboard navigation,
 * focus tracking, and expand/collapse state for nested {@link TreeItem} children.
 *
 * @remarks
 * The `Tree` component renders a `<ul>` element (via {@link Stack}) with
 * `role="tree"` and provides a {@link TreeContext} to its descendants for
 * registering items, tracking focused elements, and managing expanded state.
 *
 * Keyboard navigation follows the WAI-ARIA TreeView pattern:
 * - **ArrowDown** – Moves focus to the next visible tree item.
 * - **ArrowUp** – Moves focus to the previous visible tree item.
 * - **ArrowRight** – Expands a collapsed item, or does nothing if already expanded.
 * - **ArrowLeft** – Collapses an expanded item, or moves focus to its parent item.
 *
 * This API might change. DO NOT USE IN PRODUCTION.
 *
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
    <TreeContext value={contextValue}>
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
    </TreeContext>
  )
}
