import {useCallback, useEffect, useMemo, useRef, useState} from 'react'

import {_getFocusableElements, _sortElements} from './helpers'

/**
 * @internal
 */
export interface MenuController {
  activeElement: HTMLElement | null
  activeIndex: number
  handleItemMouseEnter: (event: React.MouseEvent<HTMLElement>) => void
  handleItemMouseLeave: () => void
  handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void
  mount: (element: HTMLElement | null, selected?: boolean) => () => void
}

/**
 * This controller is responsible for controlling UI menu state.
 *
 * @internal
 */
export function useMenuController(props: {
  onKeyDown?: React.KeyboardEventHandler
  originElement?: HTMLElement | null
  shouldFocus: 'first' | 'last' | null
  rootElementRef: React.MutableRefObject<HTMLDivElement | null>
}): MenuController {
  const {onKeyDown, originElement, shouldFocus, rootElementRef} = props
  const elementsRef = useRef<HTMLElement[]>([])
  const [activeIndex, _setActiveIndex] = useState(-1)
  const activeIndexRef = useRef(activeIndex)
  // eslint-disable-next-line react-hooks/refs
  const activeElement = useMemo(() => elementsRef.current[activeIndex] || null, [activeIndex])
  // eslint-disable-next-line react-hooks/refs
  const mounted = Boolean(rootElementRef.current)

  const setActiveIndex = useCallback((nextActiveIndex: number) => {
    _setActiveIndex(nextActiveIndex)
    activeIndexRef.current = nextActiveIndex
  }, [])

  const mount = useCallback(
    (element: HTMLElement | null, selected?: boolean): (() => void) => {
      if (!element) return () => undefined

      if (elementsRef.current.indexOf(element) === -1) {
        elementsRef.current.push(element)
        _sortElements(rootElementRef.current, elementsRef.current)
      }

      if (selected) {
        const selectedIndex = elementsRef.current.indexOf(element)

        setActiveIndex(selectedIndex)
      }

      return () => {
        const idx = elementsRef.current.indexOf(element)

        if (idx > -1) {
          elementsRef.current.splice(idx, 1)
        }
      }
    },
    [rootElementRef, setActiveIndex],
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      // Move focus to the element that opened the menu before handling the `Tab` press
      if (event.key === 'Tab') {
        if (originElement) {
          originElement.focus()
        }

        return
      }

      // Move focus to the first focusable menuitem
      if (event.key === 'Home') {
        event.preventDefault()
        event.stopPropagation()

        const focusableElements = _getFocusableElements(elementsRef.current)
        const el = focusableElements[0]

        if (!el) return

        const currentIndex = elementsRef.current.indexOf(el)

        setActiveIndex(currentIndex)

        return
      }

      // Move focus to the last focusable menuitem
      if (event.key === 'End') {
        event.preventDefault()
        event.stopPropagation()

        const focusableElements = _getFocusableElements(elementsRef.current)
        const el = focusableElements[focusableElements.length - 1]

        if (!el) return

        const currentIndex = elementsRef.current.indexOf(el)

        setActiveIndex(currentIndex)

        return
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        event.stopPropagation()

        const focusableElements = _getFocusableElements(elementsRef.current)
        const focusableLen = focusableElements.length

        if (focusableLen === 0) return

        const focusedElement = elementsRef.current[activeIndexRef.current]

        let focusedIndex = focusableElements.indexOf(focusedElement)

        focusedIndex = (focusedIndex - 1 + focusableLen) % focusableLen

        const el = focusableElements[focusedIndex]
        const currentIndex = elementsRef.current.indexOf(el)

        setActiveIndex(currentIndex)

        return
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        event.stopPropagation()

        const focusableElements = _getFocusableElements(elementsRef.current)
        const focusableLen = focusableElements.length

        if (focusableLen === 0) return

        const focusedElement = elementsRef.current[activeIndexRef.current]

        let focusedIndex = focusableElements.indexOf(focusedElement)

        focusedIndex = (focusedIndex + 1) % focusableLen

        const el = focusableElements[focusedIndex]
        const currentIndex = elementsRef.current.indexOf(el)

        setActiveIndex(currentIndex)

        return
      }

      if (onKeyDown) {
        onKeyDown(event)
      }
    },
    [onKeyDown, originElement, setActiveIndex],
  )

  const handleItemMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const element = event.currentTarget
      const currentIndex = elementsRef.current.indexOf(element)

      setActiveIndex(currentIndex)
    },
    [setActiveIndex],
  )

  const handleItemMouseLeave = useCallback(() => {
    // Set the active index to -2 to deactivate all menu items
    // when the user moves the mouse away from the menu item.
    // We avoid using -1 because it would focus the first menu item,
    // which would be incorrect when the user hovers over a gap
    // between two menu items or a menu divider.
    setActiveIndex(-2)
    rootElementRef.current?.focus()
  }, [rootElementRef, setActiveIndex])

  // Set focus on the currently active element
  useEffect(() => {
    if (!mounted) return

    const rafId = requestAnimationFrame(() => {
      if (activeIndex === -1) {
        if (shouldFocus === 'first') {
          const focusableElements = _getFocusableElements(elementsRef.current)
          const el = focusableElements[0]

          if (el) {
            const currentIndex = elementsRef.current.indexOf(el)

            setActiveIndex(currentIndex)
          }
        }

        if (shouldFocus === 'last') {
          const focusableElements = _getFocusableElements(elementsRef.current)
          const el = focusableElements[focusableElements.length - 1]

          if (el) {
            const currentIndex = elementsRef.current.indexOf(el)

            setActiveIndex(currentIndex)
          }
        }

        return
      }

      const element = elementsRef.current[activeIndex] || null

      element?.focus()
    })

    return () => cancelAnimationFrame(rafId)
  }, [activeIndex, mounted, setActiveIndex, shouldFocus])

  // eslint-disable-next-line react-hooks/refs
  return {
    // eslint-disable-next-line react-hooks/refs
    activeElement,
    activeIndex,
    handleItemMouseEnter,
    handleItemMouseLeave,
    handleKeyDown,
    mount,
  }
}
