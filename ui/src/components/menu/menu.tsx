import React, {forwardRef, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import styled from 'styled-components'
import {useClickOutside, useGlobalKeyDown} from '../../hooks'
import {Box, Stack} from '../../primitives'
import {ResponsivePaddingProps} from '../../primitives/types'
import {useLayer} from '../../utils'
import {getFocusableElements} from './helpers'
import {MenuContext, MenuContextValue} from './menuContext'

export interface MenuProps extends ResponsivePaddingProps {
  focusFirst?: boolean
  focusLast?: boolean
  onClickOutside?: (event: MouseEvent) => void
  onEscape?: () => void
  onItemClick?: () => void
  onItemSelect?: (index: number) => void
  registerElement?: (el: HTMLElement) => () => void
  space?: number | number[]
}

const Root = styled(Box)`
  outline: none;
  overflow: auto;
`

export const Menu = forwardRef(
  (
    props: MenuProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'role' | 'tabIndex'>,
    ref
  ) => {
    const {
      children,
      focusFirst = true,
      focusLast,
      onClickOutside,
      onEscape,
      onItemClick,
      onItemSelect,
      onKeyDown,
      padding = 1,
      registerElement,
      space = 1,
      ...restProps
    } = props
    const {isTopLayer} = useLayer()
    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null)
    const itemsRef = useRef<HTMLElement[]>([])
    const [activeIndex, setActiveIndex] = useState(-1)
    const [activeElement, setActiveElement] = useState<HTMLElement | null>(null)
    const activeElementRef = useRef<HTMLElement | null>(activeElement)

    // Trigger `onItemSelect` when active index changes
    useEffect(() => {
      if (onItemSelect) onItemSelect(activeIndex)
    }, [activeIndex, onItemSelect])

    // Update active element
    useEffect(() => {
      activeElementRef.current = activeElement
    }, [activeElement])

    // Auto-focus item after render
    useEffect(() => {
      const doFocus = focusFirst || focusLast

      if (!doFocus) return

      const rafId = window.requestAnimationFrame(() => {
        if (rootElement) {
          if (activeElementRef.current) {
            activeElementRef.current.focus()
            setActiveIndex(itemsRef.current.indexOf(activeElementRef.current))

            return
          }

          const element = itemsRef.current[focusLast ? itemsRef.current.length - 1 : 0]

          if (element) {
            element.focus()
            setActiveIndex(itemsRef.current.indexOf(element))
          }
        }
      })

      return () => {
        window.cancelAnimationFrame(rafId)
      }
    }, [focusFirst, focusLast, rootElement])

    const setRef = useCallback(
      (el: HTMLDivElement | null) => {
        setRootElement(el)
        if (typeof ref === 'function') ref(el)
        else if (ref) ref.current = el
      },
      [ref]
    )

    const mount = useCallback((element: HTMLElement | null, selected?: boolean) => {
      if (!element) return () => undefined

      if (!itemsRef.current.includes(element)) {
        itemsRef.current.push(element)
      }

      if (selected === true) {
        setActiveElement(element)
      }

      return () => {
        const idx = itemsRef.current.push(element)

        if (idx > -1) {
          itemsRef.current.splice(idx, 1)
        }
      }
    }, [])

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowUp') {
          event.preventDefault()
          event.stopPropagation()

          const focusableElements = getFocusableElements(itemsRef.current)
          const focusableLen = focusableElements.filter(({focusable}) => focusable).length

          if (focusableLen === 0) return

          const len = focusableElements.length

          let currentIndex = activeIndex
          let focusable = false
          let element: HTMLElement | null = null

          while (!focusable) {
            currentIndex = (currentIndex - 1 + len) % len
            element = focusableElements[currentIndex].element
            focusable = focusableElements[currentIndex].focusable
          }

          setActiveIndex(currentIndex)

          if (element) element.focus()

          return
        }

        if (event.key === 'ArrowDown') {
          event.preventDefault()
          event.stopPropagation()

          const focusableElements = getFocusableElements(itemsRef.current)
          const focusableLen = focusableElements.filter(({focusable}) => focusable).length

          if (focusableLen === 0) return

          const len = focusableElements.length

          let currentIndex = activeIndex
          let focusable = false
          let element: HTMLElement | null = null

          while (!focusable) {
            currentIndex = (currentIndex + 1) % len
            element = focusableElements[currentIndex].element
            focusable = focusableElements[currentIndex].focusable
          }

          setActiveIndex(currentIndex)

          if (element) element.focus()

          return
        }

        if (onKeyDown) {
          onKeyDown(event)
        }
      },
      [activeIndex, onKeyDown]
    )

    const handleItemMouseEnter = useCallback((event: React.MouseEvent<HTMLElement>) => {
      const element = event.currentTarget

      setActiveIndex(itemsRef.current.indexOf(element))

      element.focus()
    }, [])

    const handleItemMouseLeave = useCallback(() => {
      setActiveIndex(-1)
      rootElement?.focus()
    }, [rootElement])

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
  }
)

Menu.displayName = 'Menu'
