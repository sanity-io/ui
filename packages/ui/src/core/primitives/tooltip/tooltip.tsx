import {
  arrow,
  autoUpdate,
  detectOverflow,
  flip,
  type Middleware,
  offset,
  type RootBoundary,
  shift,
  size,
  useFloating,
} from '@floating-ui/react-dom'
import {clsx} from 'clsx/lite'
import {
  Activity,
  cloneElement,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useInsertionEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
// TODO: switch to `useEffectEvent` from `react` once
// https://github.com/facebook/react/issues/34818 is fixed in the lowest React
// version we support: on React 19.2 the native hook never sees values past
// the first render when the calling component is wrapped in `forwardRef` or
// `memo`, and consumers may wrap `Tooltip` in `memo`.
import {useEffectEvent} from 'use-effect-event'

import type {ThemeColorSchemeKey} from '../../../theme/system/color/_system'
import {useDelayedState} from '../../hooks/useDelayedState'
import {usePrefersReducedMotion} from '../../hooks/usePrefersReducedMotion'
import {origin} from '../../middleware/origin'
import {_getArrayProp} from '../../styles/helpers'
import {useTheme_v2} from '../../theme/useTheme'
import type {Placement} from '../../types/placement'
import {AnimateActivity} from '../../utils/animateActivity'
import {useBoundaryElement} from '../../utils/boundaryElement/useBoundaryElement'
import {getElementRef} from '../../utils/getElementRef'
import {Layer, type LayerProps} from '../../utils/layer/layer'
import {Portal} from '../../utils/portal/portal'
import {resolvePortalElement} from '../../utils/portal/resolvePortalElement'
import {usePortal} from '../../utils/portal/usePortal'
import type {Delay} from '../types'
import {
  DEFAULT_FALLBACK_PLACEMENTS,
  DEFAULT_TOOLTIP_DISTANCE,
  DEFAULT_TOOLTIP_PADDING,
} from './constants'
import {TooltipCard} from './tooltipCard'
import {useTooltipDelayGroup} from './tooltipDelayGroup/useTooltipDelayGroup'

import {tooltipLayer} from './tooltip.css'

/**
 * @public
 */
export interface TooltipProps extends Omit<LayerProps, 'as'> {
  /** @deprecated Use `fallbackPlacements` instead. */
  allowedAutoPlacements?: never
  arrow?: boolean
  boundaryElement?: HTMLElement | null
  children?: React.JSX.Element
  content?: React.ReactNode
  disabled?: boolean
  fallbackPlacements?: Placement[]
  padding?: number | number[]
  placement?: Placement
  /** Whether or not to render the tooltip in a portal element. */
  portal?: boolean | string
  radius?: number | number[]
  scheme?: ThemeColorSchemeKey
  shadow?: number | number[]
  /**
   * Adds a delay to open or close the tooltip.
   *
   * If only a `number` is passed, it will be used for both opening and closing.
   *
   * If an object `{open: number; close:number}` is passed, it can be used to set different delays for each action.
   *
   * @public
   * @defaultValue 0
   */
  delay?: Delay
  /**
   * Whether the tooltip should animate in and out.
   *
   * @beta
   * @defaultValue false
   */
  animate?: boolean
}

/**
 * Tooltips display information when hovering, focusing or tapping.
 *
 * @public
 */
export function Tooltip(
  props: TooltipProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'children' | 'content'>,
) {
  const boundaryElementContext = useBoundaryElement()
  const {layer} = useTheme_v2()
  const {
    animate: _animate = false,
    arrow: arrowProp = false,
    boundaryElement: _boundaryElement,
    children: childProp,
    content,
    disabled,
    fallbackPlacements: _fallbackPlacementsProp,
    padding = 2,
    placement: placementProp = 'bottom',
    portal: portalProp,
    radius = 2,
    ref: forwardedRef,
    scheme,
    shadow = 2,
    zOffset: _zOffset,
    delay,
    ...restProps
  } = props
  const boundaryElement = _boundaryElement ?? boundaryElementContext?.element
  const fallbackPlacementsProp =
    _fallbackPlacementsProp ?? DEFAULT_FALLBACK_PLACEMENTS[props.placement ?? 'bottom']
  const zOffset = _zOffset ?? layer.tooltip.zOffset
  const prefersReducedMotion = usePrefersReducedMotion()
  const animate = prefersReducedMotion ? false : _animate
  const fallbackPlacements = _getArrayProp(fallbackPlacementsProp)
  const ref = useRef<HTMLDivElement | null>(null)
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null)
  const arrowRef = useRef<HTMLDivElement | null>(null)
  const rootBoundary: RootBoundary = 'viewport'

  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(forwardedRef, () => ref.current)

  const portal = usePortal()
  const portalName = typeof portalProp === 'string' ? portalProp : undefined
  // Resolved the way `Portal` resolves it (a missing named portal falls back to the default one),
  // so the width cap applies to the element the tooltip actually renders into
  const portalElement = resolvePortalElement(portal, portalName)

  const middleware = useMiddleware({
    animate,
    arrowProp,
    arrowRef,
    boundaryElement,
    fallbackPlacements,
    portalElement,
    rootBoundary,
  })

  const {floatingStyles, placement, middlewareData, refs, update} = useFloating({
    middleware,
    placement: placementProp,
    whileElementsMounted: autoUpdate,
    elements: {reference: referenceElement},
  })

  // The middleware reads the boundary and portal elements through refs (see `useMiddleware`), so
  // a change of either does not reach Floating UI by itself: reposition a shown tooltip against
  // the new element here, without tearing `autoUpdate` down. `update` is a no-op while the tooltip
  // is closed, as there is no floating element then. The body references the elements so that
  // the dependencies the React Compiler and the linter infer from it are the authored ones; with
  // neither element there is no tooltip DOM to reposition (`Portal` renders nothing).
  const reposition = useEffectEvent(() => update())

  useLayoutEffect(() => {
    if (boundaryElement || portalElement) reposition()
  }, [boundaryElement, portalElement])

  const arrowX = middlewareData.arrow?.x
  const arrowY = middlewareData.arrow?.y

  const originX = middlewareData['@sanity/ui/origin']?.originX
  const originY = middlewareData['@sanity/ui/origin']?.originY

  const tooltipId = useId()
  const [isOpen, setIsOpen] = useDelayedState(false)
  const delayGroupContext = useTooltipDelayGroup()
  const {setIsGroupActive, setOpenTooltipId} = delayGroupContext || {}
  // Derived, not synced: `disabled` and an empty `content` suppress the tooltip in the same render
  // that changes them, instead of an effect closing it one commit later. The hover state
  // (`isOpen`, or the group pointing at this tooltip) is kept as it is, so a tooltip that is
  // re-enabled or given content while its child is still hovered shows right away.
  const suppressed = disabled || !content
  const showTooltip = !suppressed && (isOpen || delayGroupContext?.openTooltipId === tooltipId)

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

  // `isOpen` is delayed visibility, not the current hover state: after the pointer or focus
  // leaves, it stays true for the close delay. While the tooltip is suppressed it must not linger
  // like that, or re-enabling it (or giving it content) before the delay has elapsed would show it
  // under a pointer that has already left. Leaving a suppressed tooltip closes it immediately.
  const handleBlur = useCallback(
    (e: FocusEvent) => {
      handleIsOpenChange(false, suppressed)
      childProp?.props?.onBlur?.(e)
    },
    [childProp?.props, handleIsOpenChange, suppressed],
  )
  const handleClick = useCallback(
    (e: MouseEvent) => {
      handleIsOpenChange(false, true)
      childProp?.props.onClick?.(e)
    },
    [childProp?.props, handleIsOpenChange],
  )
  const handleContextMenu = useCallback(
    (e: MouseEvent) => {
      handleIsOpenChange(false, true)
      childProp?.props.onContextMenu?.(e)
    },
    [childProp?.props, handleIsOpenChange],
  )
  const handleFocus = useCallback(
    (e: FocusEvent) => {
      handleIsOpenChange(true)
      childProp?.props?.onFocus?.(e)
    },
    [childProp?.props, handleIsOpenChange],
  )
  const handleMouseEnter = useCallback(
    (e: MouseEvent) => {
      handleIsOpenChange(true)
      childProp?.props?.onMouseEnter?.(e)
    },
    [childProp?.props, handleIsOpenChange],
  )
  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      handleIsOpenChange(false, suppressed)
      childProp?.props?.onMouseLeave?.(e)
    },
    [childProp?.props, handleIsOpenChange, suppressed],
  )

  // Handle closing the tooltip when the mouse leaves the referenceElement
  useCloseOnMouseLeave({handleIsOpenChange, referenceElement, showTooltip, isInsideGroup})

  const onWindowEscape = useEffectEvent(() => handleIsOpenChange(false, true))

  useEffect(() => {
    // If the user clicks on escape key, close the tooltip.
    if (!showTooltip) return

    function handleWindowKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onWindowEscape()
      }
    }

    window.addEventListener('keydown', handleWindowKeyDown)

    // oxlint-disable-next-line consistent-return
    return () => {
      window.removeEventListener('keydown', handleWindowKeyDown)
    }
  }, [showTooltip])

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

  const tooltip = (
    <Layer
      data-ui="Tooltip"
      {...restProps}
      className={clsx(tooltipLayer, restProps.className)}
      ref={setFloating}
      style={floatingStyles}
      zOffset={zOffset}
    >
      <TooltipCard
        {...restProps}
        animate={animate}
        arrow={arrowProp}
        arrowRef={setArrow}
        arrowX={arrowX}
        arrowY={arrowY}
        originX={originX}
        originY={originY}
        padding={padding}
        placement={placement}
        radius={radius}
        ref={setFloating}
        scheme={scheme}
        shadow={shadow}
      >
        {content}
      </TooltipCard>
    </Layer>
  )

  const tooltipNode = portalProp ? <Portal __unstable_name={portalName}>{tooltip}</Portal> : tooltip

  const tooltipActivity = animate ? (
    <AnimateActivity layoutMode="default" mode={showTooltip ? 'visible' : 'hidden'}>
      {tooltipNode}
    </AnimateActivity>
  ) : (
    <Activity mode={showTooltip ? 'visible' : 'hidden'}>{tooltipNode}</Activity>
  )

  // The fragment has the same shape whether or not the tooltip is disabled, so the referred
  // element keeps its fiber (DOM node, state, focus) when `disabled` toggles. Returning the bare
  // child while disabled would change the tree shape and remount it. While disabled the tooltip
  // slot is left empty: no hidden tooltip DOM is rendered.
  return (
    <>
      {/* the tooltip */}
      {disabled ? null : tooltipActivity}

      {/* the referred element */}
      {child}
    </>
  )
}

