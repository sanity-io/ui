import {cloneElement, useCallback, useEffect, useMemo, useRef, useState} from 'react'

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
  const [open, setOpen] = useState(false)
  const [shouldFocus, setShouldFocus] = useState<'first' | 'last' | null>(null)
  // The button that opened the menu, set as it opens: the menu's `Tab` handling returns focus to
  // it, and so does closing with Escape or an item click. The button used to be set into state
  // from its ref callback instead, which React schedules at Immediate priority as the callback
  // runs in the commit phase — on mount, on unmount, and each time an `<Activity>` hides or shows
  // the button — and commits as soon as a view transition that reveals or hides the button is
  // ready to animate, delaying its first frame; should anything flush sync work while the browser
  // is still preparing the transition, such a pending update is what makes React cancel it. The
  // forwarded ref is attached to the button directly, so it holds the element from the commit
  // that mounts it on.
  const [originElement, setOriginElement] = useState<HTMLButtonElement | null>(null)
  const menuElements = useMenuElements()
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

  const handleButtonClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen((v) => !v)
    setShouldFocus(null)
    setOriginElement(event.currentTarget)
  }, [])

  // Prevent mouse event propagation when the menu is open.
  // This is to ensure that `handleBlur` isn't triggered when clicking the menu button whilst open,
  // which can lead to `setOpen` being triggered multiple times (once by `handleBlur`, and again by `handleButtonClick`).
  const handleMouseDown = useCallback(
    (event: PointerEvent) => {
      if (open) event.preventDefault()
    },
    [open],
  )

  const handleButtonKeyDown = useCallback((event: React.KeyboardEvent<HTMLButtonElement>) => {
    // On `ArrowDown`, `Enter` and `Space`
    // - Opens menu and moves focus to first menuitem
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setOpen(true)
      setShouldFocus('first')
      setOriginElement(event.currentTarget)

      return
    }

    // On `ArrowUp`
    // - 	Opens menu and moves focus to last menuitem
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setOpen(true)
      setShouldFocus('last')
      setOriginElement(event.currentTarget)

      return
    }
  }, [])

  const handleMenuClickOutside = useCallback(
    (event: MouseEvent) => {
      const target = event.target

      if (!(target instanceof Node)) {
        return
      }

      if (originElement && (target === originElement || originElement.contains(target))) {
        return
      }

      if (menuElements.contains(target)) {
        return
      }

      setOpen(false)
    },
    [menuElements, originElement],
  )

  const handleMenuEscape = useCallback(() => {
    setOpen(false)
    if (disableRestoreFocusOnClose) return
    originElement?.focus()
  }, [disableRestoreFocusOnClose, originElement])

  const handleBlur = useCallback(
    (event: FocusEvent) => {
      const target = event.relatedTarget

      if (!(target instanceof Node)) {
        return
      }

      if (menuElements.contains(target)) {
        return
      }

      setOpen(false)
    },
    [menuElements],
  )

  const handleItemClick = useCallback(() => {
    setOpen(false)
    if (disableRestoreFocusOnClose) return
    originElement?.focus()
  }, [disableRestoreFocusOnClose, originElement])

  const menuProps: MenuProps = {
    'aria-labelledby': id,
    'onBlurCapture': handleBlur,
    'onClickOutside': handleMenuClickOutside,
    'onEscape': handleMenuEscape,
    'onItemClick': handleItemClick,
    originElement,
    'registerElement': menuElements.register,
    shouldFocus,
  }

  const menu = menuProp && cloneElement(menuProp, menuProps)

  // The button's ref callback attaches the forwarded ref to the button, from the commit that
  // mounts it on. `Popover` clones the button once more and attaches this callback from its own.
  const setButton = useForwardedRefCallback(forwardedRef)

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
 * A ref callback that attaches the forwarded ref to the button, with React's semantics for a
 * `ref` prop: a new callback whenever the forwarded ref changes, so that React detaches the old
 * ref and attaches the new one. A hook of its own because the React Compiler takes a ref — or a
 * callback that accesses one — for a possible read during render wherever it flows into a plain
 * call such as `cloneElement` in `MenuButton`, and would skip the component; the result of a hook
 * call carries no such mark.
 */
function useForwardedRefCallback(
  forwardedRef: React.Ref<HTMLButtonElement | null> | undefined,
): (node: HTMLButtonElement) => () => void {
  return useCallback((node: HTMLButtonElement) => attachRef(forwardedRef, node), [forwardedRef])
}

interface MenuElements {
  /** Whether `target` is one of the registered menu elements or inside one */
  contains: (target: Node) => boolean
  /** Registers a menu (or nested menu) element, until the returned function is called */
  register: (element: HTMLElement) => () => void
}

/**
 * The elements of the menu and its nested menus, which `Menu` registers from its ref callback
 * (`registerElement`), kept in a ref: the click-outside and blur handlers read them when they
 * run, nothing reads them during render. Registering used to set them into state, an update at
 * Immediate priority (a ref callback runs in the commit phase) in the commit that opened the menu.
 * A hook of its own because the React Compiler takes a callback that accesses refs for a possible
 * read during render wherever it flows into a plain call — `cloneElement` in `MenuButton` — and
 * would skip the component, since it cannot tell when the callback runs; the result of a hook
 * call carries no such mark.
 */
function useMenuElements(): MenuElements {
  const elementsRef = useRef(new Set<HTMLElement>())

  return useMemo(
    () => ({
      contains: (target) => {
        for (const element of elementsRef.current) {
          if (target === element || element.contains(target)) return true
        }

        return false
      },
      register: (element) => {
        elementsRef.current.add(element)

        return () => {
          elementsRef.current.delete(element)
        }
      },
    }),
    [],
  )
}
