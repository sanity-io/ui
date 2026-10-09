import {
  cloneElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

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
  // The button that opened the menu, set by the handlers that open it, so it is set whenever
  // `open` is: the menu's `Tab` handling returns focus to it, and so does closing with Escape or
  // an item click. Nothing in this component sets state from a ref callback (the button element
  // and the menu elements live in refs, see `useButtonRefCallback` and `useMenuElements`); the
  // changeset and `apps/storybook/tests/menuButtonViewTransition.test.tsx` have the why.
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

      // A press on the button is not a click outside: the button's own click handler toggles the
      // menu, and closing here first would reopen it there. This relies on the origin being set
      // whenever the menu is open — every path that opens it sets the origin.
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

  // The button element, in a ref. The one update the ref callback schedules is for a `button`
  // whose DOM node is replaced (another element type or key): `replacements` counts those, and
  // the layout effect below follows the new node. Mounting, unmounting, and an `<Activity>`
  // hiding and showing the button attach the same node again and schedule nothing. The origin
  // follows a replacement as well when it is set, since it can only have been the replaced
  // button: with the menu open, a press on the new button must still count as one on the button,
  // and Escape or an item click must return focus to it rather than to the detached node.
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const [replacements, setReplacements] = useState(0)
  const handleButtonReplace = useCallback((node: HTMLButtonElement) => {
    setReplacements((count) => count + 1)
    setOriginElement((origin) => (origin === null ? null : node))
  }, [])
  const setButton = useButtonRefCallback(buttonRef, handleButtonReplace, popover?.referenceElement)

  // The forwarded ref, attached to the live element in the commit that mounts the button (a
  // parent's layout effect runs after the refs of its children attached), again after a
  // replacement, and again when it changes itself; detached with React's semantics for a `ref`
  // prop (`attachRef`). Not attached from the button's ref callback: that would hand every
  // detach and re-attach of the same node to the consumer's ref (today `Popover` re-runs the
  // child ref it is given on every render). A node that is removed without a successor leaves
  // the forwarded ref on the detached node until this runs again, which is accepted: clearing
  // it from the ref callback's cleanup would be the hide-time update this component avoids.
  useLayoutEffect(() => attachRef(forwardedRef, buttonRef.current), [forwardedRef, replacements])

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

interface ButtonRefOptions {
  buttonRef: React.RefObject<HTMLButtonElement | null>
  /** A node to take for no attachment at all: the popover's `referenceElement`, when it has one */
  ignoredNode: HTMLElement | null | undefined
  lastNodeRef: React.RefObject<HTMLButtonElement | null>
  onReplace: (node: HTMLButtonElement) => void
}

/**
 * The ref callback for the button, keeping its element in `buttonRef` and calling `onReplace`
 * when a different node than the last one attaches. Its guarantees, whatever attaches it:
 *
 * - The same node attaching again is never a replacement: the node last attached is remembered
 *   across its detach (an `<Activity>` showing the button again, a parent re-attaching the ref).
 * - A `null` node is ignored, since detaching only ever arrives through the returned cleanup, and
 *   so is `ignoredNode`, which is not the button. (Today both come from `Popover`, which forwards
 *   Floating UI's reference element through a handle of its own on every render: `null` while
 *   disabled, the `referenceElement` prop when there is one, the button otherwise.)
 * - A cleanup clears only the node its own attachment set.
 *
 * A hook of its own, with the ref accesses in the module-scope function below, because the React
 * Compiler takes a callback that accesses refs for a possible read during render wherever it
 * flows into a plain call such as `cloneElement` in `MenuButton`, and would skip the component;
 * the result of a hook call carries no such mark.
 */
function useButtonRefCallback(
  buttonRef: React.RefObject<HTMLButtonElement | null>,
  onReplace: (node: HTMLButtonElement) => void,
  ignoredNode: HTMLElement | null | undefined,
): (node: HTMLButtonElement | null) => () => void {
  const lastNodeRef = useRef<HTMLButtonElement | null>(null)

  return useCallback(
    (node: HTMLButtonElement | null) =>
      attachButton(node, {buttonRef, ignoredNode, lastNodeRef, onReplace}),
    [buttonRef, ignoredNode, lastNodeRef, onReplace],
  )
}

function attachButton(
  node: HTMLButtonElement | null,
  {buttonRef, ignoredNode, lastNodeRef, onReplace}: ButtonRefOptions,
): () => void {
  if (node === null || node === ignoredNode) return () => undefined

  buttonRef.current = node

  if (lastNodeRef.current !== null && lastNodeRef.current !== node) onReplace(node)
  lastNodeRef.current = node

  return () => {
    if (buttonRef.current === node) buttonRef.current = null
  }
}

interface MenuElements {
  /** Whether `target` is one of the registered menu elements or inside one */
  contains: (target: Node) => boolean
  /** Registers a menu (or nested menu) element, until the returned function is called */
  register: (element: HTMLElement) => () => void
}

/**
 * The elements of the menu and its nested menus, which `Menu` registers from its ref callback
 * (`registerElement`), kept outside of state: the click-outside and blur handlers read them when
 * they run, nothing reads them during render, so registering one schedules nothing. A hook of its
 * own because the React Compiler takes a callback that accesses refs for a possible read during
 * render wherever it flows into a plain call — `cloneElement` in `MenuButton` — and would skip the
 * component, since it cannot tell when the callback runs; the result of a hook call carries no
 * such mark.
 */
function useMenuElements(): MenuElements {
  const [elements] = useState(() => new Set<HTMLElement>())

  return useMemo(
    () => ({
      contains: (target) => {
        for (const element of elements) {
          if (target === element || element.contains(target)) return true
        }

        return false
      },
      register: (element) => {
        elements.add(element)

        return () => {
          elements.delete(element)
        }
      },
    }),
    [elements],
  )
}