/**
 * A ref that always holds the latest `value`, updated before any layout effect of the same commit
 * runs (the same mechanism `use-effect-event` uses), for callbacks that run outside render.
 */
function useLatestRef<T>(value: T): React.RefObject<T> {
  const ref = useRef(value)

  useInsertionEffect(() => {
    ref.current = value
  }, [value])

  return ref
}

type ElementRef = React.RefObject<HTMLElement | null>

/**
 * Derivable middleware options that read the boundary element from a ref. Floating UI evaluates
 * them inside `computePosition`, which is when the ref is read — never during render.
 *
 * Built at module scope, like `sizeMiddleware` below: a `ref.current` read inside a callback
 * created during render makes the React Compiler skip the calling function, since it cannot tell
 * when the callback runs.
 */
function withBoundary<Options extends object>(
  boundaryRef: ElementRef,
  options: Options,
): () => Options & {boundary: HTMLElement | undefined} {
  return () => ({...options, boundary: boundaryRef.current || undefined})
}

/**
 * Caps the tooltip width to the room it is positioned in: the boundary element (or the clipping
 * ancestors when there is none), always within the viewport, and the portal element's width.
 * Floating UI measures inside its own positioning pass — only while the tooltip is shown, never
 * during render or on mount — and the width is written straight to the element, so no state or
 * layout effect is involved. Placed after `shift` so `availableWidth` is the full clipping width
 * for top and bottom placements; for left and right placements it is the room on that side.
 */
