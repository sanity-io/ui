import {
  cloneElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import {useLatestRef} from '../../hooks/useLatestRef'
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
  // an item click. No ref callback in this component sets state when the button mounts, unmounts,
  // or is hidden and shown by an `<Activity>`, nor when the menu registers its elements (the
  // button element and the menu elements live in refs, see `useButtonRefCallback` and
  // `useMenuElements`); the one update a ref callback schedules is for a `button` whose DOM node
  // is replaced (`handleButtonReplace`). The changeset and
  // `apps/storybook/tests/menuButtonViewTransition.test.tsx` have the why.
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

  // The button element, in a ref. Mounting, unmounting, and an `<Activity>` hiding and showing
  // the button attach the same node again and schedule nothing. The one update a ref callback
  // schedules is for a `button` whose DOM node is replaced (another element type or key) while
  // the origin is set, which can only have been the replaced button: with the menu open, a
  // press on the new button must still count as one on the button, and Escape or an item click
  // must return focus to it rather than to the detached node.
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const handleButtonReplace = useCallback(
    (node: HTMLButtonElement) => setOriginElement((origin) => (origin === null ? null : node)),
    [],
  )

  // The forwarded ref follows the button with React's semantics for a `ref` prop (`attachRef`),
  // from the button's own ref callback: attached in the commit that mounts the button, before any
  // layout effect of this component or its parents runs, and detached from the callback's cleanup
  // when the button unmounts, when an `<Activity>` hides it, and when a `button` renders nothing
  // where it rendered the button before — whether or not this component renders then. The
  // callback reads the ref through `forwardedRefRef` and keeps one attachment record, which the
  // effect below swaps to a changed ref.
  const forwardedRefRef = useLatestRef(forwardedRef)
  const forwardedAttachmentRef = useRef<ForwardedRefAttachment | null>(null)
  const setButton = useButtonRefCallback(
    buttonRef,
    forwardedAttachmentRef,
    forwardedRefRef,
    handleButtonReplace,
  )

  useLayoutEffect(() => {
    syncForwardedRef(forwardedAttachmentRef, forwardedRef, buttonRef.current)

    return () => detachForwardedRef(forwardedAttachmentRef)
  }, [forwardedRef])

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

/** The consumer's ref attached to the button, and the function that detaches it */
interface ForwardedRefAttachment {
  detach: () => void
  node: HTMLButtonElement
  ref: React.Ref<HTMLButtonElement | null>
}

/**
 * Attaches `ref` to `node` unless that is what is attached already, detaching whatever else was.
 * With no `ref` or no `node`, detaches only.
 */
function syncForwardedRef(
  attachmentRef: React.RefObject<ForwardedRefAttachment | null>,
  ref: React.Ref<HTMLButtonElement | null> | undefined,
  node: HTMLButtonElement | null,
): void {
  const attachment = attachmentRef.current

  if (attachment && attachment.ref === ref && attachment.node === node) return

  detachForwardedRef(attachmentRef)

  if (ref && node) {
    attachmentRef.current = {detach: attachRef(ref, node), node, ref}
  }
}

function detachForwardedRef(attachmentRef: React.RefObject<ForwardedRefAttachment | null>): void {
  const attachment = attachmentRef.current

  if (!attachment) return

  attachmentRef.current = null
  attachment.detach()
}

interface ButtonRefOptions {
  buttonRef: React.RefObject<HTMLButtonElement | null>
  forwardedAttachmentRef: React.RefObject<ForwardedRefAttachment | null>
  forwardedRefRef: React.RefObject<React.Ref<HTMLButtonElement | null> | undefined>
  /** The node last attached, remembered across its detach, which tells a replacement from it */
  lastNodeRef: React.RefObject<HTMLButtonElement | null>
  onReplace: (node: HTMLButtonElement) => void
}

/**
 * The ref callback for the button: keeps its element in `buttonRef`, attaches the forwarded ref
 * to it and detaches it again with React's semantics for a `ref` prop, and calls `onReplace`
 * when a different node than the last one attaches. Its guarantees, whatever attaches it —
 * React, when `Popover` renders the button as given, or `Popover`'s own ref callback through
 * `attachRef`, when it clones the button:
 *
 * - The same node attaching again is never a replacement: the node last attached is remembered
 *   across its detach (an `<Activity>` showing the button again, the second mount of
 *   `StrictMode`, `Popover` switching between cloning the button and rendering it as given).
 * - A cleanup clears only the node its own attachment set, and the forwarded ref with it.
 * - A `null` node detaches whatever is attached. Neither React nor `attachRef` sends one, since
 *   both detach through the returned cleanup; a `button` that forwards its ref with the
 *   pre-React 19 semantics does.
 *
 * A hook of its own, with the ref accesses in the module-scope function below, because the React
 * Compiler takes a callback that accesses refs for a possible read during render wherever it
 * flows into a plain call such as `cloneElement` in `MenuButton`, and would skip the component;
 * the result of a hook call carries no such mark.
 */
function useButtonRefCallback(
  buttonRef: React.RefObject<HTMLButtonElement | null>,
  forwardedAttachmentRef: React.RefObject<ForwardedRefAttachment | null>,
  forwardedRefRef: React.RefObject<React.Ref<HTMLButtonElement | null> | undefined>,
  onReplace: (node: HTMLButtonElement) => void,
): (node: HTMLButtonElement | null) => () => void {
  const lastNodeRef = useRef<HTMLButtonElement | null>(null)

  return useCallback(
    (node: HTMLButtonElement | null) =>
      attachButton(node, {
        buttonRef,
        forwardedAttachmentRef,
        forwardedRefRef,
        lastNodeRef,
        onReplace,
      }),
    [buttonRef, forwardedAttachmentRef, forwardedRefRef, lastNodeRef, onReplace],
  )
}

function attachButton(
  node: HTMLButtonElement | null,
  {buttonRef, forwardedAttachmentRef, forwardedRefRef, lastNodeRef, onReplace}: ButtonRefOptions,
): () => void {
  if (node === null) {
    buttonRef.current = null
    detachForwardedRef(forwardedAttachmentRef)

    return () => undefined
  }

  buttonRef.current = node
  syncForwardedRef(forwardedAttachmentRef, forwardedRefRef.current, node)

  if (lastNodeRef.current !== null && lastNodeRef.current !== node) onReplace(node)
  lastNodeRef.current = node

  return () => {
    if (buttonRef.current !== node) return

    buttonRef.current = null
    detachForwardedRef(forwardedAttachmentRef)
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
