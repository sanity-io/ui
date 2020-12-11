import React, {forwardRef, useCallback, useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import {focusFirstDescendant, focusLastDescendant, isHTMLButtonElement} from '../../helpers'
import {useClickOutside, useGlobalKeyDown} from '../../hooks'
import {Box, Stack} from '../../primitives'
import {ResponsivePaddingStyleProps} from '../../styles/internal'
import {useLayer} from '../../utils'
import {MenuContext} from './menuContext'

interface MenuProps extends ResponsivePaddingStyleProps {
  focusLast?: boolean
  onClickOutside?: () => void
  onEscape?: () => void
  onItemClick?: () => void
  space?: number | number[]
}

const Root = styled(Box)`
  outline: none;
`

export const Menu = forwardRef(
  (props: MenuProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height'>, ref) => {
    const {
      children,
      focusLast,
      onClickOutside,
      onEscape,
      onItemClick,
      padding = 1,
      space = 1,
      ...restProps
    } = props
    const {isTopLayer} = useLayer()
    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null)
    const itemsRef = useRef<HTMLElement[]>([])
    const [activeIndex, setActiveIndex] = useState(-1)

    useEffect(() => {
      if (rootElement) {
        if (focusLast) {
          if (focusLastDescendant(rootElement)) {
            setActiveIndex(itemsRef.current.indexOf(document.activeElement as HTMLElement))
          }
        } else {
          if (focusFirstDescendant(rootElement)) {
            setActiveIndex(itemsRef.current.indexOf(document.activeElement as HTMLElement))
          }
        }
      }
    }, [focusLast, rootElement])

    const setRef = (el: HTMLDivElement | null) => {
      setRootElement(el)
      if (typeof ref === 'function') ref(el)
      else if (ref) ref.current = el
    }

    const mount = useCallback((element: HTMLElement | null) => {
      if (!element) return () => undefined

      if (!itemsRef.current.includes(element)) {
        itemsRef.current.push(element)
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

          // NOTE: if all menu items are :disabled, this will cause an infinite loop
          // @todo: make sure that not all menu items are disabled

          const len = itemsRef.current.length

          let currentIndex = activeIndex
          let element: HTMLElement | null = null

          while (!element) {
            currentIndex = (currentIndex - 1 + len) % len

            const e = itemsRef.current[currentIndex]

            if (isHTMLButtonElement(e) && !e.disabled) {
              element = itemsRef.current[currentIndex]
            }
          }

          setActiveIndex(currentIndex)

          if (element) element.focus()

          return
        }

        if (event.key === 'ArrowDown') {
          event.preventDefault()

          // NOTE: if all menu items are :disabled, this will cause an infinite loop
          // @todo: make sure that not all menu items are disabled

          const len = itemsRef.current.length

          let currentIndex = activeIndex
          let element: HTMLElement | null = null

          while (!element) {
            currentIndex = (currentIndex + 1) % len

            const e = itemsRef.current[currentIndex]

            if (isHTMLButtonElement(e) && !e.disabled) {
              element = itemsRef.current[currentIndex]
            }
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
      useCallback(() => isTopLayer && onClickOutside && onClickOutside(), [
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

    return (
      <MenuContext.Provider
        value={{
          activeIndex,
          mount,
          onMouseEnter: handleItemMouseEnter,
          onMouseLeave: handleItemMouseLeave,
          onItemClick,
        }}
      >
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
