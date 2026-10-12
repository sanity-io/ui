import {cloneElement, useCallback, useImperativeHandle, useMemo, useRef, useState} from 'react'

import {Popover, PopoverProps} from '../../primitives/popover/popover'
import {MenuProps} from './menu'

/**
 * The handlers `MenuButton` composes with its own on the `button` element.
 */
type ButtonHandlerProps = Pick<
  React.DOMAttributes<HTMLButtonElement>,
  'onClick' | 'onKeyDown' | 'onMouseDown'
>

/**
 * @public
 */
export interface MenuButtonProps {
  /**
   * Leaves focus where it is when Escape or a menu item click closes the menu, instead of
   * returning it to the button.
   *
   * @beta Do not use in production.
   */
  __unstable_disableRestoreFocusOnClose?: boolean
  /**
   * @deprecated Use `popover={{floatingBoundary: element}}` and/or `popover={{referenceBoundary: element}}` instead.
   */
  boundaryElement?: never
  /**
   * The element that toggles the menu. `MenuButton` adds its own `onClick`, `onKeyDown` and
   * `onMouseDown` handlers to it, after any handlers the element already has: those run first,
   * and one that calls `event.preventDefault()` keeps `MenuButton` from acting on the event. That
   * includes a handler that prevents the default for its own reasons, such as the navigation of
   * an `<a>` or the submission of a `type="submit"` button, which then also keeps the menu from
   * opening. `MenuButton` prevents the default of the Enter and Space key presses it handles, so
   * the click the browser would synthesize for them does not fire: an `onClick` on the element
   * does not run for a keyboard open, while a pointer click, a programmatic `click()` and an
   * activation by assistive technology run it as usual. The element's `id`, `ref`,
   * `aria-haspopup`, `aria-expanded` and `data-ui` are set by `MenuButton`; `selected` is, unless
   * the element sets it.
   */
  button: React.JSX.Element
  id: string
  menu?: React.JSX.Element
  /**
   * Called from the event that closes the menu, before the closed state is committed. The close
   * is a plain (synchronous) update, so state set here commits together with it, and an error
   * thrown here is thrown from that event, not reported to an error boundary. What has focus
   * when this runs depends on what closed the menu:
   *
   * - Escape or a menu item click: focus has been returned to the button (unless
   *   `__unstable_disableRestoreFocusOnClose` is set), so focus moved here stands.
   * - Focus leaving the menu: the callback runs while that focus change is being dispatched,
   *   before the element that is receiving focus has it.
   * - A click on the button: focus is unchanged, since the press does not take focus while the
   *   menu is open.
   * - A click outside the menu: the callback runs on the press (`mousedown`), before the browser
   *   moves focus to what was pressed, so focus moved here can be overridden by that.
   */
  onClose?: () => void
  /**
   * Called from the event that opens the menu (a click on the button, or ArrowDown, ArrowUp, Enter
   * or Space while the button has focus), before the open state is committed, so state set here
   * commits together with it. The menu is not in the DOM yet when the button has never shown
   * intent to open it; anything that reads or focuses it belongs in an effect. An error thrown
   * here is thrown from that event, not reported to an error boundary.
   */
  onOpen?: () => void
  /**
   * @deprecated Use `popover={{placement: 'top'}}` instead.
   */
  placement?: never
  popover?: Omit<PopoverProps, 'content' | 'open'>
  /**
   * @deprecated Use `popover={{scheme: 'dark'}}` instead.
   */
  popoverScheme?: never
  /**
   * @deprecated Use `popover={{radius: 2}}` instead.
   */
  popoverRadius?: never
  /**
   * @beta Do not use in production.
   * @deprecated Use `popover={{portal: true}}` instead.
   */
  portal?: never
  /**
   * @deprecated Use `popover={{preventOverflow: true}}` instead.
   */
  preventOverflow?: never
  ref?: React.Ref<HTMLButtonElement | null>
}

