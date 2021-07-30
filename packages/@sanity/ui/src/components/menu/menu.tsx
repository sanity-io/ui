import React, {forwardRef, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import styled from 'styled-components'
import {useClickOutside, useGlobalKeyDown} from '../../hooks'
import {Box, Stack} from '../../primitives'
import {ResponsivePaddingProps} from '../../primitives/types'
import {useLayer} from '../../utils'
import {_getFocusableElements, _sortElements} from './helpers'
import {MenuContext, MenuContextValue} from './menuContext'

/**
 * @public
 */
export interface MenuProps extends ResponsivePaddingProps {
  /**
   * @deprecated Use `shouldFocus="first"` instead.
   */
  focusFirst?: boolean
  /**
   * @deprecated Use `shouldFocus="last"` instead.
   */
  focusLast?: boolean
  onClickOutside?: (event: MouseEvent) => void
  onEscape?: () => void
  onItemClick?: () => void
  onItemSelect?: (index: number) => void
  originElement?: HTMLElement | null
  registerElement?: (el: HTMLElement) => () => void
  shouldFocus?: 'first' | 'last' | null
  space?: number | number[]
}

const Root = styled(Box)`
  outline: none;
  overflow: auto;
`

/**
 * @public
 */
export const Menu = forwardRef(function Menu(
  props: MenuProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'role' | 'tabIndex'>,
  ref
) {
  const {
    children,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    focusFirst,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    focusLast,
    onClickOutside,
    onEscape,
    onItemClick,
    onItemSelect,
    onKeyDown,
    originElement,
    padding = 1,
    registerElement,
    shouldFocus = (props.focusFirst && 'first') || (props.focusLast && 'last') || null,
    space = 1,
    ...restProps
  } = props

  const {isTopLayer} = useLayer()
  const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null)
  const elementsRef = useRef<HTMLElement[]>([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const activeIndexRef = useRef(activeIndex)
  const activeElement = elementsRef.current[activeIndex] || null
  const activeElementRef = useRef<HTMLElement | null>(activeElement)
  const mounted = Boolean(rootElement)

  const setRef = useCallback(
    (el: HTMLDivElement | null) => {
      setRootElement(el)
      if (typeof ref === 'function') ref(el)
      else if (ref) ref.current = el
    },
    [ref]
  )

  const mount = useCallback(
    (element: HTMLElement | null, selected?: boolean): (() => void) => {
      if (!element) return () => undefined

      if (elementsRef.current.indexOf(element) === -1) {
        elementsRef.current.push(element)
        _sortElements(rootElement, elementsRef.current)
      }

      if (selected) {
        const selectedIndex = elementsRef.current.indexOf(element)

        setActiveIndex(selectedIndex)
        activeIndexRef.current = selectedIndex
      }

      return () => {
        const idx = elementsRef.current.indexOf(element)

        if (idx > -1) {
          elementsRef.current.splice(idx, 1)
        }
      }
    },
    [rootElement]
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
        activeIndexRef.current = currentIndex

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
        activeIndexRef.current = currentIndex

        return
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        event.stopPropagation()

        const focusableElements = _getFocusableElements(elementsRef.current)
        const focusableLen = focusableElements.length

        if (focusableLen === 0) return

        const focusedElement = elementsRef.current[activeIndex]

        let focusedIndex = focusableElements.indexOf(focusedElement)

        focusedIndex = (focusedIndex - 1 + focusableLen) % focusableLen

        const el = focusableElements[focusedIndex]
        const currentIndex = elementsRef.current.indexOf(el)

        setActiveIndex(currentIndex)
        activeIndexRef.current = currentIndex

        return
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        event.stopPropagation()

        const focusableElements = _getFocusableElements(elementsRef.current)
        const focusableLen = focusableElements.length

        if (focusableLen === 0) return

        const focusedElement = elementsRef.current[activeIndex]

        let focusedIndex = focusableElements.indexOf(focusedElement)

        focusedIndex = (focusedIndex + 1) % focusableLen

        const el = focusableElements[focusedIndex]
        const currentIndex = elementsRef.current.indexOf(el)

        setActiveIndex(currentIndex)
        activeIndexRef.current = currentIndex

        return
      }

      if (onKeyDown) {
        onKeyDown(event)
      }
    },
    [activeIndex, onKeyDown, originElement]
  )

  const handleItemMouseEnter = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const element = event.currentTarget
    const currentIndex = elementsRef.current.indexOf(element)

    setActiveIndex(currentIndex)
    activeIndexRef.current = currentIndex
  }, [])

  const handleItemMouseLeave = useCallback(() => {
    rootElement?.focus()
    setActiveIndex(-1)
    activeIndexRef.current = -1
  }, [rootElement])

  // Trigger `onItemSelect` when active index changes
  useEffect(() => {
    if (onItemSelect) onItemSelect(activeIndex)
  }, [activeIndex, onItemSelect])

  useEffect(() => {
    activeElementRef.current = activeElement
  }, [activeElement])

  // Set focus on the currently active element
  useEffect(() => {
    if (!mounted) return

    const rafId = window.requestAnimationFrame(() => {
      const _activeIndex = activeIndexRef.current

      if (_activeIndex === -1) {
        if (shouldFocus === 'first') {
          const focusableElements = _getFocusableElements(elementsRef.current)
          const el = focusableElements[0]

          if (el) {
            const currentIndex = elementsRef.current.indexOf(el)

            setActiveIndex(currentIndex)
            activeIndexRef.current = currentIndex
          }
        }

        if (shouldFocus === 'last') {
          const focusableElements = _getFocusableElements(elementsRef.current)
          const el = focusableElements[focusableElements.length - 1]

          if (el) {
            const currentIndex = elementsRef.current.indexOf(el)

            setActiveIndex(currentIndex)
            activeIndexRef.current = currentIndex
          }
        }

        return
      }

      const element = elementsRef.current[_activeIndex] || null

      element?.focus()
    })

    return () => {
      window.cancelAnimationFrame(rafId)
    }
  }, [activeIndex, mounted, shouldFocus])

  useClickOutside(
    useCallback(
      (event) => isTopLayer && onClickOutside && onClickOutside(event),
      [isTopLayer, onClickOutside]
    ),
    [rootElement]
  )

  useGlobalKeyDown(
    useCallback(
      (event) => {
        if (!isTopLayer) return

        if (event.key === 'Escape') {
          event.stopPropagation()
          if (onEscape) onEscape()
        }
      },
      [isTopLayer, onEscape]
    )
  )

  useEffect(() => {
    if (!rootElement || !registerElement) return

    return registerElement(rootElement)
  }, [registerElement, rootElement])

  const value: MenuContextValue = useMemo(
    () => ({
      version: 0.0,
      activeElement,
      activeIndex,
      mount,
      onClickOutside,
      onEscape,
      onMouseEnter: handleItemMouseEnter,
      onMouseLeave: handleItemMouseLeave,
      onItemClick,
      registerElement,
    }),
    [
      activeElement,
      activeIndex,
      mount,
      handleItemMouseEnter,
      handleItemMouseLeave,
      onClickOutside,
      onEscape,
      onItemClick,
      registerElement,
    ]
  )

  return (
    <MenuContext.Provider value={value}>
      <Root
        data-ui="Menu"
        {...restProps}
        onKeyDown={handleKeyDown}
        padding={padding}
        ref={setRef}
        role="menu"
        tabIndex={-1}
      >
        <Stack space={space}>{children}</Stack>
      </Root>
    </MenuContext.Provider>
  )
})
