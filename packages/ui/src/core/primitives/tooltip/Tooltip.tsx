import {
  arrow,
  autoUpdate,
  flip,
  type Middleware,
  offset,
  type RootBoundary,
  shift,
  useFloating,
} from '@floating-ui/react-dom'
import {type RadiusStyleProps, type ShadowStyleProps, tooltip} from '@sanity/ui/css'
import type {CardTone, ColorScheme} from '@sanity/ui/theme'
import {AnimatePresence} from 'motion/react'
import {
  cloneElement,
  type FocusEvent,
  type HTMLAttributes,
  type MouseEvent as ReactMouseEvent,
  type ReactElement,
  type ReactNode,
  type RefAttributes,
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

import {Z_OFFSETS} from '../../constants'
import {useDelayedState} from '../../hooks/useDelayedState'
import {usePrefersReducedMotion} from '../../hooks/usePrefersReducedMotion'
import {origin} from '../../middleware/origin'
import type {ComponentType, Delay, Placement, Props} from '../../types'
import {BoundaryElementContext} from '../../utils/boundaryElement/BoundaryElementContext'
import {getElementRef} from '../../utils/getElementRef'
import {Portal} from '../../utils/portal/Portal'
import {PortalContext} from '../../utils/portal/PortalContext'
import {assertPortalContext} from '../../utils/portal/usePortal'
import {CardContext} from '../card/CardContext'
import {CardProvider} from '../card/CardProvider'
import {assertCardContext} from '../card/useCard'
import type {LayerOwnProps} from '../layer/Layer'
import {
  DEFAULT_FALLBACK_PLACEMENTS,
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
 * to inherit all card, box, and layer stacking props alongside border radius and
 * shadow control. Adds tooltip-specific properties for positioning, animation,
 * delay, portal rendering, and content display.
 *
 * @public
 */
export type TooltipOwnProps = LayerOwnProps &
  RadiusStyleProps &
  ShadowStyleProps & {
    /**
     * When `true`, the tooltip animates in and out using a scale/opacity
     * transition powered by `motion/react` (`AnimatePresence`).
     *
     * @remarks
     * Animation is automatically disabled when the user's operating system
     * indicates a preference for reduced motion (`prefers-reduced-motion: reduce`).
     *
     * @beta
     *
     * @defaultValue false
     */
    animate?: boolean

    /**
     * When `true`, renders a directional arrow element that points from the
     * tooltip toward its reference element.
     *
     * @defaultValue false
     */
    arrow?: boolean

    /**
     * An HTML element used as the clipping boundary for the floating tooltip.
     *
     * @remarks
     * Determines the area within which the tooltip's `flip` and `shift`
     * middleware operate. When not provided, the nearest boundary element
     * from the `BoundaryElementContext` is used.
     *
     * @defaultValue (from BoundaryElementContext)
     */
    boundaryElement?: HTMLElement | null

    /**
     * The reference element that the tooltip is anchored to.
     *
     * @remarks
     * Must be a single React element that accepts a `ref` prop and standard
     * HTML event handlers (`onMouseEnter`, `onMouseLeave`, `onFocus`, `onBlur`,
     * `onClick`, `onContextMenu`). The `Tooltip` clones this element and
     * injects the necessary event handlers and ref for positioning and
     * visibility management.
     */
    children?: ReactElement<HTMLAttributes<HTMLElement> & RefAttributes<HTMLElement>>

    /**
     * The content to render inside the tooltip floating element.
     *
     * @remarks
     * Rendered inside a styled tooltip layer card when the tooltip is visible.
     * When set to a falsy value while the tooltip is open, the tooltip closes.
     */
    content?: ReactNode

    /**
     * Adds a delay in milliseconds before the tooltip opens or closes.
     *
     * @remarks
     * When a `number` is provided, the same delay is used for both opening
     * and closing the tooltip.
     *
     * When an object `{open: number; close: number}` is provided, different
     * delays can be set for the open and close actions independently.
     *
     * When the tooltip is inside a `TooltipDelayGroup`, the group's delay
     * values take precedence over this prop.
     *
     * @defaultValue 0
     */
    delay?: Delay

    /**
     * When `true`, disables the tooltip entirely. The `children` reference
     * element is rendered as-is without any tooltip behavior. If the tooltip
     * is currently open when `disabled` becomes `true`, it is closed.
     */
    disabled?: boolean

    /**
     * An ordered list of alternative placements to try when the tooltip
     * cannot fit in its preferred `placement`.
     *
     * @remarks
     * Used by the Floating UI `flip` middleware. If not provided, a default
     * set of fallback placements is derived from the `placement` prop.
     *
     * Accepted values (each element): `"top"` | `"top-start"` | `"top-end"` |
     * `"right"` | `"right-start"` | `"right-end"` | `"bottom"` | `"bottom-start"` |
     * `"bottom-end"` | `"left"` | `"left-start"` | `"left-end"`
     *
     * @defaultValue (derived from `placement`)
     */
    fallbackPlacements?: Placement[]

    /**
     * Sets the preferred placement of the tooltip relative to its reference element.
     *
     * @remarks
     * The tooltip will attempt to render at this placement first. If it does not
     * fit, it falls back to the `fallbackPlacements` using the Floating UI
     * `flip` middleware.
     *
     * `"right-start"` | `"right-end"` | `"bottom"` | `"bottom-start"` |
     * `"bottom-end"` | `"left"` | `"left-start"` | `"left-end"`
     *
     * @defaultValue `"bottom"`
     */
    placement?: Placement

    /**
     * Controls whether the tooltip content is rendered inside a portal element.
     *
     * @remarks
     * When `true`, the tooltip is rendered into the default portal element
     * registered with the nearest `PortalProvider`. When a string is provided,
     * it is used as the name of a named portal element. When `false` or
     * `undefined`, the tooltip is rendered in place.
     */
    portal?: boolean | string

    /**
     * Sets the color scheme of the tooltip card.
     *
     * @remarks
     * Determines whether the tooltip renders in a light or dark color mode.
     */
    scheme?: ColorScheme

    /**
     * Sets the color tone of the tooltip card.
     *
     * @remarks
     * Controls the background and foreground colors applied to the tooltip card
     * based on the active theme. When set to `"inherit"`, the tone is inherited
     * from the nearest parent `Card` context.
     *
     * @defaultValue `"inherit"`
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
 * Displays contextual information in a floating element when hovering over,
 * focusing, or tapping a reference element.
 *
 * @remarks
 * The `Tooltip` component uses Floating UI to position a content overlay relative
 * to its `children` reference element. It automatically manages visibility based on
 * mouse enter/leave, focus/blur, and click/context-menu events on the reference
 * element.
 *
 * The tooltip supports configurable open/close delays (including delay groups for
 * coordinated tooltip behavior), entrance/exit animation, arrow indicators,
 * portal rendering, and keyboard dismissal via the `Escape` key.
 *
 * The tooltip renders as a {@link Layer}-based card and participates in the design
 * system's managed stacking context.
 *
 * When `disabled` is `true` or `content` is falsy, the tooltip is not rendered
 * and the `children` reference element is returned as-is.
 *
 * @public
 */
export function Tooltip<E extends TooltipElementType = typeof DEFAULT_TOOLTIP_ELEMENT>(
  props: TooltipProps<E>,
): React.JSX.Element {
  const {
    animate: _animate = false,
    arrow: arrowProp = false,
    as = DEFAULT_TOOLTIP_ELEMENT,
    boundaryElement: _boundaryElement,
    children: childProp,
    className,
    content,
    delay,
    disabled,
    fallbackPlacements: _fallbackPlacements,
    padding = 2,
    placement: placementProp = 'bottom',
    portal: portalProp,
    radius = 3,
    ref: forwardedRef,
    scheme,
    shadow = 2,
    zOffset = Z_OFFSETS.tooltip,
    tone = 'inherit',
    ...rest
  } = props as TooltipProps<typeof DEFAULT_TOOLTIP_ELEMENT>
  const boundaryElement = _boundaryElement ?? use(BoundaryElementContext)
  const fallbackPlacements =
    _fallbackPlacements ?? DEFAULT_FALLBACK_PLACEMENTS[props.placement ?? 'bottom']

  const prefersReducedMotion = usePrefersReducedMotion()
  const animate = prefersReducedMotion ? false : _animate
  const ref = useRef<HTMLDivElement | null>(null)
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null)
  const arrowRef = useRef<HTMLDivElement | null>(null)
  const rootBoundary: RootBoundary = 'viewport'
  const [tooltipMaxWidth, setTooltipMaxWidth] = useState(0)

  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(forwardedRef, () => ref.current)

  let portalElement: HTMLElement | null = null
  if (portalProp) {
    const portal = use(PortalContext)
    assertPortalContext(portal)
    portalElement =
      typeof portalProp === 'string' ? portal.elements?.[portalProp] || null : portal.element
  }

  const middleware = useMiddleware({
    animate,
    arrowProp,
    arrowRef,
    boundaryElement,
    fallbackPlacements,
    rootBoundary,
  })

  const {floatingStyles, placement, middlewareData, refs, update} = useFloating({
    middleware,
    placement: placementProp,
    whileElementsMounted: autoUpdate,
    elements: {reference: referenceElement},
    transform: false,
  })

  const arrowX = middlewareData.arrow?.x
  const arrowY = middlewareData.arrow?.y

  const originX = middlewareData['@sanity/ui/origin']?.originX
  const originY = middlewareData['@sanity/ui/origin']?.originY

  const tooltipId = useId()
  const [isOpen, setIsOpen] = useDelayedState(false)
  const delayGroupContext = use(TooltipDelayGroupContext)
  const {setIsGroupActive, setOpenTooltipId} = delayGroupContext || {}
  const showTooltip = isOpen || delayGroupContext?.openTooltipId === tooltipId

  const isInsideGroup = delayGroupContext !== null
  const openDelayProp = typeof delay === 'number' ? delay : delay?.open || 0
  const closeDelayProp = typeof delay === 'number' ? delay : delay?.close || 0

  const openDelay = isInsideGroup ? delayGroupContext.openDelay : openDelayProp
  const closeDelay = isInsideGroup ? delayGroupContext.closeDelay : closeDelayProp

  const handleIsOpenChange = useCallback(
    (open: boolean, immediate?: boolean) => {
      if (isInsideGroup) {
        //  When it's inside a group, the open or close status will be handled by the group.
        if (open) {
          const groupedOpenDelay = immediate ? 0 : openDelay

          setIsGroupActive?.(open, groupedOpenDelay)
          setOpenTooltipId?.(tooltipId, groupedOpenDelay)
        } else {
          const minimumGroupDeactivateDelay = 200 // We should provide some delay to allow the user to reach the next tooltip.
          const groupDeactivateDelay =
            closeDelay > minimumGroupDeactivateDelay ? closeDelay : minimumGroupDeactivateDelay

          setIsGroupActive?.(open, groupDeactivateDelay)
          setOpenTooltipId?.(null, immediate ? 0 : closeDelay)
        }
      } else {
        const standaloneDelay = immediate ? 0 : open ? openDelay : closeDelay

        // When it's not inside a group, the open or close status will be handled by the tooltip itself.
        setIsOpen(open, standaloneDelay)
      }
    },
    [
      isInsideGroup,
      openDelay,
      setIsGroupActive,
      setOpenTooltipId,
      tooltipId,
      closeDelay,
      setIsOpen,
    ],
  )

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLElement>) => {
      handleIsOpenChange(false)
      childProp?.props?.onBlur?.(e)
    },
    [childProp?.props, handleIsOpenChange],
  )
  const handleClick = useCallback(
    (e: ReactMouseEvent<HTMLElement>) => {
      handleIsOpenChange(false, true)
      childProp?.props.onClick?.(e)
    },
    [childProp?.props, handleIsOpenChange],
  )
  const handleContextMenu = useCallback(
    (e: ReactMouseEvent<HTMLElement>) => {
      handleIsOpenChange(false, true)
      childProp?.props.onContextMenu?.(e)
    },
    [childProp?.props, handleIsOpenChange],
  )
  const handleFocus = useCallback(
    (e: FocusEvent<HTMLElement>) => {
      handleIsOpenChange(true)
      childProp?.props?.onFocus?.(e)
    },
    [childProp?.props, handleIsOpenChange],
  )
  const handleMouseEnter = useCallback(
    (e: ReactMouseEvent<HTMLElement>) => {
      handleIsOpenChange(true)
      childProp?.props?.onMouseEnter?.(e)
    },
    [childProp?.props, handleIsOpenChange],
  )
  const handleMouseLeave = useCallback(
    (e: ReactMouseEvent<HTMLElement>) => {
      handleIsOpenChange(false)
      childProp?.props?.onMouseLeave?.(e)
    },
    [childProp?.props, handleIsOpenChange],
  )

  // Handle closing the tooltip when the mouse leaves the referenceElement
  useCloseOnMouseLeave({handleIsOpenChange, referenceElement, showTooltip, isInsideGroup})

  // Close when `disabled` changes to `true`
  useEffect(() => {
    if (disabled && showTooltip) handleIsOpenChange(false)
  }, [disabled, handleIsOpenChange, showTooltip])

  // Close when `content` changes to falsy
  useEffect(() => {
    if (!content && showTooltip) handleIsOpenChange(false)
  }, [content, handleIsOpenChange, showTooltip])

  useEffect(() => {
    // If the user clicks on escape key, close the tooltip.
    if (!showTooltip) return

    function handleWindowKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        handleIsOpenChange(false, true)
      }
    }

    window.addEventListener('keydown', handleWindowKeyDown)

    return () => {
      window.removeEventListener('keydown', handleWindowKeyDown)
    }
  }, [handleIsOpenChange, showTooltip])

  // // Set the max width of the tooltip based on boundaries and portals
  useLayoutEffect(() => {
    // Get the maximum tooltip width (sans tooltip padding)
    // Tooltip width should never exceed the width of either any supplied boundary or portal element.
    // If both portal and boundary elements are provided, use the smaller width of the two.
    const availableWidths = [
      ...(boundaryElement ? [boundaryElement.offsetWidth] : []),
      portalElement?.offsetWidth || document.body.offsetWidth,
    ]

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTooltipMaxWidth(Math.min(...availableWidths) - DEFAULT_TOOLTIP_PADDING * 2)
  }, [boundaryElement, portalElement])

  const setArrow = useCallback(
    (arrowEl: HTMLDivElement | null) => {
      arrowRef.current = arrowEl
      update()
    },
    [update],
  )

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
      onBlur: handleBlur,
      onFocus: handleFocus,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onClick: handleClick,
      onContextMenu: handleContextMenu,
      ref: setReferenceElement,
    })
  }, [
    childProp,
    handleBlur,
    handleClick,
    handleContextMenu,
    handleFocus,
    handleMouseEnter,
    handleMouseLeave,
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
      animate={animate}
      arrow={arrowProp}
      arrowRef={setArrow}
      arrowX={arrowX}
      arrowY={arrowY}
      as={as}
      className={tooltip({className})}
      originX={originX}
      originY={originY}
      padding={padding}
      placement={placement}
      radius={radius}
      ref={setFloating}
      scheme={scheme}
      shadow={shadow}
      style={{
        ...floatingStyles,
        maxWidth: tooltipMaxWidth > 0 ? `${tooltipMaxWidth}px` : undefined,
      }}
      tone={tone}
      zOffset={zOffset}
    >
      {content}
    </TooltipLayer>
  )

  let children = showTooltip ? node : null

  if (showTooltip && portalProp) {
    let resolvedTone = tone as Exclude<typeof tone, 'inherit'>
    if (tone === 'inherit') {
      const card = use(CardContext)
      assertCardContext(card)
      resolvedTone = card.tone
    }

    children = (
      <Portal __unstable_name={typeof portalProp === 'string' ? portalProp : undefined}>
        <CardProvider tone={resolvedTone} scheme={scheme ?? 'light'}>
          {node}
        </CardProvider>
      </Portal>
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
  arrowProp,
  arrowRef,
  boundaryElement,
  fallbackPlacements,
  rootBoundary,
}: {
  animate: boolean
  arrowProp: boolean
  arrowRef: React.RefObject<HTMLDivElement | null>
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

    // Place arrow
    if (arrowProp) {
      ret.push(arrow({element: arrowRef, padding: DEFAULT_TOOLTIP_PADDING}))
    }

    // Determine the origin to scale from.
    // Must be placed after `@sanity/ui/size` and `shift` middleware.
    if (animate) {
      ret.push(origin)
    }

    return ret
  }, [animate, arrowProp, arrowRef, boundaryElement, fallbackPlacements, rootBoundary])
}