/**
 * The `MenuButton` component follows the WAI-ARIA specification for menu buttons.
 *
 * @public
 */
export function MenuButton(props: MenuButtonProps) {
  const {
    __unstable_disableRestoreFocusOnClose: disableRestoreFocusOnClose = false,
    button: buttonProp,
    id,
    menu: menuProp,
    onClose,
    onOpen,
    popover,
    ref: forwardedRef,
  } = props
  const {closeMenu, open, openMenu, shouldFocus, toggleMenu} = useOpenState({onClose, onOpen})
  const [buttonElement, setButtonElement] = useState<HTMLButtonElement | null>(null)
  const [menuElements, setChildMenuElements] = useState<HTMLElement[]>([])

  // The handlers the consumer put on the button element, composed with the ones below
  const {
    onClick: onButtonClick,
    onKeyDown: onButtonKeyDown,
    onMouseDown: onButtonMouseDown,
  }: ButtonHandlerProps = buttonProp?.props ?? {}

  const handleButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onButtonClick?.(event)
      if (event.defaultPrevented) return

      toggleMenu()
    },
    [onButtonClick, toggleMenu],
  )

  // Keep the button from taking focus when it is pressed while the menu is open. Focus leaving the
  // menu would fire `handleBlur` and close it, and the click that follows would then reopen it.
  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onButtonMouseDown?.(event)
      if (event.defaultPrevented) return

      if (open) event.preventDefault()
    },
    [onButtonMouseDown, open],
  )

  const handleButtonKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      onButtonKeyDown?.(event)
      if (event.defaultPrevented) return

      // On `ArrowDown`, `Enter` and `Space`
      // - Opens menu and moves focus to first menuitem
      if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        openMenu('first')

        return
      }

      // On `ArrowUp`
      // - 	Opens menu and moves focus to last menuitem
      if (event.key === 'ArrowUp') {
        event.preventDefault()
        openMenu('last')

        return
      }
    },
    [onButtonKeyDown, openMenu],
  )

  const handleMenuClickOutside = useCallback(
    (event: MouseEvent) => {
      const target = event.target

      if (!(target instanceof Node)) {
        return
      }

      if (buttonElement && (target === buttonElement || buttonElement.contains(target))) {
        return
      }

      for (const el of menuElements) {
        if (target === el || el.contains(target)) {
          return
        }
      }

      closeMenu()
    },
    [buttonElement, closeMenu, menuElements],
  )

  // The element to return focus to when Escape or a menu item click closes the menu
  const returnFocusTo = disableRestoreFocusOnClose ? null : buttonElement

  const handleMenuEscape = useCallback(() => {
    closeMenu({returnFocusTo})
  }, [closeMenu, returnFocusTo])

  const handleBlur = useCallback(
    (event: FocusEvent) => {
      const target = event.relatedTarget

      if (!(target instanceof Node)) {
        return
      }

      for (const el of menuElements) {
        if (el === target || el.contains(target)) {
          return
        }
      }

      closeMenu()
    },
    [closeMenu, menuElements],
  )

  const handleItemClick = useCallback(() => {
    closeMenu({returnFocusTo})
  }, [closeMenu, returnFocusTo])

  const registerElement = useCallback((el: HTMLElement) => {
    setChildMenuElements((els) => els.concat([el]))

    return () => setChildMenuElements((els) => els.filter((_el) => _el !== el))
  }, [])

  const menuProps: MenuProps = {
    'aria-labelledby': id,
    'onBlurCapture': handleBlur,
    'onClickOutside': handleMenuClickOutside,
    'onEscape': handleMenuEscape,
    'onItemClick': handleItemClick,
    'originElement': buttonElement,
    registerElement,
    shouldFocus,
  }

  const menu = menuProp && cloneElement(menuProp, menuProps)

  const button = useMemo(
    () =>
      buttonProp &&
      cloneElement(buttonProp, {
        'data-ui': 'MenuButton',
        id,
        'onClick': handleButtonClick,
        'onKeyDown': handleButtonKeyDown,
        'onMouseDown': handleMouseDown,
        'aria-haspopup': true,
        'aria-expanded': open,
        'ref': setButtonElement,
        'selected': buttonProp.props.selected ?? open,
      }),
    [buttonProp, handleButtonClick, handleButtonKeyDown, handleMouseDown, id, open],
  )

  // Forward button ref to parent
  useImperativeHandle<HTMLButtonElement | null, HTMLButtonElement | null>(
    forwardedRef,
    () => buttonElement,
    [buttonElement],
  )

  const popoverProps: MenuButtonProps['popover'] = useMemo(
    () => ({
      overflow: 'auto',
      portal: true,
      // oxlint-disable-next-line no-useless-fallback-in-spread
      ...(popover || {}),
    }),
    [popover],
  )

  return (
    <Popover data-ui="MenuButton__popover" {...popoverProps} content={menu} open={open}>
      {button || <></>}
    </Popover>
  )
}

