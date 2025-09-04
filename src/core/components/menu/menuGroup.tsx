import {ChevronRightIcon} from '@sanity/icons'
import {isValidElement, useCallback, useEffect, useState} from 'react'
import {isValidElementType} from 'react-is'

import {useArrayProp} from '../../hooks'
import {Box, Flex, Popover, PopoverProps, Text} from '../../primitives'
import {Selectable} from '../../primitives/_selectable'
import {useRootTheme} from '../../theme'
import {Radius, SelectableTone} from '../../types'
import {Menu, MenuProps} from './menu'
import {useMenu} from './useMenu'

/**
 * @public
 */
export interface MenuGroupProps {
  as?: React.ElementType | keyof React.JSX.IntrinsicElements
  fontSize?: number | number[]
  icon?: React.ElementType | React.ReactNode
  menu?: Omit<
    MenuProps,
    | 'onClickOutside'
    | 'onEscape'
    | 'onItemClick'
    | 'onKeyDown'
    | 'onMouseEnter'
    | 'registerElement'
    | 'shouldFocus'
    | 'onBlurCapture'
  >
  padding?: number | number[]
  popover?: Omit<PopoverProps, 'content' | 'open'>
  radius?: Radius | Radius[]
  space?: number | number[]
  text: React.ReactNode
  tone?: SelectableTone
}

/**
 * @public
 */
export function MenuGroup(
  props: Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'popover' | 'ref' | 'tabIndex'> &
    MenuGroupProps,
): React.JSX.Element {
  const {
    as = 'button',
    children,
    fontSize = 1,
    icon: IconComponent,
    menu: menuProps,
    onClick,
    padding = 3,
    popover,
    radius = 2,
    space = 3,
    text,
    tone = 'default',
    ...restProps
  } = props
  const menu = useMenu()
  const {scheme} = useRootTheme()
  const {
    activeElement,
    mount,
    onClickOutside,
    onEscape,
    onItemClick,
    onItemMouseEnter: _onItemMouseEnter,
    registerElement,
  } = menu
  const onItemMouseEnter = _onItemMouseEnter ?? menu.onMouseEnter
  const [rootElement, setRootElement] = useState<HTMLButtonElement | HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)
  const [shouldFocus, setShouldFocus] = useState<'first' | 'last' | null>(null)
  const active = Boolean(activeElement) && activeElement === rootElement
  const [withinMenu, setWithinMenu] = useState(false)

  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setWithinMenu(false)
      onItemMouseEnter(event)
      setOpen(true)
    },
    [onItemMouseEnter],
  )

  const handleMenuKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.stopPropagation()

        setOpen(false)

        requestAnimationFrame(() => {
          rootElement?.focus()
        })
      }
    },
    [rootElement],
  )

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(event)

      setShouldFocus('first')
      setOpen(true)
    },
    [onClick],
  )

  const handleChildItemClick = useCallback(() => {
    setOpen(false)
    onItemClick?.()
  }, [onItemClick])

  const handleMenuMouseEnter = useCallback(() => setWithinMenu(true), [])

  // Register the menu item element
  useEffect(() => mount(rootElement), [mount, rootElement])

  // Close child menu when a sibling item becomes active
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!active) setOpen(false)
  }, [active])

  // Update state when child menu is no longer open
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!open) setWithinMenu(false)
  }, [open])

  // Reset the shouldFocus state after it has been used
  useEffect(() => {
    if (!shouldFocus) return
    // The useMenuController effect that handles `shouldFocus` schedules a request animation frame where it's processed.
    // By doing the same here, we ensure that the reset is processed after the focus change.
    const rafId = requestAnimationFrame(() => setShouldFocus(null))

    return () => cancelAnimationFrame(rafId)
  }, [shouldFocus])

  const childMenu = (
    <Menu
      {...menuProps}
      onClickOutside={onClickOutside}
      onEscape={onEscape}
      onItemClick={handleChildItemClick}
      onKeyDown={handleMenuKeyDown}
      onMouseEnter={handleMenuMouseEnter}
      registerElement={registerElement}
      shouldFocus={shouldFocus}
    >
      {children}
    </Menu>
  )

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    const target = event.currentTarget

    if (document.activeElement !== target) {
      return
    }

    if (event.key === 'ArrowRight') {
      setShouldFocus('first')
      setOpen(true)
      setWithinMenu(true)

      return
    }
  }, [])

  return (
    <Popover {...popover} content={childMenu} data-ui="MenuGroup__popover" open={open}>
      <Selectable
        data-as={as}
        data-ui="MenuGroup"
        forwardedAs={as}
        {...restProps}
        aria-pressed={as === 'button' ? withinMenu : undefined}
        data-pressed={as !== 'button' ? withinMenu : undefined}
        data-selected={!withinMenu && active ? '' : undefined}
        $radius={useArrayProp(radius)}
        $tone={tone}
        $scheme={scheme}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        ref={setRootElement}
        tabIndex={-1}
        type={as === 'button' ? 'button' : undefined}
      >
        <Flex gap={space} padding={padding}>
          {IconComponent && (
            <Text size={fontSize}>
              {isValidElement(IconComponent) && IconComponent}
              {isValidElementType(IconComponent) && <IconComponent />}
            </Text>
          )}

          <Box flex={1}>
            <Text size={fontSize} textOverflow="ellipsis" weight="medium">
              {text}
            </Text>
          </Box>

          <Text size={fontSize}>
            <ChevronRightIcon />
          </Text>
        </Flex>
      </Selectable>
    </Popover>
  )
}

MenuGroup.displayName = 'MenuGroup'
