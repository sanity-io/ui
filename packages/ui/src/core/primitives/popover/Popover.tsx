import {
  arrow,
  autoPlacement,
  autoUpdate,
  flip,
  hide,
  type Middleware,
  offset,
  type RootBoundary,
  shift,
  useFloating,
} from '@floating-ui/react-dom'
import {type MaxWidth, popover as popoverCss, type ResponsiveProp} from '@sanity/ui/css'
import {AnimatePresence} from 'motion/react'
import {
  cloneElement,
  type ForwardedRef,
  type ReactElement,
  type ReactNode,
  type Ref,
  use,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'

import {Z_OFFSETS} from '../../constants'
import {_getResponsiveProp} from '../../helpers/props'
import {usePrefersReducedMotion} from '../../hooks/usePrefersReducedMotion'
import {origin} from '../../middleware/origin'
import type {ComponentType, Placement, Props} from '../../types'
import {BoundaryElementContext} from '../../utils/boundaryElement/BoundaryElementContext'
import {getElementRef} from '../../utils/getElementRef'
import {Portal} from '../../utils/portal/Portal'
import {CardContext} from '../card/CardContext'
import {CardProvider} from '../card/CardProvider'
import {assertCardContext} from '../card/useCard'
import {type LayerOwnProps} from '../layer/Layer'
import {useLayer} from '../layer/useLayer'
import {
  DEFAULT_FALLBACK_PLACEMENTS,
  DEFAULT_POPOVER_DISTANCE,
  DEFAULT_POPOVER_MARGINS,
  DEFAULT_POPOVER_PADDING,
} from './constants'
import {size} from './floating-ui/size'
import {PopoverLayer} from './PopoverLayer'
import type {PopoverMargins, PopoverUpdateCallback} from './types'

/**
 * The default HTML element type rendered by the {@link Popover} component.
 *
 * @public
 */
export const DEFAULT_POPOVER_ELEMENT = 'div'

/**
 * Own props for the {@link Popover} component.
 *
 * @remarks
 * Extends {@link LayerOwnProps} (with `maxWidth` omitted) to inherit all card, box,
 * and layer stacking props. Adds floating-UI-specific properties for positioning,
 * overflow handling, animation, and portal rendering.
 *
 * @public
 */
export type PopoverOwnProps = Omit<LayerOwnProps, 'maxWidth'> & {
  /**
   * Custom margin offsets applied when computing the available space for
   * the popover within its boundary.
   *
   * @remarks
   * Provided as a four-element tuple `[top, right, bottom, left]` in pixels.
   * These margins shrink the effective boundary area used by the size and
   * shift middleware.
   *
   * @beta Do not use in production.
   *
   * @defaultValue `[0, 0, 0, 0]`
   */
  __unstable_margins?: PopoverMargins

  /**
   * When `true`, the popover animates in and out using a scale/opacity
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
   * popover toward its reference element.
   *
   * @defaultValue false
   */
  arrow?: boolean

  /**
   * The reference element that the popover is anchored to.
   *
   * @remarks
   * Must be a single React element that accepts a `ref` prop. The `Popover`
   * clones this element and attaches a ref to measure its position and size
   * for floating-UI calculations. If `referenceElement` is provided instead,
   * this child is rendered as-is without ref cloning.
   */
  children?: ReactElement<{ref: ForwardedRef<HTMLElement>}>

  /**
   * When `true`, prevents the popover from overflowing the current boundary
   * by flipping on its side axis and resizing to fit within the available space.
   *
   * @remarks
   * Uses the Floating UI `flip` (or `autoPlacement`) and `size` middleware.
   *
   * Note:
   * - Setting `preventOverflow` to `true` also prevents overflow on the side axis.
   * - Setting `matchReferenceWidth` to `true` also causes the popover to resize.
   *
   * @defaultValue false
   */
  constrainSize?: boolean

  /**
   * The content to render inside the popover floating element.
   *
   * @remarks
   * This is the primary content slot. It is rendered inside a styled
   * {@link PopoverLayer} card when the popover is open.
   */
  content?: ReactNode

  /**
   * When `true`, disables the popover entirely. The `children` element is
   * rendered as-is without any floating behavior or popover content.
   */
  disabled?: boolean

  /**
   * An ordered list of alternative placements to try when the popover
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
   * An HTML element used as the clipping boundary for the floating element.
   *
   * @remarks
   * Determines the area within which the popover's `flip`, `shift`, and `size`
   * middleware operate. When not provided, the nearest boundary element from
   * the `BoundaryElementContext` is used.
   *
   * @defaultValue (from BoundaryElementContext)
   */
  floatingBoundary?: HTMLElement | null

  /**
   * When `true`, sets the popover's maximum width to match the reference
   * element's width, and prevents overflow within the current boundary
   * by resizing.
   *
   * @remarks
   * Uses the Floating UI `size` middleware. Note that setting `constrainSize`
   * to `true` also causes the popover to resize.
   *
   * @defaultValue false
   */
  matchReferenceWidth?: boolean

  /**
   * When `true`, renders a transparent full-viewport overlay beneath the
   * popover that blocks all pointer interaction with elements behind it
   * until the popover is closed.
   *
   * @beta
   *
   * @defaultValue false
   */
  modal?: boolean

  /**
   * Controls whether the popover is currently visible.
   *
   * @remarks
   * When `true`, the popover content is rendered and positioned relative to
   * the reference element. When `false` or `undefined`, the popover content
   * is not rendered (the `children` reference element is still rendered).
   */
  open?: boolean

  /**
   * Sets the preferred placement of the popover relative to its reference element.
   *
   * @remarks
   * The popover will attempt to render at this placement first. If it does not
   * fit, it falls back to the `fallbackPlacements` according to the
   * `placementStrategy`.
   *
   * `"right-start"` | `"right-end"` | `"bottom"` | `"bottom-start"` |
   * `"bottom-end"` | `"left"` | `"left-start"` | `"left-end"`
   *
   * @defaultValue `"bottom"`
   */
  placement?: Placement

  /**
   * Controls the strategy used to determine the final placement when the
   * popover does not fit in the preferred position.
   *
   * @remarks
   * Only relevant when `constrainSize` or `preventOverflow` is `true`.
   *
   * @defaultValue `"flip"`
   */
  placementStrategy?: 'flip' | 'autoPlacement'

  /**
   * Controls whether the popover content is rendered inside a portal element.
   *
   * @remarks
   * When `true`, the popover is rendered into the default portal element
   * registered with the nearest `PortalProvider`. When a string is provided,
   * it is used as the name of a named portal element. When `false` or
   * `undefined`, the popover is rendered in place.
   */
  portal?: boolean | string

  /**
   * When `true`, shifts the popover along its side axis so it remains within
   * the boundary element, and flips it when it would otherwise overflow.
   *
   * @remarks
   * Uses the Floating UI `shift` middleware (and `flip` when combined with
   * `constrainSize`).
   *
   * @defaultValue true
   */
  preventOverflow?: boolean

  /**
   * An HTML element used as the clipping boundary for detecting whether the
   * reference element is hidden (scrolled out of view).
   *
   * @remarks
   * When the reference element is scrolled outside of this boundary, the
   * popover is hidden via the Floating UI `hide` middleware. When not
   * provided, the nearest boundary element from the `BoundaryElementContext`
   * is used.
   *
   * @defaultValue (from BoundaryElementContext)
   */
  referenceBoundary?: HTMLElement | null

  /**
   * When provided, the popover is positioned relative to this DOM element
   * instead of its `children` element.
   *
   * @remarks
   * When a `referenceElement` is specified, the `children` element is still
   * rendered but is not used for positioning. The popover measures and tracks
   * the `referenceElement` for all Floating UI calculations.
   */
  referenceElement?: HTMLElement | null

  /**
   * A ref that receives the Floating UI `update` function, allowing the
   * consumer to imperatively recompute the popover's position.
   *
   * @beta Do not use in production.
   */
  updateRef?: Ref<PopoverUpdateCallback | undefined>

  /**
   * Sets the maximum width of the popover content area.
   *
   * @remarks
   * Uses the container width scale from the theme, plus the special values
   * `"auto"` and `"fill"`. Supports responsive values.
   *
   * @defaultValue `"auto"`
   */
  width?: ResponsiveProp<MaxWidth>
}

/**
 * Accepted values for the `as` prop of the {@link Popover} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `Popover`.
 *
 * @public
 */
export type PopoverElementType = 'div' | ComponentType

/**
 * Props for the {@link Popover} component.
 *
 * @remarks
 * Combines {@link PopoverOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<div>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link PopoverElementType}.
 *
 * @public
 */
export type PopoverProps<E extends PopoverElementType = PopoverElementType> = Props<
  PopoverOwnProps,
  E
>

function ViewportOverlay() {
  const {zIndex} = useLayer()

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex,
      }}
    />
  )
}

