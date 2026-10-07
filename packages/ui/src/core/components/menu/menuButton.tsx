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
   * @beta Do not use in production.
   */
  __unstable_disableRestoreFocusOnClose?: boolean
  /**
   * @deprecated Use `popover={{floatingBoundary: element}}` and/or `popover={{referenceBoundary: element}}` instead.
   */
  boundaryElement?: never
  /**
   * The element that toggles the menu. `MenuButton` adds its own `onClick`, `onKeyDown` and
   * `onMouseDown` handlers to it, after any the element already has: those run first, and one
   * that calls `event.preventDefault()` keeps `MenuButton` from acting on the event.
   */
  button: React.JSX.Element
  id: string
  menu?: React.JSX.Element
  /**
   * Called from the event that closes the menu (a click outside, Escape, a menu item click, focus
   * leaving the menu, or a click on the button), before the closed state is committed.
   */
  onClose?: () => void
  /**
   * Called from the event that opens the menu (a click on the button, or ArrowDown, ArrowUp, Enter
   * or Space while the button has focus), before the open state is committed.
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
  const {open, setOpen, toggleOpen} = useOpenState({onClose, onOpen})
  const [shouldFocus, setShouldFocus] = useState<'first' | 'last' | null>(null)
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

      toggleOpen()
      setShouldFocus(null)
    },
    [onButtonClick, toggleOpen],
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
        setOpen(true)
        setShouldFocus('first')

        return
      }

      // On `ArrowUp`
      // - 	Opens menu and moves focus to last menuitem
      if (event.key === 'ArrowUp') {
        event.preventDefault()
        setOpen(true)
        setShouldFocus('last')

        return
      }
    },
    [onButtonKeyDown, setOpen],
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

      setOpen(false)
    },
    [buttonElement, menuElements, setOpen],
  )

  const handleMenuEscape = useCallback(() => {
    setOpen(false)
    if (disableRestoreFocusOnClose) return
    if (buttonElement) buttonElement.focus()
  }, [buttonElement, disableRestoreFocusOnClose, setOpen])

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

      setOpen(false)
    },
    [menuElements, setOpen],
  )

  const handleItemClick = useCallback(() => {
    setOpen(false)
    if (disableRestoreFocusOnClose) return
    if (buttonElement) buttonElement.focus()
  }, [buttonElement, disableRestoreFocusOnClose, setOpen])

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

/**
 * The open state of the menu, with `onOpen` / `onClose` called from the event that changes it.
 *
 * The callbacks run in the handler, not in an effect after the commit that renders the new state,
 * so that state the consumer sets in them commits together with the menu's own. Each is called
 * once per transition: `requestedOpenRef` holds the value requested last, so a handler that runs
 * before React re-renders sees the change it follows. Moving focus back to the button when
 * Escape or a menu item click closes the menu fires the menu's blur handler synchronously, and
 * that second close must not notify `onClose` again.
 *
 * A hook rather than inline state: the handlers that call `setOpen` reach the button and the menu
 * through `cloneElement`, a call the React Compiler cannot see through, and it rejects passing a
 * function it knows to read a ref to such a call during render.
 */
function useOpenState({onClose, onOpen}: Pick<MenuButtonProps, 'onClose' | 'onOpen'>): {
  open: boolean
  setOpen: (nextOpen: boolean) => void
  toggleOpen: () => void
} {
  const [open, setOpenState] = useState(false)
  const requestedOpenRef = useRef(open)

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (requestedOpenRef.current === nextOpen) return

      requestedOpenRef.current = nextOpen
      setOpenState(nextOpen)

      if (nextOpen) {
        onOpen?.()
      } else {
        onClose?.()
      }
    },
    [onClose, onOpen],
  )

  const toggleOpen = useCallback(() => setOpen(!requestedOpenRef.current), [setOpen])

  return {open, setOpen, toggleOpen}
}
