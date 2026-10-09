import {useCallback, useImperativeHandle, useMemo, useRef, useState} from 'react'

import {Stack} from '../../primitives/stack/stack'
import {
  _closestItemElement,
  _focusFirstItemElement,
  _getActiveElement,
  _getItemCandidates,
  _getItemElements,
  _getItemKey,
  _isItemFocusable,
  _isItemKeyVisible,
} from './helpers'
import {TreeContext} from './treeContext'
import {TreeContextValue, TreeState} from './types'

interface FocusedItem {
  element: HTMLElement
  /** The key the item registered under (`data-tree-key`); `null` for an element that is not an item */
  key: string | null
}

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
 *
 * @remarks
 * The tree is a single tab stop. Until an item has been focused or mounted as `selected` (and
 * again while that item is unmounted or inside a collapsed ancestor) the tree element itself is
 * that tab stop: keyboard focus on it is passed on to the first item, while a pointer press
 * between the items leaves focus on the tree element, from where `ArrowDown` / `Home` and
 * `ArrowUp` / `End` enter the items; it stays the tab stop for as long as it has focus. A
 * `tabIndex` prop applies to the tree element in that state
 * only (`-1` keeps the tree out of the tab order), and so does `focus()` on the element (through
 * the `ref`): once an item is the tab stop, the tree element is not focusable. Because the tree
 * element can hold focus, give it an accessible name (`aria-label` or `aria-labelledby`).
 * @beta
 */