function sizeMiddleware({
  boundaryRef,
  portalRef,
  rootBoundary,
}: {
  boundaryRef: ElementRef
  portalRef: ElementRef
  rootBoundary: RootBoundary
}): Middleware {
  return size(() => ({
    boundary: boundaryRef.current || undefined,
    rootBoundary,
    padding: DEFAULT_TOOLTIP_PADDING,
    async apply(state) {
      const {availableWidth, elements} = state
      const portalElement = portalRef.current
      let maxWidth = availableWidth

      // A tooltip rendered in a portal is capped to the portal's width as well, which may be
      // narrower than the boundary (see the CustomPortal story). The portal is measured on its
      // own rather than as part of `boundary`: an element array is the intersection of the rects,
      // and the portal need not overlap the boundary at all. A portal without a width — an empty
      // mount point — imposes no cap, as before.
      if (portalElement) {
        const overflow = await detectOverflow(state, {
          boundary: portalElement,
          rootBoundary,
          padding: DEFAULT_TOOLTIP_PADDING,
        })
        // The portal's clipping width minus the padding on both sides, wherever the tooltip is
        const portalWidth = state.rects.floating.width - overflow.left - overflow.right

        if (portalWidth > 0) maxWidth = Math.min(maxWidth, portalWidth)
      }

      // No room on the chosen side gives a negative width: the cap is clamped to zero rather than
      // removed, so the tooltip never grows across the boundary.
      elements.floating.style.maxWidth = `${Math.max(0, maxWidth)}px`
    },
  }))
}

