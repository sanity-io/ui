import React, {forwardRef, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import styled from 'styled-components'
import {useClickOutside, useGlobalKeyDown} from '../../hooks'
import {Box, Stack} from '../../primitives'
import {ResponsivePaddingProps} from '../../primitives/types'
import {useLayer} from '../../utils'
import {getFocusableElements} from './helpers'
import {MenuContext, MenuContextValue} from './menuContext'

interface MenuProps extends ResponsivePaddingProps {
  focusLast?: boolean
  onClickOutside?: (event: MouseEvent) => void
  onEscape?: () => void
  onItemClick?: () => void
  onItemSelect?: (index: number) => void
  space?: number | number[]
}

const Root = styled(Box)`
  outline: none;
  overflow: auto;
`

export const Menu = forwardRef(
  (props: MenuProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height'>, ref) => {
    const {
      children,
      focusLast,
      onClickOutside,
      onEscape,
      onItemClick,
      onItemSelect,
      padding = 1,
      space = 1,
      ...restProps
    } = props
    const {isTopLayer} = useLayer()
    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null)
    const itemsRef = useRef<HTMLElement[]>([])
    const [activeIndex, setActiveIndex] = useState(-1)
    const [activeElement, setActiveElement] = useState<HTMLElement | null>(null)
    const activeElementRef = useRef<HTMLElement | null>(activeElement)

    useEffect(() => {
      if (onItemSelect) onItemSelect(activeIndex)
    }, [activeIndex, onItemSelect])

    useEffect(() => {
      activeElementRef.current = activeElement
    }, [activeElement])

    useEffect(() => {
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
    }, [focusLast, rootElement])

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
      },
      [activeIndex]
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
      useCallback((event) => isTopLayer && onClickOutside && onClickOutside(event), [
        isTopLayer,
        onClickOutside,
      ]),
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

    const value: MenuContextValue = useMemo(
      () => ({
        version: 0.0,
        activeElement,
        activeIndex,
        mount,
        onMouseEnter: handleItemMouseEnter,
        onMouseLeave: handleItemMouseLeave,
        onItemClick,
      }),
      [activeElement, activeIndex, mount, handleItemMouseEnter, handleItemMouseLeave, onItemClick]
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