type ShouldFocus = NonNullable<MenuProps['shouldFocus']> | null

interface OpenStateUpdate {
  open: boolean
  /** The focus request made with an open; `undefined` leaves the current one alone */
  focus?: ShouldFocus
  /** The element to return focus to before `onClose`, when closing */
  returnFocusTo?: HTMLElement | null
}

interface OpenState {
  /** Closes the menu, returning focus to `returnFocusTo` first when given */
  closeMenu: (options?: Pick<OpenStateUpdate, 'returnFocusTo'>) => void
  open: boolean
  /** Opens the menu and asks it to focus its first or last item once it is rendered open */
  openMenu: (focus: NonNullable<ShouldFocus>) => void
  shouldFocus: ShouldFocus
  /** Opens or closes the menu, clearing any focus request: a click leaves focus on the button */
  toggleMenu: () => void
}

/**
 * The open state of the menu and the focus request made when it opens, with `onOpen` / `onClose`
 * called from the event that changes it.
 *
 * Constraints that shaped it:
 *
 * - The dedup is a ref written in the handler, not state: returning focus to the button when
 *   Escape or a menu item click closes the menu fires the menu's blur handler synchronously, and
 *   that second close has to find the state already requested closed, before React re-renders.
 * - Focus is returned before `onClose`, so focus that a consumer moves in `onClose` stands.
 * - A hook rather than inline state: the handlers that call these functions reach the button and
 *   the menu through `cloneElement`, a call the React Compiler cannot see through, and it rejects
 *   passing a function it knows to read a ref to such a call during render.
 */
function useOpenState({onClose, onOpen}: Pick<MenuButtonProps, 'onClose' | 'onOpen'>): OpenState {
  const [open, setOpenState] = useState(false)
  const [shouldFocus, setShouldFocus] = useState<ShouldFocus>(null)
  const requestedOpenRef = useRef(open)

  const setOpen = useCallback(
    ({open: nextOpen, focus, returnFocusTo}: OpenStateUpdate) => {
      const changes = requestedOpenRef.current !== nextOpen

      requestedOpenRef.current = nextOpen
      returnFocusTo?.focus()

      if (focus !== undefined) setShouldFocus(focus)
      if (!changes) return

      setOpenState(nextOpen)

      if (nextOpen) {
        onOpen?.()
      } else {
        onClose?.()
      }
    },
    [onClose, onOpen],
  )

  const closeMenu = useCallback(
    (options?: Pick<OpenStateUpdate, 'returnFocusTo'>) => setOpen({open: false, ...options}),
    [setOpen],
  )
  const openMenu = useCallback(
    (focus: NonNullable<ShouldFocus>) => setOpen({open: true, focus}),
    [setOpen],
  )
  const toggleMenu = useCallback(
    () => setOpen({open: !requestedOpenRef.current, focus: null}),
    [setOpen],
  )

  return {closeMenu, open, openMenu, shouldFocus, toggleMenu}
}