function useMiddleware({
  animate,
  arrowProp,
  arrowRef,
  boundaryElement,
  fallbackPlacements,
  portalElement,
  rootBoundary,
}: {
  animate: boolean
  arrowProp: boolean
  arrowRef: React.RefObject<HTMLDivElement | null>
  boundaryElement: HTMLElement | null
  fallbackPlacements: Placement[]
  portalElement: HTMLElement | null
  rootBoundary: RootBoundary
}) {
  // The elements are read through refs when Floating UI runs the middleware — inside
  // `computePosition`, never during render — so the middleware array keeps its identity when an
  // element changes, and with it Floating UI's `update` callback and `autoUpdate` subscription.
  // Passing the elements as option values would make `useFloating` deep-compare them on every
  // render (it has no DOM element case: two elements are equal unless their own enumerable
  // properties differ, which for React-rendered elements means walking their fibers), and an
  // element captured by a closure such as `apply` would never be noticed at all, since functions
  // are compared by source. The component repositions a shown tooltip itself when an element
  // changes (see `useLayoutEffect` in `Tooltip`).
  const boundaryRef = useLatestRef(boundaryElement)
  const portalRef = useLatestRef(portalElement)

  return useMemo(() => {
    const ret: Middleware[] = []

    // Flip the floating element when leaving the boundary box
    ret.push(
      flip(
        withBoundary(boundaryRef, {
          fallbackPlacements,
          padding: DEFAULT_TOOLTIP_PADDING,
          rootBoundary,
        }),
      ),
    )

    // Define distance between reference and floating element
    ret.push(offset({mainAxis: DEFAULT_TOOLTIP_DISTANCE}))

    // Shift the tooltip so its sits with the boundary element
    ret.push(shift(withBoundary(boundaryRef, {rootBoundary, padding: DEFAULT_TOOLTIP_PADDING})))

    // Cap the tooltip width to the boundary, viewport and portal
    ret.push(sizeMiddleware({boundaryRef, portalRef, rootBoundary}))

    // Place arrow
    if (arrowProp) {
      ret.push(arrow({element: arrowRef, padding: DEFAULT_TOOLTIP_PADDING}))
    }

    // Determine the origin to scale from.
    // Must be placed after `size` and `shift` middleware.
    if (animate) {
      ret.push(origin)
    }

    return ret
  }, [animate, arrowProp, arrowRef, boundaryRef, fallbackPlacements, portalRef, rootBoundary])
}

/**
 * As `useEffectEvent` should never be passed to other components or hooks, this custom hook groups together the `useEffectEvent` and the `useEffect` hook using it.
 * @see https://19.react.dev/learn/separating-events-from-effects#reading-latest-props-and-state-with-effect-events:~:text=Never%20pass%20them%20to%20other%20components%20or%20Hooks
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
  // we use a "effect event" (https://19.react.dev/learn/separating-events-from-effects#reading-latest-props-and-state-with-effect-events)
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

    // oxlint-disable-next-line consistent-return
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isInsideGroup, showTooltip])
}
