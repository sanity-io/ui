import type {ThemeColorSchemeKey} from '@sanity/ui/theme'
import {
  cloneElement,
  type FocusEvent,
  type ForwardedRef,
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactElement,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'

import {type ButtonProps, Popover, type PopoverProps} from '../../primitives'
import type {Placement, Props, Radius} from '../../types'
import type {MenuProps} from './menu'

/** @public */
export type MenuButtonProps = {
  /**
   * @beta Do not use in production.
   */
  __unstable_disableRestoreFocusOnClose?: boolean
  /**
   * @deprecated Use `popover={{boundaryElement: element}}` instead.
   */
  boundaryElement?: HTMLElement
  button: ReactElement<ButtonProps>
  id: string
  menu?: ReactElement
  onClose?: () => void
  onOpen?: () => void
  /**
   * @deprecated Use `popover={{placement: 'top'}}` instead.
   */
  placement?: Placement
  popover?: Omit<PopoverProps, 'content' | 'open'>
  /**
   * @deprecated Use `popover={{scheme: 'dark'}}` instead.
   */
  popoverScheme?: ThemeColorSchemeKey
  /**
   * @deprecated Use `popover={{radius: 2}}` instead.
   */
  popoverRadius?: Radius | Radius[]
  /**
   * @beta Do not use in production.
   * @deprecated Use `popover={{portal: true}}` instead.
   */
  portal?: boolean
  /**
   * @deprecated Use `popover={{preventOverflow: true}}` instead.
   */
  preventOverflow?: boolean
  ref?: ForwardedRef<HTMLButtonElement | null>
}

/**
 * The `MenuButton` component follows the WAI-ARIA specification for menu buttons.
 *
 * @public
 */
export function MenuButton(props: MenuButtonProps) {
  const {
    __unstable_disableRestoreFocusOnClose: disableRestoreFocusOnClose = false,
    boundaryElement: deprecated_boundaryElement,
    button: buttonProp,
    id,
    menu: menuProp,
    onClose,
    onOpen,
    placement: deprecated_placement,
    popoverScheme: deprecated_popoverScheme,
    portal: deprecated_portal = true,
    popover,
    popoverRadius: deprecated_popoverRadius,
    preventOverflow: deprecated_preventOverflow,
    ref: forwardedRef,
  } = props
  const [open, setOpen] = useState(false)
  const [shouldFocus, setShouldFocus] = useState<'first' | 'last' | null>(null)
  const [buttonElement, setButtonElement] = useState<HTMLButtonElement | null>(null)
  const [menuElements, setChildMenuElements] = useState<HTMLElement[]>([])
  const openRef = useRef<boolean>(open)

  // Notify consumers when the menu opens
  useEffect(() => {
    if (onOpen && open && !openRef.current) {
      onOpen()
    }
  }, [onOpen, open])

  // Notify consumers when the menu closes
  useEffect(() => {
    if (onClose && !open && openRef.current) {
      onClose()
    }
  }, [onClose, open])

  useEffect(() => {
    openRef.current = open
  }, [open])

  const handleButtonClick = useCallback(() => {
    setOpen((v) => !v)
    setShouldFocus(null)
  }, [])

  // Prevent mouse event propagation when the menu is open.
  // This is to ensure that `handleBlur` isn't triggered when clicking the menu button whilst open,
  // which can lead to `setOpen` being triggered multiple times (once by `handleBlur`, and again by `handleButtonClick`).
  const handleMouseDown = useCallback(
    (event: ReactMouseEvent<HTMLElement>) => {
      if (open) event.preventDefault()
    },
    [open],
  )

  const handleButtonKeyDown = useCallback((event: KeyboardEvent<HTMLButtonElement>) => {
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
  }, [])

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
    [buttonElement, menuElements],
  )

  const handleMenuEscape = useCallback(() => {
    setOpen(false)
    if (disableRestoreFocusOnClose) return
    if (buttonElement) buttonElement.focus()
  }, [buttonElement, disableRestoreFocusOnClose])

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLDivElement>) => {
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
    [menuElements],
  )

  const handleItemClick = useCallback(() => {
    setOpen(false)
    if (disableRestoreFocusOnClose) return
    if (buttonElement) buttonElement.focus()
  }, [buttonElement, disableRestoreFocusOnClose])

  const registerElement = useCallback((el: HTMLElement) => {
    setChildMenuElements((els) => els.concat([el]))

    return () => setChildMenuElements((els) => els.filter((_el) => _el !== el))
  }, [])

  const menuProps: Props<MenuProps, 'div'> = {
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

  const button = useMemo(() => {
    if (!buttonProp) return null

    const buttonProps: ButtonProps<'button'> = {
      'data-ui': 'MenuButton',
      id,
      'onClick': handleButtonClick,
      'onKeyDown': handleButtonKeyDown,
      'onMouseDown': handleMouseDown,
      'aria-haspopup': true,
      'aria-expanded': open,
      'ref': setButtonElement,
      'selected': buttonProp.props.selected ?? open,
    }

    return cloneElement(buttonProp, buttonProps)
  }, [buttonProp, handleButtonClick, handleButtonKeyDown, handleMouseDown, id, open])

  // Forward button ref to parent
  useImperativeHandle<HTMLButtonElement | null, HTMLButtonElement | null>(
    forwardedRef,
    () => buttonElement,
    [buttonElement],
  )

  const popoverProps: MenuButtonProps['popover'] = useMemo(
    () => ({
      boundaryElement: deprecated_boundaryElement,
      overflow: 'auto',
      placement: deprecated_placement,
      portal: deprecated_portal,
      preventOverflow: deprecated_preventOverflow,
      radius: deprecated_popoverRadius,
      scheme: deprecated_popoverScheme,
      ...(popover || {}),
    }),
    [
      deprecated_boundaryElement,
      deprecated_placement,
      deprecated_popoverRadius,
      deprecated_popoverScheme,
      deprecated_portal,
      deprecated_preventOverflow,
      popover,
    ],
  )

  return (
    <Popover data-ui="MenuButton__popover" {...popoverProps} content={menu} open={open}>
      {button || <></>}
    </Popover>
  )
}

MenuButton.displayName = 'MenuButton'
