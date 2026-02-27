import {autoUpdate, type RootBoundary, useFloating} from '@floating-ui/react-dom'
import {
  _getResponsiveProp,
  type Assign,
  getElementRef,
  type Placement,
  Z_OFFSETS,
} from '@sanity/ui/core'
import {type MaxWidth, popover as popoverCss, type ResponsiveProp} from '@sanity/ui/css'
import {usePrefersReducedMotion} from '@sanity/ui/hooks'
import {useLayer} from '@sanity/ui/primitives/layer'
import {BoundaryElementContext} from '@sanity/ui/utils/boundary-element'
import {Portal} from '@sanity/ui/utils/portal'
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

import {
  DEFAULT_FALLBACK_PLACEMENTS,
  DEFAULT_POPOVER_DISTANCE,
  DEFAULT_POPOVER_MARGINS,
} from './constants'
import {PopoverLayer, type PopoverLayerOwnProps, type PopoverLayerProps} from './PopoverLayer'
import type {PopoverMargins, PopoverUpdateCallback} from './types'
import {useMiddleware} from './useMiddleware'

/**
 * Own props for the {@link Popover} component.
 *
 * @remarks
 * Extends {@link PopoverLayerOwnProps} (with `maxWidth` omitted) to provide
 * positioning, overflow, and portal behavior for floating content.
 *
 * @public
 */
export type PopoverOwnProps = Omit<PopoverLayerOwnProps, 'maxWidth'> & {
  /**
   * The distance in pixels between the popover and its reference element.
   *
   * @beta Do not use in production.
   */
  __unstable_distance?: number
  /**
   * Custom margin offsets for the popover.
   *
   * @beta Do not use in production.
   * @deprecated Will be removed in the next major version.
   */
  __unstable_margins?: PopoverMargins
  /**
   * The amount of shift in pixels to apply when the popover overflows its boundary.
   *
   * @beta Do not use in production.
   */
  __unstable_shift?: number

  /**
   * @deprecated Will be removed in the next major version.
   */
  arrow?: boolean

  /**
   * The reference element that the popover is anchored to.
   *
   * @remarks
   * Must be a single React element that accepts a `ref` prop. The popover
   * positions itself relative to this element.
   */
  children?: ReactElement<{ref: ForwardedRef<HTMLElement>}>

  /**
   * When `true`, prevents overflow within the current boundary by flipping
   * on its side axis and resizing.
   *
   * @remarks
   * Setting `preventOverflow` to `true` also prevents overflow on its side axis.
   * Setting `matchReferenceWidth` to `true` also causes the popover to resize.
   */
  constrainSize?: boolean

  /**
   * The content to render inside the popover.
   */
  content?: ReactNode

  /**
   * When `true`, disables the popover and renders only the child element.
   */
  disabled?: boolean

  /**
   * An ordered list of fallback placements to try when the preferred
   * placement does not fit within the boundary.
   */
  fallbackPlacements?: Placement[]

  /**
   * The boundary element used to detect overflow when positioning the
   * floating popover.
   */
  floatingBoundary?: HTMLElement | null

  /**
   * When `true`, sets the maximum width to match the reference element
   * and prevents overflow within the current boundary by resizing.
   *
   * @remarks
   * Setting `constrainSize` to `true` also causes the popover to resize.
   */
  matchReferenceWidth?: boolean

  /**
   * When `true`, blocks all pointer interaction with elements beneath
   * the popover until closed.
   *
   * @beta
   */
  modal?: boolean

  /**
   * Controls whether the popover is visible.
   */
  open?: boolean

  /**
   * The preferred placement of the popover relative to its reference element.
   */
  placement?: Placement

  /**
   * The strategy used to determine the final placement when the preferred
   * placement overflows.
   *
   * @remarks
   * When `"flip"` (default), placements are tried in order from the initial
   * placement and fallback placements. When `"autoPlacement"`, all placements
   * are evaluated and the one with the most available viewport space is used.
   *
   * Only relevant when `constrainSize` or `preventOverflow` is `true`.
   */
  placementStrategy?: 'flip' | 'autoPlacement'

  /**
   * Whether or not to render the popover in a portal element.
   *
   * @remarks
   * When `true`, renders in the default portal. When a string is provided,
   * renders in the named portal.
   */
  portal?: boolean | string

  /**
   * When `true`, shifts the popover to prevent it from overflowing
   * its boundary.
   */
  preventOverflow?: boolean

  /**
   * The boundary element used to detect overflow for the reference element.
   */
  referenceBoundary?: HTMLElement | null

  /**
   * When defined, the popover is positioned relative to this element instead
   * of the `children` element. When set, the children are not rendered.
   */
  referenceElement?: HTMLElement | null

  /**
   * A ref that receives the popover's `update` function for programmatic
   * repositioning.
   *
   * @beta
   */
  updateRef?: Ref<PopoverUpdateCallback | undefined>

  /**
   * Sets the maximum width of the popover. Supports responsive values.
   */
  width?: ResponsiveProp<MaxWidth>
}

