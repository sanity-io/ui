import {autoUpdate, type RootBoundary, useFloating} from '@floating-ui/react-dom'
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
import {usePrefersReducedMotion} from '../../hooks/usePrefersReducedMotion'
import type {Assign, Placement} from '../../types'
import {BoundaryElementContext} from '../../utils/boundaryElement/BoundaryElementContext'
import {getElementRef} from '../../utils/getElementRef'
import {Portal} from '../../utils/portal/Portal'
import {useLayer} from '../layer/useLayer'
import {
  DEFAULT_FALLBACK_PLACEMENTS,
  DEFAULT_POPOVER_DISTANCE,
  DEFAULT_POPOVER_MARGINS,
} from './constants'
import {PopoverLayer, type PopoverLayerOwnProps, type PopoverLayerProps} from './PopoverLayer'
import type {PopoverMargins, PopoverUpdateCallback} from './types'
import {useMiddleware} from './useMiddleware'

/** @public */
export type PopoverOwnProps = Omit<PopoverLayerOwnProps, 'maxWidth'> & {
  /** @beta */
  __unstable_distance?: number
  /**
   * @beta
   * @deprecated Will be removed in the next major version */
  __unstable_margins?: PopoverMargins
  /** @beta */
  __unstable_shift?: number

  /**
   * @public
   * @deprecated Will be removed in the next major version
   */
  arrow?: boolean
  children?: ReactElement<{ref: ForwardedRef<HTMLElement>}>
  /**
   * When `true`, prevent overflow within the current boundary:
   * - by flipping on its side axis
   * - by resizing
   *
   * Note that:
   * - setting `preventOverflow` to `true` also prevents overflow on its side axis
   * - setting `matchReferenceWidth` to `true` also causes the popover to resize
   *
   * @defaultValue false
   */
  constrainSize?: boolean
  content?: ReactNode
  disabled?: boolean
  fallbackPlacements?: Placement[]
  floatingBoundary?: HTMLElement | null
  /**
   * When `true`, set the maximum width to match the reference element, and also prevent overflow within
   * the current boundary by resizing.
   *
   * Note that setting `constrainSize` to `true` also causes the popover to resize
   *
   * @defaultValue false
   */
  matchReferenceWidth?: boolean
  /**
   * When true, blocks all pointer interaction with elements beneath the popover until closed.
   *
   * @beta
   * @defaultValue false
   */
  modal?: boolean
  open?: boolean
  placement?: Placement
  /**
   * When 'flip' (default), the placement is determined from the initial placement and the
   * fallback placements in order. Whichever fits in the viewport first.
   *
   * When 'autoPlacement', the initial placement and all fallback placements are evaluated
   * and the placement with the most viewport space available.
   *
   * Option is only relevant if either `constrainSize` or `preventOverflow` is `true`
   */
  placementStrategy?: 'flip' | 'autoPlacement'
  /** Whether or not to render the popover in a portal element. */
  portal?: boolean | string
  preventOverflow?: boolean
  referenceBoundary?: HTMLElement | null
  /**
   * When defined, the popover will be positioned relative to this element.
   * The children of the popover won't be rendered.
   */
  referenceElement?: HTMLElement | null
  /** @beta */
  updateRef?: Ref<PopoverUpdateCallback | undefined>
  width?: ResponsiveProp<MaxWidth>
}

/** @public */
export type PopoverElementType = 'div'

/** @public */
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
 * The `Popover` component is used to display some content on top of another.
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
