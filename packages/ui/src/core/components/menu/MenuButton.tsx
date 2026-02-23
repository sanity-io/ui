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

import type {ButtonProps} from '../../primitives/button/Button'
import {Popover, type PopoverProps} from '../../primitives/popover/Popover'
import type {Props} from '../../types'
import type {MenuProps} from './Menu'

/**
 * Props for the {@link MenuButton} component.
 *
 * @remarks
 * The `MenuButton` component composes a trigger button with a {@link Popover}
 * containing a {@link Menu}. It manages the open/close lifecycle, keyboard
 * navigation, focus restoration, and click-outside behavior.
 *
 * @public
 */
export type MenuButtonProps = {
  /**
   * When `true`, prevents the trigger button from receiving focus when the
   * menu is closed.
   *
   * @remarks
   * By default, closing the menu restores focus to the trigger button.
   * Set this to `true` when focus should remain wherever it was at the
   * time the menu closed (e.g. when selecting a menu item triggers a
   * navigation that unmounts the button).
   *
   * @beta Do not use in production.
   *
   * @type {boolean}
   * @defaultValue false
   * @optional
   */
  __unstable_disableRestoreFocusOnClose?: boolean

  /**
   * The trigger button element that opens the menu when clicked.
   *
   * @remarks
   * Must be a single React element whose props conform to {@link ButtonProps}.
   * The `MenuButton` clones this element and injects additional props including
   * `id`, `onClick`, `onKeyDown`, `onMouseDown`, `aria-haspopup`, `aria-expanded`,
   * `selected`, and a `ref` callback.
   *
   * @type {ReactElement\<ButtonProps\>}
   * @required
   */
  button: ReactElement<ButtonProps>

  /**
   * A unique identifier for the menu button.
   *
   * @remarks
   * Applied as the `id` attribute on the trigger button element and used
   * as the `aria-labelledby` value on the menu for accessibility.
   *
   * @type {string}
   * @required
   */
  id: string

  /**
   * The menu element to display inside the popover when the button is activated.
   *
   * @remarks
   * Must be a single React element (typically a {@link Menu} component).
   * The `MenuButton` clones this element and injects props for managing
   * click-outside, escape, item click, focus, and element registration.
   *
   * @type {ReactElement}
   * @defaultValue undefined
   * @optional
   */
  menu?: ReactElement

  /**
   * Callback fired when the menu is closed.
   *
   * @remarks
   * Invoked after the menu transitions from open to closed state. Useful
   * for performing side effects such as analytics or state cleanup.
   *
   * @type {() => void}
   * @defaultValue undefined
   * @optional
   */
  onClose?: () => void

  /**
   * Callback fired when the menu is opened.
   *
   * @remarks
   * Invoked after the menu transitions from closed to open state. Useful
   * for performing side effects such as analytics or data fetching.
   *
   * @type {() => void}
   * @defaultValue undefined
   * @optional
   */
  onOpen?: () => void

  /**
   * Configuration props forwarded to the underlying {@link Popover} component
   * that wraps the menu.
   *
   * @remarks
   * Accepts all {@link PopoverProps} except `content` and `open`, which are
   * managed internally by `MenuButton`. Use this to control popover placement,
   * portal behavior, boundary elements, overflow handling, and other
   * positioning options.
   *
   * @type {Omit\<PopoverProps\<'div'\>, 'content' | 'open'\>}
   * @defaultValue `{ overflow: 'auto' }`
   * @optional
   */
  popover?: Omit<PopoverProps<'div'>, 'content' | 'open'>

  /**
   * A ref forwarded to the underlying trigger button element.
   *
   * @remarks
   * Provides access to the `HTMLButtonElement` rendered by the trigger
   * button. The ref is updated when the button element mounts or changes.
   *
   * @type {ForwardedRef\<HTMLButtonElement | null\>}
   * @defaultValue undefined
   * @optional
   */
  ref?: ForwardedRef<HTMLButtonElement | null>
}

/**
 * A composite component that pairs a trigger button with a dropdown menu,
 * following the WAI-ARIA Menu Button pattern.
 *
 * @remarks
 * The `MenuButton` component manages the full lifecycle of a menu button
 * interaction: opening/closing the menu, keyboard navigation (ArrowDown,
 * ArrowUp, Enter, Space, Escape), focus management, and click-outside
 * dismissal.
 *
 * The menu is rendered inside a {@link Popover} that positions itself
 * relative to the trigger button. When the menu closes, focus is restored
 * to the trigger button unless `__unstable_disableRestoreFocusOnClose` is `true`.
 *
 * ### Keyboard interaction
 *
 * - **ArrowDown / Enter / Space** on the button – Opens the menu and focuses the first item.
 * - **ArrowUp** on the button – Opens the menu and focuses the last item.
 * - **Escape** while the menu is open – Closes the menu and restores focus to the button.
 * - Clicking a menu item – Closes the menu and restores focus to the button.
 *
 * ### Default prop values
 *
 * | Prop | Default |
 * |------|---------|
 * | `__unstable_disableRestoreFocusOnClose` | `false` |
 * | `popover` | `{ overflow: 'auto' }` |
 *
 * @public
 */
export function MenuButton(props: MenuButtonProps): React.JSX.Element {
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

  const handleItemClick = useCallback(
    (e: ReactMouseEvent<HTMLButtonElement>) => {
      if (e.defaultPrevented) return

      setOpen(false)
      if (disableRestoreFocusOnClose) return
      if (buttonElement) buttonElement.focus()
    },
    [buttonElement, disableRestoreFocusOnClose],
  )

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
      overflow: 'auto',
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
