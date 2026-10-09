import {
  cloneElement,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react'

import {ClickOutsideEventElements, useClickOutsideEvent} from '../../hooks/useClickOutsideEvent'
import {useGlobalKeyDown} from '../../hooks/useGlobalKeyDown'
import {Popover, PopoverProps} from '../../primitives/popover/popover'
import {LayerProvider} from '../../utils/layer/layerProvider'
import {useLayer} from '../../utils/layer/useLayer'
import {MenuProps} from './menu'

/**
 * The handlers `MenuButton` composes with its own on the `button` element.
 */
type ButtonHandlerProps = Pick<
  React.DOMAttributes<HTMLButtonElement>,
  'onClick' | 'onKeyDown' | 'onMouseDown'
>

/**
 * The handlers `MenuButton` composes with its own on the `menu` element.
 */
type MenuHandlerProps = Pick<
  React.DOMAttributes<HTMLDivElement>,
  'onBlurCapture' | 'onClick' | 'onClickCapture'
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
  /**
   * The menu to show. `MenuButton` adds its own `onBlurCapture`, `onClick` and `onClickCapture`
   * handlers to it. Handlers the element already has run first, except that `MenuButton` starts
   * tracking a click inside the menu before the element's own `onClickCapture`, so that focus the
   * handler moves out of the menu counts as moved during the click. `MenuButton` sets the menu's
   * `aria-labelledby`, `onClickOutside`, `onEscape`, `onItemClick`, `originElement`,
   * `registerElement` and `shouldFocus`.
   */
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
   *
   * One close runs from the task right after its event rather than from the event: a click inside
   * the menu whose handler stopped the click's propagation and moved focus out of the menu.
   */
  onClose?: () => void
  /**
   * Called from the event that opens the menu (a click on the button, or ArrowDown, ArrowUp, Enter
   * or Space while the button has focus), inside the transition that updates the open state, so
   * state set here commits together with it. The menu is not in the DOM yet when the button has
   * never shown intent to open it; anything that reads or focuses it belongs in an effect. An
   * urgent update needs `flushSync`, and an error thrown here is reported through the window's
   * `error` event, as for any transition, not to an error boundary, with the menu opening anyway.
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
  const {
    closeMenu,
    closeMenuOnBlur,
    endMenuClick,
    open,
    openMenu,
    openPending,
    shouldFocus,
    toggleMenu,
    trackMenuClick,
  } = useOpenState({onClose, onOpen})
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

  const pendingOpenElements = useCallback(
    () => [buttonElement, menuElements],
    [buttonElement, menuElements],
  )

  // The handlers the consumer put on the menu element, composed with the ones below
  const {
    onBlurCapture: onMenuBlurCapture,
    onClick: onMenuClick,
    onClickCapture: onMenuClickCapture,
  }: MenuHandlerProps = menuProp?.props ?? {}

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      onMenuBlurCapture?.(event)

      const target = event.relatedTarget

      if (!(target instanceof Node)) {
        return
      }

      for (const el of menuElements) {
        if (el === target || el.contains(target)) {
          return
        }
      }

      closeMenuOnBlur()
    },
    [closeMenuOnBlur, menuElements, onMenuBlurCapture],
  )

  const handleItemClick = useCallback(() => {
    closeMenu({returnFocusTo})
  }, [closeMenu, returnFocusTo])

  // A click inside the menu is tracked from the capture phase on the menu element to the bubble
  // phase on it, which runs after the item's own handlers. Tracking starts before the consumer's
  // capture handler, so that focus it moves out of the menu counts as moved during the click.
  const handleMenuClickCapture = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      trackMenuClick()
      onMenuClickCapture?.(event)
    },
    [onMenuClickCapture, trackMenuClick],
  )

  const handleMenuClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      onMenuClick?.(event)
      endMenuClick()
    },
    [endMenuClick, onMenuClick],
  )

  const registerElement = useCallback((el: HTMLElement) => {
    setChildMenuElements((els) => els.concat([el]))

    return () => setChildMenuElements((els) => els.filter((_el) => _el !== el))
  }, [])

  const menuProps: MenuProps & MenuHandlerProps = {
    'aria-labelledby': id,
    'onBlurCapture': handleBlur,
    'onClick': handleMenuClick,
    'onClickCapture': handleMenuClickCapture,
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
    <>
      <Popover data-ui="MenuButton__popover" {...popoverProps} content={menu} open={open}>
        {button || <></>}
      </Popover>
      {/* The menu's own Escape and click-outside handling only runs once the menu is rendered
      open; while an open is still pending (its transition has not committed: content that
      suspends, or takes long to render), this cancels it the way the menu would */}
      {openPending && (
        <LayerProvider zOffset={popoverProps.zOffset}>
          <PendingOpenCancel
            elements={pendingOpenElements}
            onClickOutside={handleMenuClickOutside}
            onEscape={handleMenuEscape}
          />
        </LayerProvider>
      )}
    </>
  )
}

/**
 * Cancels an open whose menu has not been rendered yet, on Escape or a press outside the button
 * and the menu, from a layer of its own like the rendered menu's: an overlay around the menu
 * button is then not the top layer, and leaves the same event alone.
 */
