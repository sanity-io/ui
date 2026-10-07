import {ChevronRightIcon} from '@sanity/icons/ChevronRight'
import {isValidElement, startTransition, useCallback, useEffect, useState} from 'react'
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
  // Numbers the activations of this item (the periods in which it is the controller's active
  // element); `openedIn` is the activation during which the child menu was last opened
  const [activation, setActivation] = useState(0)
  const [openedIn, setOpenedIn] = useState<number | null>(null)
  const [shouldFocus, setShouldFocus] = useState<'first' | 'last' | null>(null)
  const active = Boolean(activeElement) && activeElement === rootElement
  const [withinMenu, setWithinMenu] = useState(false)

  // When a sibling item becomes the controller's active element, this item's activation ends and
  // the next one is numbered, which closes a child menu opened during it. Just hiding the child
  // menu while inactive would not do: re-activating this item from the keyboard (the controller
  // sets `activeElement`, nothing happens on this component) would show a child menu that the
  // user never reopened. The end of the activation is recorded during render, so the close lands
  // in the same commit as the activation that caused it.
  //
  // It is recorded in `activation`, which only this render-phase update writes, rather than by
  // resetting `openedIn`, which the handlers below write in transitions. React applies a
  // render-phase update on top of the state of the render in progress and does not rebase it
  // over a lower-priority update that this render skipped; a reset of `openedIn` would be lost
  // while an opening transition is still pending (its render suspended on the child menu's
  // content, say), and that open would then apply after the item stopped being active. The
  // priority of the close is that of the activation, so unlike the handlers below this update
  // cannot be made a transition.
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [prevActive, setPrevActive] = useState(active)

  if (active !== prevActive) {
    setPrevActive(active)
    if (!active) setActivation((current) => current + 1)
  }

  const childMenuOpen = active && openedIn === activation
  // Pressed while the child menu is open and the pointer (or, after `ArrowRight`, the focus) is
  // within it. Derived from `childMenuOpen` so that `withinMenu` needs no reset when the child
  // menu closes; every path that opens it sets `withinMenu` for that session.
  const pressed = childMenuOpen && withinMenu

  // Opening and closing the child menu are transitions, so that they do not interrupt a
  // pre-render of the closed popover (the hidden `<Activity>` in `Popover`, rendered on intent in
  // a transition) and yield to more urgent input. The state that is set together with `openedIn`
  // (`withinMenu` for the pressed state, `shouldFocus` for the child menu's initial focus) goes
  // into the same transition so that it commits together with it, as it did when the three were
  // set synchronously: `shouldFocus` in particular is reset by an animation frame after its
  // commit, which must not come before the commit that reveals the child menu. The controller's
  // activation of the item (`onItemMouseEnter`) and the consumer callbacks stay urgent.
  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      onItemMouseEnter(event)

      startTransition(() => {
        setWithinMenu(false)
        setOpenedIn(activation)
      })
    },
    [activation, onItemMouseEnter],
  )

  const handleMenuKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.stopPropagation()

        startTransition(() => setOpenedIn(null))

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

      startTransition(() => {
        setWithinMenu(false)
        setShouldFocus('first')
        setOpenedIn(activation)
      })
    },
    [activation, onClick],
  )

  const handleChildItemClick = useCallback(() => {
    startTransition(() => setOpenedIn(null))
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

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const target = event.currentTarget

      if (document.activeElement !== target) {
        return
      }

      if (event.key === 'ArrowRight') {
        startTransition(() => {
          setShouldFocus('first')
          setOpenedIn(activation)
          setWithinMenu(true)
        })

        return
      }
    },
    [activation],
  )

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