/**
 * Accepted values for the `as` prop of the {@link Popover} component.
 *
 * @public
 */
export type PopoverElementType = 'div'

/**
 * Props for the {@link Popover} component.
 *
 * @remarks
 * Combines {@link PopoverOwnProps} with {@link PopoverLayerProps} to provide
 * full control over the popover's positioning, content, and visual treatment.
 *
 * @public
 */
export type PopoverProps = Assign<PopoverLayerProps, PopoverOwnProps>

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
 * The `Popover` component displays floating content anchored to a reference element.
 *
 * @remarks
 * `Popover` uses Floating UI to position its content relative to a child reference
 * element. It supports automatic flipping, overflow prevention, size constraining,
 * portal rendering, and optional modal behavior that blocks interaction with
 * elements behind the popover.
 *
 * @public
 */
export function Popover(props: PopoverProps): React.JSX.Element {
  const {
    __unstable_margins: _margins = DEFAULT_POPOVER_MARGINS, // TODO: remove this
    __unstable_distance: distance = DEFAULT_POPOVER_DISTANCE,
    __unstable_shift: shift = 0,
    animate: _animate = false,
    arrow: _arrow, // TODO: remove this
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
    placement: placement = 'bottom',
    placementStrategy = 'flip',
    portal = true,
    preventOverflow = true,
    radius = 4,
    ref: forwardedRef,
    referenceBoundary: _referenceBoundary,
    referenceElement,
    shadow = 3,
    width: widthProp = 'auto',
    zOffset = Z_OFFSETS.popover,
    updateRef,
    ...rest
  } = props
  const fallbackPlacements =
    _fallbackPlacements ?? DEFAULT_FALLBACK_PLACEMENTS[props.placement ?? 'bottom']
  const floatingBoundary = _floatingBoundary ?? use(BoundaryElementContext)
  const referenceBoundary = _referenceBoundary ?? use(BoundaryElementContext)

  const prefersReducedMotion = usePrefersReducedMotion()
  const animate = prefersReducedMotion ? false : _animate
  const ref = useRef<HTMLDivElement | null>(null)
  const rootBoundary: RootBoundary = 'viewport'

  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(forwardedRef, () => ref.current)

  // Keep track of reference element width (see `size` middleware below)
  const referenceWidthRef = useRef<number>(undefined)

  const middleware = useMiddleware({
    animate,
    constrainSize,
    distance,
    fallbackPlacements,
    floatingBoundary,
    matchReferenceWidth,
    placement,
    placementStrategy,
    preventOverflow,
    referenceBoundary,
    referenceWidthRef,
    rootBoundary,
    shift,
  })

  const {x, y, middlewareData, refs, strategy, update} = useFloating({
    middleware,
    placement: placement,
    whileElementsMounted: autoUpdate,
    elements: referenceElement
      ? {
          reference: referenceElement,
        }
      : undefined,
  })

  const referenceHidden = middlewareData.hide?.referenceHidden

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
        ref={setFloating}
        animate={animate}
        className={popoverCss({className})}
        hidden={referenceHidden}
        maxWidth={widthProp}
        originX={originX}
        originY={originY}
        overflow={overflow}
        padding={padding}
        radius={radius}
        shadow={shadow}
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
    children = (
      <Portal __unstable_name={typeof portal === 'string' ? portal : undefined}>{node}</Portal>
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