function PendingOpenCancel(props: {
  elements: () => ClickOutsideEventElements
  onClickOutside: (event: MouseEvent) => void
  onEscape: () => void
}) {
  const {elements, onClickOutside, onEscape} = props
  const {isTopLayer} = useLayer()

  useClickOutsideEvent(isTopLayer && onClickOutside, elements)

  useGlobalKeyDown(
    useCallback(
      (event: KeyboardEvent) => {
        if (!isTopLayer) return

        if (event.key === 'Escape') {
          event.stopPropagation()
          onEscape()
        }
      },
      [isTopLayer, onEscape],
    ),
  )

  return null
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
  /**
   * Closes the menu because focus left it, unless a click inside the menu is being dispatched,
   * in which case the click decides what the menu does
   */
  closeMenuOnBlur: () => void
  /** Ends the click inside the menu that `trackMenuClick` started, closing if a blur waited on it */
  endMenuClick: () => void
  open: boolean
  /** Opens the menu and asks it to focus its first or last item once it is rendered open */
  openMenu: (focus: NonNullable<ShouldFocus>) => void
  /** Whether an open has been requested whose transition has not committed yet */
  openPending: boolean
  shouldFocus: ShouldFocus
  /** Opens or closes the menu, clearing any focus request: a click leaves focus on the button */
  toggleMenu: () => void
  /** Marks a click inside the menu as being dispatched, until `endMenuClick` */
  trackMenuClick: () => void
}

/**
 * The open state of the menu and the focus request made when it opens, with `onOpen` / `onClose`
 * called from the event that changes it. Opening is a transition, so that an open arriving while
 * `Popover` pre-renders the hidden menu continues that render; closing renders nothing and is a
 * plain update, so that it commits with whatever else the closing event updated. `openPending`
 * is `useTransition`'s pending flag, so that the menu button can cancel an open whose menu has
 * not committed yet (the menu's own listeners are not running then).
 *
 * Constraints that shaped it:
 *
 * - The dedup is a ref written in the handler, not state: returning focus to the button when
 *   Escape or a menu item click closes the menu fires the menu's blur handler synchronously, and
 *   that second close has to find the state already requested closed, before React re-renders.
 * - Focus is returned before `onClose`, so focus that a consumer moves in `onClose` stands.
 * - A menu item calls its own `onClick` before it reports the click, and a blur that handler
 *   causes must not close the menu first: a click inside the menu is tracked from the menu
 *   element's capture phase to its bubble phase (with a macrotask as the fallback for a handler
 *   that stops propagation), and a blur during it waits for the click to decide.
 * - A hook rather than inline state: the handlers that call these functions reach the button and
 *   the menu through `cloneElement`, a call the React Compiler cannot see through, and it rejects
 *   passing a function it knows to read a ref to such a call during render.
 */
function useOpenState({onClose, onOpen}: Pick<MenuButtonProps, 'onClose' | 'onOpen'>): OpenState {
  const [open, setOpenState] = useState(false)
  const [shouldFocus, setShouldFocus] = useState<ShouldFocus>(null)
  const [openPending, startTransition] = useTransition()
  const requestedOpenRef = useRef(open)
  const clickInMenuRef = useRef(false)
  const blurDuringClickRef = useRef(false)
  const endMenuClickTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  // A tracked click must not end, and close, after the menu button is gone
  useEffect(() => () => clearTimeout(endMenuClickTimeoutRef.current), [])

  const setOpen = useCallback(
    ({open: nextOpen, focus, returnFocusTo}: OpenStateUpdate) => {
      const changes = requestedOpenRef.current !== nextOpen

      if (changes) {
        requestedOpenRef.current = nextOpen
        returnFocusTo?.focus()
      }

      const update = () => {
        if (focus !== undefined) setShouldFocus(focus)
        if (!changes) return

        setOpenState(nextOpen)

        if (nextOpen) {
          onOpen?.()
        } else {
          onClose?.()
        }
      }

      if (nextOpen) {
        startTransition(update)
      } else {
        update()
      }
    },
    [onClose, onOpen, startTransition],
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

  const closeMenuOnBlur = useCallback(() => {
    if (clickInMenuRef.current) {
      blurDuringClickRef.current = true

      return
    }

    setOpen({open: false})
  }, [setOpen])

  const endMenuClick = useCallback(() => {
    clearTimeout(endMenuClickTimeoutRef.current)

    if (!clickInMenuRef.current) return

    clickInMenuRef.current = false

    if (!blurDuringClickRef.current) return

    blurDuringClickRef.current = false
    // Focus left the menu during the click and nothing closed it: close as the blur would have
    setOpen({open: false})
  }, [setOpen])

  const trackMenuClick = useCallback(() => {
    clickInMenuRef.current = true
    // For a click whose propagation a handler stops before the bubble phase. A macrotask, not a
    // microtask: React dispatches the capture and bubble phases of a trusted event from separate
    // native listeners, and the microtask checkpoint between them would end the click before the
    // item's handlers run. Cleared when the bubble phase ends the click.
    clearTimeout(endMenuClickTimeoutRef.current)
    endMenuClickTimeoutRef.current = setTimeout(endMenuClick, 0)
  }, [endMenuClick])

  return {
    closeMenu,
    closeMenuOnBlur,
    endMenuClick,
    open,
    openMenu,
    openPending,
    shouldFocus,
    toggleMenu,
    trackMenuClick,
  }
}