export function Tree(
  props: TreeProps &
    Omit<React.HTMLProps<HTMLUListElement>, 'align' | 'as' | 'height' | 'role' | 'wrap'>,
): React.JSX.Element {
  const {
    children,
    gap = 1,
    onBlur,
    onFocus,
    onMouseDown,
    ref: forwardedRef,
    tabIndex: tabIndexProp,
    ...restProps
  } = props
  const ref = useRef<HTMLUListElement | null>(null)
  const [focusedItem, setFocusedItem] = useState<FocusedItem | null>(null)
  // Whether the tree element itself has focus (a pointer press between the items left it there,
  // see `handleFocus`): set by its focus event and cleared by its blur event
  const [treeHasFocus, setTreeHasFocus] = useState(false)
  const path: string[] = useMemo(() => [], [])
  const [state, setState] = useState<TreeState>({})
  // Whether the focus event being handled was caused by a pointer press: set on `mousedown` and
  // cleared in the next task (see `handleMouseDown`), so `handleFocus` can tell a press on the
  // tree element itself (between the items) from keyboard focus
  const pointerDownRef = useRef(false)

  useImperativeHandle<HTMLUListElement | null, HTMLUListElement | null>(
    forwardedRef,
    () => ref.current,
  )

  // The key is read from the element here, at event (or effect) time, so that the tab stop can be
  // derived from `state` with a lookup during render
  const setFocusedElement = useCallback((element: HTMLElement | null) => {
    setFocusedItem(element ? {element, key: _getItemKey(element)} : null)
  }, [])

  const registerItem = useCallback(
    (element: HTMLElement, path: string, expanded: boolean, selected: boolean) => {
      setState((s) => ({...s, [path]: {element, expanded}}))

      // A `selected` item becomes the tab stop, unless it cannot take focus where it is (hidden
      // by the consumer, no focusable node): a tab stop sequential focus navigation skips would
      // take the tree out of the tab order. A collapsed ancestor does not count — `tabStop` holds
      // the item back until the ancestor expands. An item that re-registers under a new key (its
      // `id`, or an ancestor's, changed) keeps the tab stop, under that key.
      const claims = selected && _isItemFocusable(element, ref.current)

      setFocusedItem((prev) => {
        if (!claims && prev?.element !== element) return prev

        return prev?.element === element && prev.key === path ? prev : {element, key: path}
      })

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

  // The focused item is the tree's tab stop (roving tabindex) for as long as it is registered and
  // not inside a collapsed ancestor (sequential focus navigation skips hidden elements, so such an
  // item could not hold the tab stop). While there is none — before any item has been focused,
  // after the focused item unmounted, or while its ancestor is collapsed — the tree element takes
  // the tab stop and `handleFocus` passes keyboard focus on to the first item, resolved from the
  // DOM at that moment. That way no item order is kept in state: the first item follows the DOM,
  // also when items are added, removed or moved without being focused.
  //
  // The tree element also stays the tab stop for as long as it has focus itself. An item that
  // becomes eligible meanwhile (its collapsed ancestor was expanded from outside the tree) takes
  // over once the tree element loses focus: taking the `tabindex` off the focused tree element
  // would not move focus off it, and the keys would act on an item that does not have focus.
  const tabStop = useMemo(() => {
    if (treeHasFocus || !focusedItem || focusedItem.key === null) return null

    const {element, key} = focusedItem

    return state[key]?.element === element && _isItemKeyVisible(state, key) ? element : null
  }, [focusedItem, state, treeHasFocus])

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
    [gap, path, registerItem, setExpanded, setFocusedElement, state, tabStop],
  )

  // The item elements are read from the DOM when a key is pressed instead of being kept in state,
  // so the handler closes over the `state` and `tabStop` of the render it was created in; those
  // change exactly when the tree re-renders anyway
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLUListElement>) => {
      const treeElement = ref.current
      const target = event.target

      if (!treeElement) return

      // Keys typed into editable content inside an item (`text` is a `ReactNode`) move the caret,
      // not the focus
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))
      ) {
        return
      }

      // Moving focus is all a key does: the focus event (`handleFocus`) records the item that took
      // it. An item that cannot take focus right now (hidden by the consumer, a `linkAs` without a
      // focusable element) is skipped, so the tab stop never lands on an element without focus.
      const items = () => _getItemElements(treeElement)
      const first = () => _getItemCandidates(state, items(), 'next')
      const last = () => _getItemCandidates(state, items(), 'prev')

      if (!tabStop) {
        // The tree element itself has focus (a pointer press between the items left it there, see
        // `handleFocus`): the navigation keys enter the items at either end
        if (event.key === 'ArrowDown' || event.key === 'Home') {
          event.preventDefault()
          _focusFirstItemElement(first())
        } else if (event.key === 'ArrowUp' || event.key === 'End') {
          event.preventDefault()
          _focusFirstItemElement(last())
        }

        return
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        _focusFirstItemElement(_getItemCandidates(state, items(), 'next', tabStop))

        return
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        _focusFirstItemElement(_getItemCandidates(state, items(), 'prev', tabStop))

        return
      }

      if (event.key === 'Home') {
        event.preventDefault()
        _focusFirstItemElement(first())

        return
      }

      if (event.key === 'End') {
        event.preventDefault()
        _focusFirstItemElement(last())

        return
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()

        const itemKey = _getItemKey(tabStop)

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

          // The registered element of an item with an `href` is its non-focusable
          // `<li role="none">`; `_focusFirstItemElement` focuses the link inside it
          if (parentState) _focusFirstItemElement([parentState.element])
        }

        return
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()

        const focusedKey = _getItemKey(tabStop)

        if (!focusedKey) return

        if (!state[focusedKey]?.expanded) {
          setExpanded(focusedKey, true)
        }
      }
    },
    [setExpanded, state, tabStop],
  )

  const clearPointerDown = useCallback(() => {
    pointerDownRef.current = false
  }, [])

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLUListElement>) => {
      pointerDownRef.current = true
      // The focus a press moves is the default action of this `mousedown`: it is dispatched right
      // after the handlers, in the same task. Clearing the flag in the next task is therefore
      // after that focus and before any later keyboard focus, and does not depend on the button
      // being released over this document (or at all, when the window loses focus mid-press).
      // A press that moves focus nowhere leaves nothing behind. Should the tree unmount in
      // between, the timeout only writes a ref, so there is nothing to cancel.
      setTimeout(clearPointerDown, 0)
      onMouseDown?.(event)
    },
    [clearPointerDown, onMouseDown],
  )

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLUListElement>) => {
      const treeElement = event.currentTarget

      if (event.target === treeElement) {
        // The tree element is only focusable while no item is the tab stop (see `tabStop`).
        // Keyboard focus is passed on to the first item that takes it (an item the consumer hid
        // is skipped), which then reports its own focus here; a pointer press on the tree element
        // itself (between the items) leaves focus where it is.
        if (!pointerDownRef.current) _focusFirstItemElement(_getItemElements(treeElement))

        // Focus that stays on the tree element (after a pointer press, or with no item to pass it
        // on to) keeps the tab stop there (see `tabStop`), and is a focus transition the consumer
        // will see the `blur` of, so it is reported too
        if (_getActiveElement(treeElement) === treeElement) {
          setTreeHasFocus(true)
          onFocus?.(event)
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
    [onFocus, setFocusedElement],
  )

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLUListElement>) => {
      // `onBlur` is `focusout`, which also bubbles up from the items: only the tree element itself
      // losing focus frees the tab stop for the item that is remembered (see `tabStop`)
      if (event.target === event.currentTarget) setTreeHasFocus(false)

      onBlur?.(event)
    },
    [onBlur],
  )

  return (
    <TreeContext.Provider value={contextValue}>
      <Stack
        as="ul"
        data-ui="Tree"
        {...restProps}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        ref={ref}
        role="tree"
        gap={gap}
        // While an item is the tab stop the tree element is not focusable at all, so the tree
        // remains a single tab stop and a press between the items moves focus out of the tree, as
        // it always did; until then a `tabIndex` prop (e.g. `-1` to keep the tree out of the tab
        // order) wins over the default
        tabIndex={tabStop ? undefined : (tabIndexProp ?? 0)}
      >
        {children}
      </Stack>
    </TreeContext.Provider>
  )
}
