import {
  autoUpdate,
  flip,
  type Middleware,
  offset,
  type RootBoundary,
  shift,
  useFloating,
} from '@floating-ui/react-dom'
import {Hotkeys} from '@sanity/ui/components/hotkeys'
import {
  _getResponsiveProp,
  type ComponentType,
  type Delay,
  getElementRef,
  type Placement,
  type Props,
  Z_OFFSETS,
} from '@sanity/ui/core'
import {
  type RadiusStyleProps,
  type ResponsiveProp,
  type ShadowStyleProps,
  tooltip,
} from '@sanity/ui/css'
import {usePrefersReducedMotion, useUnique} from '@sanity/ui/hooks'
import type {LayerOwnProps} from '@sanity/ui/primitives/layer'
import {Text} from '@sanity/ui/primitives/text'
import type {CardTone, ColorScheme, FontTextSize} from '@sanity/ui/theme'
import {BoundaryElementContext} from '@sanity/ui/utils/boundary-element'
import {assertPortalContext, Portal, PortalContext} from '@sanity/ui/utils/portal'
import {AnimatePresence} from 'motion/react'
import {
  cloneElement,
  startTransition,
  use,
  useCallback,
  useEffect,
  useEffectEvent,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import {origin} from '../../middleware/origin'
import {
  DEFAULT_FALLBACK_PLACEMENTS,
  DEFAULT_TOOLTIP_DELAY,
  DEFAULT_TOOLTIP_DISTANCE,
  DEFAULT_TOOLTIP_PADDING,
} from './constants'
import {TooltipDelayGroupContext} from './tooltipDelayGroup/TooltipDelayGroupContext'
import {TooltipLayer} from './TooltipLayer'

/**
 * The default HTML element type rendered by the {@link Tooltip} component.
 *
 * @public
 */
export const DEFAULT_TOOLTIP_ELEMENT = 'div'

/**
 * Own props for the {@link Tooltip} component.
 *
 * @remarks
 * Extends {@link LayerOwnProps}, {@link RadiusStyleProps}, and {@link ShadowStyleProps}
 * to provide positioning, visual styling, and stacking context for tooltip content.
 *
 * @public
 */
export type TooltipOwnProps = LayerOwnProps &
  RadiusStyleProps &
  ShadowStyleProps & {
    /**
     * Whether the tooltip should animate in and out.
     *
     * @beta
     */
    animate?: boolean

    /**
     * @deprecated Will be removed in the next major version.
     */
    arrow?: boolean

    /**
     * The boundary element used to detect overflow when positioning the tooltip.
     */
    boundaryElement?: HTMLElement | null

    /**
     * The reference element that the tooltip is anchored to.
     *
     * @remarks
     * Must be a single React element that accepts a `ref` prop. The tooltip
     * positions itself relative to this element and listens for hover and
     * focus events on it.
     */
    children?: React.ReactElement<
      React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>
    >

    /**
     * Custom content to render inside the tooltip.
     *
     * @remarks
     * Rendered alongside `text` and `hotkeys` content when provided.
     */
    content?: React.ReactNode

    /**
     * Adds a delay before the tooltip opens or closes.
     *
     * @remarks
     * When a `number` is passed, it is used for both opening and closing.
     * When an object `{open: number; close: number}` is passed, different
     * delays can be set for each action.
     */
    delay?: Delay

    /**
     * When `true`, disables the tooltip and renders only the child element.
     */
    disabled?: boolean

    /**
     * An ordered list of fallback placements to try when the preferred
     * placement does not fit within the boundary.
     */
    fallbackPlacements?: Placement[]

    /**
     * Keyboard shortcut keys to display inside the tooltip.
     *
     * @remarks
     * Rendered as a {@link Hotkeys} component alongside the text and content.
     */
    hotkeys?: string[]

    /**
     * The preferred placement of the tooltip relative to its reference element.
     */
    placement?: Placement

    /**
     * Whether or not to render the tooltip in a portal element.
     *
     * @remarks
     * When `true`, renders in the default portal. When a string is provided,
     * renders in the named portal.
     */
    portal?: boolean | string

    /**
     * The color scheme of the tooltip card.
     */
    scheme?: ColorScheme

    /**
     * The text content to display inside the tooltip.
     *
     * @remarks
     * Rendered inside a {@link Text} component with the size specified by `textSize`.
     */
    text?: React.ReactNode

    /**
     * The font size of the tooltip's text content. Supports responsive values.
     */
    textSize?: ResponsiveProp<FontTextSize>

    /**
     * The semantic color tone of the tooltip card.
     */
    tone?: CardTone
  }

/**
 * Accepted values for the `as` prop of the {@link Tooltip} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `Tooltip`.
 *
 * @public
 */
export type TooltipElementType = 'div' | 'span' | ComponentType

/**
 * Props for the {@link Tooltip} component.
 *
 * @remarks
 * Combines {@link TooltipOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<div>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link TooltipElementType}.
 *
 * @public
 */
export type TooltipProps<E extends TooltipElementType = TooltipElementType> = Props<
  TooltipOwnProps,
  E
>

/**
 * Tooltips display contextual information when hovering over, focusing, or
 * tapping a reference element.
 *
 * @remarks
 * The `Tooltip` component uses Floating UI to position its content relative
 * to a child reference element. It supports text, custom content, keyboard
 * shortcut hints, open/close delays, portal rendering, and animation.
 *
 * The tooltip automatically hides on Escape key press, context menu, or
 * when the reference element loses hover/focus.
 *
 * @public
 */
export function Tooltip<E extends TooltipElementType = typeof DEFAULT_TOOLTIP_ELEMENT>(
  props: TooltipProps<E>,
): React.JSX.Element {
  const {
    animate: _animate = true,
    arrow: _arrow,
    as = DEFAULT_TOOLTIP_ELEMENT,
    boundaryElement: _boundaryElement,
    children: childProp,
    className,
    content: contentProp,
    delay = DEFAULT_TOOLTIP_DELAY,
    disabled,
    id: idProp,
    fallbackPlacements: _fallbackPlacements,
    hotkeys: hotkeysProp,
    padding = 2,
    placement: placementProp = 'bottom',
    portal = true,
    radius = 3,
    ref: forwardedRef,
    shadow = 2,
    text,
    textSize: textSizeProp = 1,
    zOffset = Z_OFFSETS.tooltip,
    ...rest
  } = props as TooltipProps<typeof DEFAULT_TOOLTIP_ELEMENT>

  const _randomId = useId()
  const id = idProp ?? _randomId

  const boundaryElement = _boundaryElement ?? use(BoundaryElementContext)
  const fallbackPlacements =
    _fallbackPlacements ?? DEFAULT_FALLBACK_PLACEMENTS[props.placement ?? 'bottom']

  const prefersReducedMotion = usePrefersReducedMotion()
  const animate = prefersReducedMotion ? false : _animate
  const ref = useRef<HTMLDivElement | null>(null)
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null)
  const rootBoundary: RootBoundary = 'viewport'
  const [tooltipMaxWidth, setTooltipMaxWidth] = useState(0)

  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(forwardedRef, () => ref.current)

  let portalElement: HTMLElement | null = null
  if (portal) {
    const portalContext = use(PortalContext)
    assertPortalContext(portalContext)
    portalElement =
      typeof portal === 'string' ? portalContext.elements?.[portal] || null : portalContext.element
  }

  const middleware = useMiddleware({
    animate,
    boundaryElement,
    fallbackPlacements,
    rootBoundary,
  })

  const {floatingStyles, placement, middlewareData, refs} = useFloating({
    middleware,
    placement: placementProp,
    whileElementsMounted: autoUpdate,
    elements: {reference: referenceElement},
    transform: false,
  })

  const originX = middlewareData['@sanity/ui/origin']?.originX
  const originY = middlewareData['@sanity/ui/origin']?.originY

  const delayGroupContext = use(TooltipDelayGroupContext)
  const handleGroupOpenChange = delayGroupContext?.handleOpenChange

  const groupVisible = delayGroupContext?.visibleTooltipId === id

  const openDelay = typeof delay === 'number' ? delay : (delay.open ?? DEFAULT_TOOLTIP_DELAY.open)
  const closeDelay =
    typeof delay === 'number' ? delay : (delay.close ?? DEFAULT_TOOLTIP_DELAY.close)

  const openDelayRef = useRef(openDelay)
  useEffect(() => {
    // update `openDelayRef` when `openDelay` changes
    openDelayRef.current = openDelay
  }, [openDelay])

  const closeDelayRef = useRef(closeDelay)
  useEffect(() => {
    // update `closeDelayRef` when `closeDelay` changes
    closeDelayRef.current = closeDelay
  }, [closeDelay])

  const [referenceHovered, setReferenceHovered] = useState(false)
  const [referenceFocused, setReferenceFocused] = useState(false)

  const isOpen = referenceHovered || referenceFocused

  const [localVisible, setVisible] = useState(false)

  const visible = groupVisible || localVisible

  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    if (handleGroupOpenChange) {
      handleGroupOpenChange({open: isOpen, id})
      return
    }

    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = undefined

    if (isOpen) {
      // start open timer
      timerRef.current = setTimeout(() => {
        setVisible(true)
        timerRef.current = undefined
      }, openDelayRef.current)
      return
    }

    // start close timer
    timerRef.current = setTimeout(() => {
      setVisible(false)
      timerRef.current = undefined
    }, closeDelayRef.current)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = undefined
    }
  }, [isOpen, handleGroupOpenChange, id])

  const textSize = _getResponsiveProp(textSizeProp)

  const hotkeys = useUnique(hotkeysProp)

  const content = useMemo(() => {
    if (contentProp || text || hotkeys) {
      return (
        <>
          {text && <Text size={textSize}>{text}</Text>}
          {contentProp}
          {hotkeys && <Hotkeys aria-hidden={true} keys={hotkeys} />}
        </>
      )
    }

    return undefined
  }, [contentProp, hotkeys, text, textSize])

  // Hide immediately
  const hide = useCallback(() => {
    handleGroupOpenChange?.({open: false, id, immediate: true})
    setVisible(false)
    setReferenceHovered(false)
    setReferenceFocused(false)
  }, [handleGroupOpenChange, id])

  const childOnBlur = childProp?.props?.onBlur
  const childOnFocus = childProp?.props?.onFocus
  const childOnMouseEnter = childProp?.props?.onMouseEnter
  const childOnMouseLeave = childProp?.props?.onMouseLeave
  const childOnContextMenu = childProp?.props?.onContextMenu

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLElement>) => {
      childOnBlur?.(e)
      setReferenceFocused(false)
    },
    [childOnBlur],
  )
  const handleContextMenu = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      childOnContextMenu?.(e)
      setReferenceHovered(false)
      setReferenceFocused(false)
      hide()
    },
    [childOnContextMenu, hide],
  )
  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLElement>) => {
      childOnFocus?.(e)
      setReferenceFocused(true)
    },
    [childOnFocus],
  )
  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      childOnMouseEnter?.(e)
      setReferenceHovered(true)
    },
    [childOnMouseEnter],
  )
  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      childOnMouseLeave?.(e)
      setReferenceHovered(false)
    },
    [childOnMouseLeave],
  )

  // Handle closing the tooltip when the mouse leaves the referenceElement
  useCloseOnMouseLeave({
    referenceElement,
    visible,
    onClose: useCallback(() => {
      setReferenceHovered(false)
    }, []),
  })

  // Close when `disabled` changes to `true`
  useEffect(() => {
    if (disabled) {
      startTransition(() => hide())
    }
  }, [disabled, hide])

  // Close when `content` changes to falsy
  useEffect(() => {
    if (!content) {
      startTransition(() => hide())
    }
  }, [content, hide])

  useEffect(() => {
    if (!visible) return

    function handleWindowKeyDown(event: KeyboardEvent) {
      // If the user clicks on escape key, close the tooltip.
      if (event.key === 'Escape') {
        startTransition(() => hide())
        return
      }
    }

    window.addEventListener('keydown', handleWindowKeyDown)

    return () => {
      window.removeEventListener('keydown', handleWindowKeyDown)
    }
  }, [hide, visible])

  // Set the max width of the tooltip based on boundaries and portals
  useLayoutEffect(() => {
    // Get the maximum tooltip width (sans tooltip padding)
    // Tooltip width should never exceed the width of either any supplied boundary or portal element.
    // If both portal and boundary elements are provided, use the smaller width of the two.
    const availableWidths = [
      ...(boundaryElement ? [boundaryElement.offsetWidth] : []),
      portalElement?.offsetWidth || document.body.offsetWidth,
    ]

    startTransition(() => {
      setTooltipMaxWidth(Math.min(...availableWidths) - DEFAULT_TOOLTIP_PADDING * 2)
    })
  }, [boundaryElement, portalElement])

  const setFloating = useCallback(
    (node: HTMLDivElement | null) => {
      ref.current = node
      refs.setFloating(node)
    },
    [refs],
  )

  const child = useMemo(() => {
    if (!childProp) return null

    return cloneElement(childProp, {
      'aria-describedby': visible ? id : undefined,
      'onBlur': handleBlur,
      'onFocus': handleFocus,
      'onMouseEnter': handleMouseEnter,
      'onMouseLeave': handleMouseLeave,
      // 'onClick': handleClick,
      'onContextMenu': handleContextMenu,
      'ref': setReferenceElement,
    })
  }, [
    childProp,
    handleBlur,
    // handleClick,
    handleContextMenu,
    handleFocus,
    handleMouseEnter,
    handleMouseLeave,
    id,
    visible,
  ])

  // If there's a child then we need to set the reference element to the cloned child ref
  // and if child changes we make sure to update or remove the reference element.
  useImperativeHandle(childProp ? getElementRef(childProp) : null, () => referenceElement, [
    referenceElement,
  ])

  if (!child) return <></>

  if (disabled) return child

  const node = (
    <TooltipLayer
      data-ui="Tooltip"
      {...rest}
      ref={setFloating}
      animate={animate}
      as={as}
      className={tooltip({className})}
      display="flex"
      gap={padding}
      id={id}
      originX={originX}
      originY={originY}
      padding={padding}
      placement={placement}
      radius={radius}
      role="tooltip"
      shadow={shadow}
      style={{
        ...floatingStyles,
        maxWidth: tooltipMaxWidth > 0 ? `${tooltipMaxWidth}px` : undefined,
      }}
      zOffset={zOffset}
    >
      {content}
    </TooltipLayer>
  )

  let children = visible ? node : null

  if (visible && portal) {
    children = (
      <Portal __unstable_name={typeof portal === 'string' ? portal : undefined}>{node}</Portal>
    )
  }

  return (
    <>
      {/* the tooltip */}
      {animate ? <AnimatePresence>{children}</AnimatePresence> : children}

      {/* the referred element */}
      {child}
    </>
  )
}

