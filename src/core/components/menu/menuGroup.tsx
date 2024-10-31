import {ChevronRightIcon} from '@sanity/icons'
import {GapStyleProps, ResponsiveProp} from '@sanity/ui/css'
import {FontTextSize, Space} from '@sanity/ui/theme'
import {
  ElementType,
  isValidElement,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import {isValidElementType} from 'react-is'

import {Box, Flex, Popover, PopoverProps, Text} from '../../primitives'
import {Selectable} from '../../primitives/_selectable'
import {Props, Radius, SelectableTone} from '../../types'
import {Menu, MenuProps} from './menu'
import {useMenu} from './useMenu'

/**
 * @public
 */
export interface MenuGroupProps extends GapStyleProps {
  disabled?: boolean
  fontSize?: ResponsiveProp<FontTextSize>
  icon?: ElementType | ReactNode
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
  padding?: ResponsiveProp<Space>
  popover?: Omit<PopoverProps, 'content' | 'open'>
  radius?: Radius | Radius[]
  /** @deprecated Use `gap` instead. */
  space?: ResponsiveProp<Space>
  text: ReactNode
  tone?: SelectableTone
}

/**
 * @public
 */
export function MenuGroup(props: Props<MenuGroupProps, 'div'>): ReactElement {
  const {
    as = 'button',
    children,
    fontSize = 1,
    gap,
    gapX,
    gapY,
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
    (event: MouseEvent<HTMLElement>) => {
      setWithinMenu(false)
      onItemMouseEnter(event)
      setOpen(true)
    },
    [onItemMouseEnter],
  )

  const handleMenuKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
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
    (event: MouseEvent<HTMLDivElement>) => {
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
    if (!active) setOpen(false)
  }, [active])

  // Update state when child menu is no longer open
  useEffect(() => {
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

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
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
        // data-as={as}
        data-ui="MenuGroup"
        // forwardedAs={as}
        {...restProps}
        aria-pressed={as === 'button' ? withinMenu : undefined}
        as={as}
        data-pressed={as !== 'button' ? withinMenu : undefined}
        data-selected={!withinMenu && active ? '' : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        radius={radius}
        ref={setRootElement}
        tabIndex={-1}
        tone={tone}
        type={as === 'button' ? 'button' : undefined}
      >
        <Flex gap={gap ?? space} gapX={gapX} gapY={gapY} padding={padding}>
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
