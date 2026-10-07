import {
  cloneElement,
  startTransition,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'

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
   * and one that calls `event.preventDefault()` keeps `MenuButton` from acting on the event.
   */
  button: React.JSX.Element
  id: string
  menu?: React.JSX.Element
  /**
   * Called from the event that closes the menu (a click outside, Escape, a menu item click, focus
   * leaving the menu, or a click on the button), inside the transition that updates the closed
   * state, so state set here commits together with it.
   */
  onClose?: () => void
  /**
   * Called from the event that opens the menu (a click on the button, or ArrowDown, ArrowUp, Enter
   * or Space while the button has focus), inside the transition that updates the open state, so
   * state set here commits together with it.
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

type ShouldFocus = MenuProps['shouldFocus']

/**
 * The open state of the menu and the focus request made when it opens, with `onOpen` / `onClose`
 * called from the event that changes it.
 *
 * The state is updated in a transition. `Popover` pre-renders the closed menu in a hidden
 * `<Activity>` once the button shows intent to open it, and an open that arrives while that
 * pre-render is in progress continues it as a transition, where a synchronous update would force
 * the menu's content to render again in the event. The focus request rides the same transition
 * and is applied by the menu's own effect once it is rendered open (`useMenuController`), so it
 * does not depend on when the update commits.
 *
 * The callbacks run in the handler, not in an effect after the commit that renders the new state,
 * and inside the transition, so that state the consumer sets in them commits together with the
 * menu's own. Each is called once per change: `requestedOpenRef` holds the value requested last,
 * so a handler that runs before React re-renders sees the change it follows. Returning focus to
 * the button when Escape or a menu item click closes the menu fires the menu's blur handler
 * synchronously, and that second close must not notify `onClose` again. Focus is returned before
 * `onClose` is called, so focus that a consumer moves in `onClose` stands.
 *
 * A hook rather than inline state: the handlers that call these functions reach the button and
 * the menu through `cloneElement`, a call the React Compiler cannot see through, and it rejects
 * passing a function it knows to read a ref to such a call during render.
 */
function useOpenState({onClose, onOpen}: Pick<MenuButtonProps, 'onClose' | 'onOpen'>): {
  /** Closes the menu, returning focus to `returnFocusTo` first when given */
  closeMenu: (options?: {returnFocusTo?: HTMLElement | null}) => void
  open: boolean
  /** Opens the menu and asks it to focus its first or last item once it is rendered open */
  openMenu: (focus: NonNullable<ShouldFocus>) => void
  shouldFocus: ShouldFocus
  /** Opens or closes the menu, clearing any focus request: a click leaves focus on the button */
  toggleMenu: () => void
} {
  const [open, setOpenState] = useState(false)
  const [shouldFocus, setShouldFocus] = useState<ShouldFocus>(null)
  const requestedOpenRef = useRef(open)

  const setOpen = useCallback(
    (
      nextOpen: boolean,
      nextShouldFocus: ShouldFocus | undefined,
      returnFocusTo?: HTMLElement | null,
    ) => {
      startTransition(() => {
        if (nextShouldFocus !== undefined) setShouldFocus(nextShouldFocus)
        if (requestedOpenRef.current === nextOpen) return

        requestedOpenRef.current = nextOpen
        // Focus leaving the menu closes it again through its blur handler, which finds the state
        // already requested closed. Before `onClose`, so that focus moved there is not overridden.
        returnFocusTo?.focus()
        setOpenState(nextOpen)

        if (nextOpen) {
          onOpen?.()
        } else {
          onClose?.()
        }
      })
    },
    [onClose, onOpen],
  )

  const closeMenu = useCallback(
    (options?: {returnFocusTo?: HTMLElement | null}) =>
      setOpen(false, undefined, options?.returnFocusTo),
    [setOpen],
  )
  const openMenu = useCallback((focus: NonNullable<ShouldFocus>) => setOpen(true, focus), [setOpen])
  const toggleMenu = useCallback(() => setOpen(!requestedOpenRef.current, null), [setOpen])

  return {closeMenu, open, openMenu, shouldFocus, toggleMenu}
}