function useMiddleware({
  animate,
  boundaryElement,
  fallbackPlacements,
  rootBoundary,
}: {
  animate: boolean
  boundaryElement: HTMLElement | null
  fallbackPlacements: Placement[]
  rootBoundary: RootBoundary
}) {
  return useMemo(() => {
    const ret: Middleware[] = []

    // Flip the floating element when leaving the boundary box
    ret.push(
      flip({
        boundary: boundaryElement || undefined,
        fallbackPlacements,
        padding: DEFAULT_TOOLTIP_PADDING,
        rootBoundary,
      }),
    )

    // Define distance between reference and floating element
    ret.push(offset({mainAxis: DEFAULT_TOOLTIP_DISTANCE}))

    // Shift the tooltip so its sits with the boundary element
    ret.push(
      shift({
        boundary: boundaryElement || undefined,
        rootBoundary,
        padding: DEFAULT_TOOLTIP_PADDING,
      }),
    )

    // Determine the origin to scale from.
    // Must be placed after `@sanity/ui/size` and `shift` middleware.
    if (animate) {
      ret.push(origin)
    }

    return ret
  }, [animate, boundaryElement, fallbackPlacements, rootBoundary])
}

/**
 * As `useEffectEvent` should never be passed to other components or hooks, this custom hook groups together the `useEffectEvent` and the `useEffect` hook using it.
 * @see https://react.dev/learn/separating-events-from-effects#reading-latest-props-and-state-with-effect-events:~:text=Never%20pass%20them%20to%20other%20components%20or%20Hooks
 */
function useCloseOnMouseLeave({
  onClose,
  referenceElement,
  visible,
}: {
  onClose: () => void
  referenceElement: HTMLElement | null
  visible: boolean
}) {
  // Since we don't want the `mouseevent` events to be attached and removed if the `referenceElement` is changed
  // we use a "effect event" (https://react.dev/learn/separating-events-from-effects#reading-latest-props-and-state-with-effect-events)
  // in order to always see the latest `referenceElement` value inside the event handler itself.
  const onMouseMove = useEffectEvent((target: EventTarget | null, teardown: () => void) => {
    if (!referenceElement) return

    const isHoveringReference =
      referenceElement === target || (target instanceof Node && referenceElement.contains(target))

    if (!isHoveringReference) {
      onClose()
      // Allow removing the event listener eagerly, to avoid race conditions
      teardown()
    }
  })

  // Detect whether the mouse is moving outside of the reference element. This is sometimes
  // necessary, because the tooltip might not always close as it should (e.g. when clicking
  // the reference element triggers a CPU-heavy operation.)
  useEffect(() => {
    if (!visible) return

    const handleMouseMove = (event: MouseEvent) => {
      onMouseMove(event.target, () => window.removeEventListener('mousemove', handleMouseMove))
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [visible])
}
