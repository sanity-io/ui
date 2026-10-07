import {ChevronRightIcon} from '@sanity/icons/ChevronRight'
import {isValidElement, useCallback, useEffect, useState} from 'react'
import {isValidElementType} from 'react-is'

import {Selectable} from '../../primitives/_selectable/selectable'
import {Box} from '../../primitives/box/box'
import {Flex} from '../../primitives/flex/flex'
import {Popover, PopoverProps} from '../../primitives/popover/popover'
import {Text} from '../../primitives/text/text'
import {_getArrayProp} from '../../styles/helpers'
import {useRootTheme} from '../../theme/useRootTheme'
import {ElementType, Props} from '../../types/component'
import {Radius} from '../../types/radius'
import {SelectableTone} from '../../types/selectable'
import {Menu, MenuProps} from './menu'
import {useMenu} from './useMenu'

/**
 * @public
 */
export interface MenuGroupOwnProps {
  fontSize?: number | number[]
  // oxlint-disable-next-line no-redundant-type-constituents
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
  gap?: number | number[]
  /**
   * @deprecated Use `gap` instead.
   */
  space?: never
  text: React.ReactNode
  tone?: SelectableTone
}

/**
 * @public
 */
export type MenuGroupProps<E extends ElementType = 'button'> = Props<MenuGroupOwnProps, E>

const MenuGroupComponent = function MenuGroup(
  props: Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'popover' | 'ref' | 'tabIndex'> &
    MenuGroupOwnProps & {as?: ElementType},
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
    gap = 3,
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
  const onItemMouseEnter = _onItemMouseEnter ?? menu.onItemMouseEnter
  const [rootElement, setRootElement] = useState<HTMLButtonElement | HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)
  const [shouldFocus, setShouldFocus] = useState<'first' | 'last' | null>(null)
  const active = Boolean(activeElement) && activeElement === rootElement
  const [withinMenu, setWithinMenu] = useState(false)

  // Close the child menu when a sibling item becomes the controller's active element. `open` is
  // reset as well, or re-activating this item from the keyboard (the controller sets
  // `activeElement`, nothing happens on this component) would show a child menu that the user
  // never reopened. The reset happens during render, so the close lands in the same commit as the
  // activation that caused it.
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [prevActive, setPrevActive] = useState(active)

  if (active !== prevActive) {
    setPrevActive(active)
    if (!active) setOpen(false)
  }

  const childMenuOpen = open && active
  // Pressed while the child menu is open and the pointer (or, after `ArrowRight`, the focus) is
  // within it. Derived from `childMenuOpen` so that `withinMenu` needs no reset when the child
  // menu closes; every path that opens it sets `withinMenu` for that session.
  const pressed = childMenuOpen && withinMenu

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

      setWithinMenu(false)
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

  // Reset the shouldFocus state after it has been used
  useEffect(() => {
    if (!shouldFocus) return
    // The useMenuController effect that handles `shouldFocus` schedules a request animation frame where it's processed.
    // By doing the same here, we ensure that the reset is processed after the focus change.
    const rafId = requestAnimationFrame(() => setShouldFocus(null))

    // oxlint-disable-next-line consistent-return
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
    <Popover {...popover} content={childMenu} data-ui="MenuGroup__popover" open={childMenuOpen}>
      <Selectable
        data-as={as}
        data-ui="MenuGroup"
        forwardedAs={as}
        {...restProps}
        aria-pressed={as === 'button' ? pressed : undefined}
        data-pressed={as !== 'button' ? pressed : undefined}
        data-selected={!pressed && active ? '' : undefined}
        $radius={_getArrayProp(radius)}
        $tone={tone}
        $scheme={scheme}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        ref={setRootElement}
        tabIndex={-1}
        type={as === 'button' ? 'button' : undefined}
      >
        <Flex gap={gap} padding={padding}>
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

/**
 * @public
 */
export const MenuGroup: <E extends ElementType = 'button'>(
  props: MenuGroupProps<E>,
) => React.JSX.Element = MenuGroupComponent