/**
 * As `useEffectEvent` should never be passed to other components or hooks, this custom hook groups together the `useEffectEvent` and the `useEffect` hook using it.
 * @see https://19.dev/learn/separating-events-from-effects#reading-latest-props-and-state-with-effect-events:~:text=Never%20pass%20them%20to%20other%20components%20or%20Hooks
 */
function useCloseOnMouseLeave({
  handleIsOpenChange,
  referenceElement,
  showTooltip,
  isInsideGroup,
}: {
  handleIsOpenChange: (open: boolean, immediate?: boolean) => void
  referenceElement: HTMLElement | null
  showTooltip: boolean
  isInsideGroup: boolean
}) {
  // Since we don't want the `mouseevent` events to be attached and removed if the `referenceElement` is changed
  // we use a "effect event" (https://19.dev/learn/separating-events-from-effects#reading-latest-props-and-state-with-effect-events)
  // in order to always see the latest `referenceElement` value inside the event handler itself.
  const onMouseMove = useEffectEvent((target: EventTarget | null, teardown: () => void) => {
    if (!referenceElement) return

    const isHoveringReference =
      referenceElement === target || (target instanceof Node && referenceElement.contains(target))

    if (!isHoveringReference) {
      handleIsOpenChange(false)
      // Allow removing the event listener eagerly, to avoid race conditions
      teardown()
    }
  })

  // Detect whether the mouse is moving outside of the reference element. This is sometimes
  // necessary, because the tooltip might not always close as it should (e.g. when clicking
  // the reference element triggers a CPU-heavy operation.)
  useEffect(() => {
    if (!showTooltip || isInsideGroup) return

    const handleMouseMove = (event: MouseEvent) => {
      onMouseMove(event.target, () => window.removeEventListener('mousemove', handleMouseMove))
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isInsideGroup, showTooltip])
}