/**
 * Displays floating content anchored to a reference element, with automatic
 * positioning, overflow handling, and optional arrow indicators.
 *
 * @remarks
 * The `Popover` component uses Floating UI to position a content overlay relative
 * to a reference element (its `children` or a separately provided `referenceElement`).
 * It supports flipping, shifting, resizing to fit within boundaries, arrow rendering,
 * entrance/exit animation, portal rendering, and modal overlay behavior.
 *
 * The popover renders as a {@link Layer}-based card and participates in the design
 * system's managed stacking context. It inherits all visual and layout props from
 * {@link Card} and {@link Box} via {@link LayerOwnProps}.
 *
 * When `open` is `true`, the popover content is rendered and positioned. When
 * `disabled` is `true`, the popover is completely bypassed and only the `children`
 * reference element is rendered.
 *
 * @public
 */
export function Popover<E extends PopoverElementType = typeof DEFAULT_POPOVER_ELEMENT>(
  props: PopoverProps<E>,
): React.JSX.Element {
  const {
    __unstable_margins: margins = DEFAULT_POPOVER_MARGINS,
    animate: _animate = false,
    arrow: arrowProp = false,
    as: as = DEFAULT_POPOVER_ELEMENT,
    children: childProp,
    className,
    constrainSize = false,
    content,
    disabled,
    fallbackPlacements: _fallbackPlacements,
    matchReferenceWidth,
    floatingBoundary: _floatingBoundary,
    modal,
    onActivate,
    open,
    overflow = 'hidden',
    padding,
    placement: placementProp = 'bottom',
    placementStrategy = 'flip',
    portal,
    preventOverflow = true,
    radius = 3,
    ref: forwardedRef,
    referenceBoundary: _referenceBoundary,
    referenceElement,
    scheme,
    shadow = 3,
    tone = 'inherit',
    width: widthProp = 'auto',
    zOffset: zOffsetProp = Z_OFFSETS.popover,
    updateRef,
    ...rest
  } = props as PopoverProps<typeof DEFAULT_POPOVER_ELEMENT>
  const fallbackPlacements =
    _fallbackPlacements ?? DEFAULT_FALLBACK_PLACEMENTS[props.placement ?? 'bottom']
  const floatingBoundary = _floatingBoundary ?? use(BoundaryElementContext)
  const referenceBoundary = _referenceBoundary ?? use(BoundaryElementContext)

  const prefersReducedMotion = usePrefersReducedMotion()
  const animate = prefersReducedMotion ? false : _animate
  const zOffset = useMemo(() => _getResponsiveProp(zOffsetProp), [zOffsetProp])
  const ref = useRef<HTMLDivElement | null>(null)
  const arrowRef = useRef<HTMLDivElement | null>(null)
  const rootBoundary: RootBoundary = 'viewport'

  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(forwardedRef, () => ref.current)

  // Keep track of reference element width (see `size` middleware below)
  const referenceWidthRef = useRef<number>(undefined)

  const middleware = useMiddleware({
    animate,
    arrowProp,
    arrowRef,
    constrainSize,
    fallbackPlacements,
    floatingBoundary,
    margins,
    matchReferenceWidth,
    placementProp,
    placementStrategy,
    preventOverflow,
    referenceBoundary,
    referenceWidthRef,
    rootBoundary,
  })

  const {x, y, middlewareData, placement, refs, strategy, update} = useFloating({
    middleware,
    placement: placementProp,
    whileElementsMounted: autoUpdate,
    elements: referenceElement
      ? {
          reference: referenceElement,
        }
      : undefined,
  })

  const referenceHidden = middlewareData.hide?.referenceHidden

  const arrowX = middlewareData.arrow?.x
  const arrowY = middlewareData.arrow?.y

  const originX = middlewareData['@sanity/ui/origin']?.originX
  const originY = middlewareData['@sanity/ui/origin']?.originY

  const setFloating = useCallback(
    (node: HTMLDivElement | null) => {
      ref.current = node
      refs.setFloating(node)
    },
    [refs],
  )

  // If there's a child then we need to set the reference element to the cloned child ref
  // and if child changes we make sure to update or remove the reference element.
  useImperativeHandle(childProp ? getElementRef(childProp) : null, () => refs.reference.current)

  const child = useMemo(() => {
    // If a reference element is defined, we don't need to clone the child
    if (referenceElement) return childProp

    if (!childProp) return null

    return cloneElement(childProp, {ref: refs.setReference})
  }, [childProp, referenceElement, refs.setReference])

  useImperativeHandle(updateRef, () => update, [update])

  if (disabled) {
    return childProp || <></>
  }

  const node = (
    <>
      {/* Optional transparent blocking overlay at the top-most z-index layer. Must be positioned
      before the below popover card. */}
      {modal && <ViewportOverlay />}

      <PopoverLayer
        {...rest}
        __unstable_margins={margins}
        animate={animate}
        arrow={arrowProp}
        arrowRef={arrowRef}
        arrowX={arrowX}
        arrowY={arrowY}
        as={as}
        className={popoverCss({className})}
        hidden={referenceHidden}
        maxWidth={widthProp}
        overflow={overflow}
        padding={padding}
        placement={placement}
        radius={radius}
        ref={setFloating}
        scheme={scheme}
        shadow={shadow}
        originX={originX}
        originY={originY}
        tone={tone}
        strategy={strategy}
        x={x}
        y={y}
        zOffset={zOffset}
      >
        {content}
      </PopoverLayer>
    </>
  )

  let children = open ? node : null

  if (open && portal) {
    let resolvedTone = tone as Exclude<typeof tone, 'inherit'>
    if (tone === 'inherit') {
      const card = use(CardContext)
      assertCardContext(card)
      resolvedTone = card.tone
    }

    children = (
      <Portal __unstable_name={typeof portal === 'string' ? portal : undefined}>
        <CardProvider tone={resolvedTone} scheme={scheme ?? 'light'}>
          {node}
        </CardProvider>
      </Portal>
    )
  }

  return (
    <>
      {/* the popover */}
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
  constrainSize,
  fallbackPlacements,
  floatingBoundary,
  margins,
  matchReferenceWidth,
  placementProp,
  placementStrategy,
  preventOverflow,
  referenceBoundary,
  referenceWidthRef,
  rootBoundary,
}: {
  animate: boolean
  arrowProp: boolean
  arrowRef: React.RefObject<HTMLDivElement | null>
  constrainSize: boolean
  fallbackPlacements: Placement[]
  floatingBoundary: HTMLElement | null
  margins: PopoverMargins
  matchReferenceWidth: boolean | undefined
  placementProp: Placement
  placementStrategy: 'flip' | 'autoPlacement'
  preventOverflow: boolean
  referenceBoundary: HTMLElement | null
  referenceWidthRef: React.RefObject<number | undefined>
  rootBoundary: RootBoundary
}) {
  return useMemo(() => {
    const ret: Middleware[] = []

    // Flip the floating element when leaving the boundary box
    if (constrainSize || preventOverflow) {
      if (placementStrategy === 'autoPlacement') {
        ret.push(
          autoPlacement({
            allowedPlacements: [placementProp].concat(fallbackPlacements),
          }),
        )
      } else {
        ret.push(
          flip({
            boundary: floatingBoundary || undefined,
            fallbackPlacements,
            padding: DEFAULT_POPOVER_PADDING,
            rootBoundary,
          }),
        )
      }
    }

    // Define distance between reference and floating element
    ret.push(offset({mainAxis: DEFAULT_POPOVER_DISTANCE}))

    // Track sizes
    if (constrainSize || matchReferenceWidth) {
      ret.push(
        size({
          boundaryElement: floatingBoundary || undefined,
          constrainSize,
          margins,
          matchReferenceWidth,
          padding: DEFAULT_POPOVER_PADDING,
          referenceWidthRef,
        }),
      )
    }

    // Shift the popover so its sits within the boundary element
    if (preventOverflow) {
      ret.push(
        shift({
          boundary: floatingBoundary || undefined,
          rootBoundary,
          padding: DEFAULT_POPOVER_PADDING,
        }),
      )
    }

    // Place arrow
    if (arrowProp) {
      ret.push(
        arrow({
          element: arrowRef,
          padding: DEFAULT_POPOVER_PADDING,
        }),
      )
    }

    // Determine the origin to scale from.
    // Must be placed after `@sanity/ui/size` and `shift` middleware.
    if (animate) {
      ret.push(origin)
    }

    ret.push(
      hide({
        boundary: referenceBoundary || undefined,
        padding: DEFAULT_POPOVER_PADDING,
        strategy: 'referenceHidden',
      }),
    )

    return ret
  }, [
    animate,
    arrowProp,
    arrowRef,
    constrainSize,
    fallbackPlacements,
    floatingBoundary,
    margins,
    matchReferenceWidth,
    placementProp,
    placementStrategy,
    preventOverflow,
    referenceBoundary,
    referenceWidthRef,
    rootBoundary,
  ])
}
