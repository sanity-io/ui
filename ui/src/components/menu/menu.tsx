import React, {forwardRef, useCallback, useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import {Box} from '../../atoms'
import {focusFirstDescendant, focusLastDescendant} from '../../helpers'
import {useClickOutside, useGlobalKeyDown} from '../../hooks'
import {useLayer} from '../../utils'
import {MenuContext} from './menuContext'

interface MenuProps {
  focusLast?: boolean
  onClickOutside?: () => void
  onEscape?: () => void
  onItemClick?: () => void
}

const Root = styled(Box)`
  display: flex;
  flex-direction: column;
  outline: none;
`

export const Menu = forwardRef(
  (props: MenuProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height'>, ref) => {
    const {children, focusLast, onClickOutside, onEscape, onItemClick, ...restProps} = props
    const {isTopLayer} = useLayer()
    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null)
    const itemsRef = useRef<HTMLButtonElement[]>([])
    const [activeIndex, setActiveIndex] = useState(-1)

    useEffect(() => {
      if (rootElement) {
        if (focusLast) {
          if (focusLastDescendant(rootElement)) {
            setActiveIndex(itemsRef.current.indexOf(document.activeElement as HTMLButtonElement))
          }
        } else {
          if (focusFirstDescendant(rootElement)) {
            setActiveIndex(itemsRef.current.indexOf(document.activeElement as HTMLButtonElement))
          }
        }
      }
    }, [focusLast, rootElement])

    const setRef = (el: HTMLDivElement | null) => {
      setRootElement(el)
      if (typeof ref === 'function') ref(el)
      else if (ref) ref.current = el
    }

    const mount = useCallback((element: HTMLButtonElement | null) => {
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

          const nextIndex = (activeIndex + itemsRef.current.length - 1) % itemsRef.current.length
          const element = itemsRef.current[nextIndex]

          setActiveIndex(nextIndex)

          if (element) element.focus()

          return
        }

        if (event.key === 'ArrowDown') {
          event.preventDefault()

          const nextIndex = (activeIndex + 1) % itemsRef.current.length
          const element = itemsRef.current[nextIndex]

          setActiveIndex(nextIndex)

          if (element) element.focus()

          return
        }
      },
      [activeIndex]
    )

    const handleItemMouseEnter = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
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
          paddingY={1}
          ref={setRef}
          role="menu"
          tabIndex={-1}
        >
          {children}
        </Root>
      </MenuContext.Provider>
    )
  }
)

Menu.displayName = 'Menu'
