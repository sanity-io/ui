import {cloneElement, useCallback, useMemo, useRef, useState} from 'react'

import {Popover, PopoverProps} from '../../primitives/popover/popover'
import {attachRef} from '../../utils/attachRef'
import {MenuProps} from './menu'

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
   * Its `onClick`, `onKeyDown` and `onMouseDown` run before `MenuButton`'s handlers, and calling
   * `event.preventDefault()` in them stops `MenuButton` from acting on the event. Enter and Space
   * open the menu on `keydown` and don't trigger `onClick`.
   */
  button: React.JSX.Element
  id: string
  menu?: React.JSX.Element
  onClose?: () => void
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
  const [open, setOpen] = useOpenState(onOpen, onClose)
  const [shouldFocus, setShouldFocus] = useState<'first' | 'last' | null>(null)
  // Set by the handlers that open the menu, not by the button's ref callback: a state update
  // there re-renders synchronously on every mount and `<Activity>` reveal, which holds up a view
  // transition of the button (see `useReferenceElement`)
  const [buttonElement, setButtonElement] = useState<HTMLButtonElement | null>(null)
  // Mutated in place: only event handlers read it, so registering a menu element needs no render
  const [menuElements] = useState(() => new Set<HTMLElement>())
  const {
    onClick: onButtonClick,
    onKeyDown: onButtonKeyDown,
    onMouseDown: onButtonMouseDown,
  }: React.DOMAttributes<HTMLButtonElement> = buttonProp?.props ?? {}

  const handleButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onButtonClick?.(event)
      if (event.defaultPrevented) return
      setOpen((v) => !v)
      setShouldFocus(null)
      setButtonElement(event.currentTarget)
    },
    [onButtonClick, setOpen],
  )

  // Prevent mouse event propagation when the menu is open.
  // This is to ensure that `handleBlur` isn't triggered when clicking the menu button whilst open,
  // which can lead to `setOpen` being triggered multiple times (once by `handleBlur`, and again by `handleButtonClick`).
  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onButtonMouseDown?.(event)
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
        setButtonElement(event.currentTarget)

        return
      }

      // On `ArrowUp`
      // - 	Opens menu and moves focus to last menuitem
      if (event.key === 'ArrowUp') {
        event.preventDefault()
        setOpen(true)
        setShouldFocus('last')
        setButtonElement(event.currentTarget)

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

  const returnFocusTo = disableRestoreFocusOnClose ? null : buttonElement

  const handleMenuEscape = useCallback(() => {
    setOpen(false, returnFocusTo)
  }, [returnFocusTo, setOpen])

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
    setOpen(false, returnFocusTo)
  }, [returnFocusTo, setOpen])

  const registerElement = useCallback(
    (el: HTMLElement) => {
      menuElements.add(el)

      return () => {
        menuElements.delete(el)
      }
    },
    [menuElements],
  )

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

  const setButton = useButtonRef(forwardedRef, setButtonElement)

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
        'ref': setButton,
        'selected': buttonProp.props.selected ?? open,
      }),
    [buttonProp, handleButtonClick, handleButtonKeyDown, handleMouseDown, id, open, setButton],
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
 * The open state, with `onOpen` and `onClose` called by `setOpen` when it changes. A hook because
 * `setOpen` reads a ref, and the React Compiler rejects passing such a function to `cloneElement`.
 */
function useOpenState(onOpen?: () => void, onClose?: () => void) {
  const [open, setOpenState] = useState(false)
  const openRef = useRef(false)

  const setOpen = useCallback(
    (action: React.SetStateAction<boolean>, returnFocusTo?: HTMLElement | null) => {
      const nextOpen = typeof action === 'function' ? action(openRef.current) : action
      const changed = openRef.current !== nextOpen
      openRef.current = nextOpen
      if (changed) setOpenState(nextOpen)
      // Focus handlers run synchronously: the close that the menu's blur causes must find the menu
      // closed already, and a change that another handler makes supersedes this one
      returnFocusTo?.focus()
      if (!changed || openRef.current !== nextOpen) return
      if (nextOpen) {
        onOpen?.()
      } else {
        onClose?.()
      }
    },
    [onClose, onOpen],
  )

  return [open, setOpen] as const
}

/**
 * The button's ref callback: attaches the forwarded ref, and moves `buttonElement` to a button
 * that replaces the one it is set to. The same button attaching again (an `<Activity>` showing
 * it, `StrictMode`) schedules nothing. A hook because the React Compiler skips a component that
 * passes a callback reading a ref to `cloneElement`.
 */
function useButtonRef(
  forwardedRef: React.Ref<HTMLButtonElement | null> | undefined,
  setButtonElement: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>,
): (node: HTMLButtonElement) => () => void {
  const lastNodeRef = useRef<HTMLButtonElement | null>(null)

  return useCallback(
    (node: HTMLButtonElement) => {
      if (lastNodeRef.current && lastNodeRef.current !== node) {
        setButtonElement((element) => element && node)
      }
      lastNodeRef.current = node

      return attachRef(forwardedRef, node)
    },
    [forwardedRef, setButtonElement],
  )
}
