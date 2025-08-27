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
import {AnimatePresence} from 'framer-motion'
import {
  cloneElement,
  type ForwardedRef,
  type ReactElement,
  type ReactNode,
  type Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'

import {Z_OFFSETS} from '../../constants'
import {usePrefersReducedMotion} from '../../hooks/usePrefersReducedMotion'
import {useResponsiveProp} from '../../hooks/useResponsiveProp'
import {origin} from '../../middleware/origin'
import type {ComponentType, Placement, Props} from '../../types'
import {useBoundaryElement} from '../../utils/boundaryElement/useBoundaryElement'
import {getElementRef} from '../../utils/getElementRef'
import {Portal} from '../../utils/portal/Portal'
import {CardProvider} from '../card/CardProvider'
import {useCard} from '../card/useCard'
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

/** @public */
export const DEFAULT_POPOVER_ELEMENT = 'div'

/** @public */
export type PopoverOwnProps = Omit<LayerOwnProps, 'maxWidth'> & {
  /** @beta */
  __unstable_margins?: PopoverMargins
  /**
   * Whether the popover should animate in and out.
   *
   * @beta
   * @defaultValue false
   */
  animate?: boolean
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
export type PopoverElementType = 'div' | ComponentType

/** @public */
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
 * The `Popover` component is used to display some content on top of another.
 *
 * @public
 */
export function Popover<E extends PopoverElementType = typeof DEFAULT_POPOVER_ELEMENT>(
  props: PopoverProps<E>,
): React.JSX.Element {
  const boundaryElementContext = useBoundaryElement()

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
    fallbackPlacements = props.fallbackPlacements ??
      DEFAULT_FALLBACK_PLACEMENTS[props.placement ?? 'bottom'],
    matchReferenceWidth,
    floatingBoundary = boundaryElementContext.element,
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
    referenceBoundary = boundaryElementContext.element,
    referenceElement,
    scheme,
    shadow = 3,
    tone = 'inherit',
    width: widthProp = 'auto',
    zOffset: zOffsetProp = Z_OFFSETS.popover,
    updateRef,
    ...rest
  } = props as PopoverProps<typeof DEFAULT_POPOVER_ELEMENT>

  const card = useCard()

  const prefersReducedMotion = usePrefersReducedMotion()
  const animate = prefersReducedMotion ? false : _animate
  const zOffset = useResponsiveProp(zOffsetProp)
  const ref = useRef<HTMLDivElement | null>(null)
  const arrowRef = useRef<HTMLDivElement | null>(null)
  const rootBoundary: RootBoundary = 'viewport'

  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(forwardedRef, () => ref.current)

  // Keep track of reference element width (see `size` middleware below)
  const referenceWidthRef = useRef<number>(undefined)

  const middleware = useMemo(() => {
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
          apply({availableWidth, availableHeight, elements, referenceWidth}) {
            // not fresh, so use refs

            referenceWidthRef.current = referenceWidth

            if (matchReferenceWidth) {
              elements.floating.style.width = `${referenceWidth}px`
            }

            if (constrainSize) {
              elements.floating.style.maxWidth = `${availableWidth}px`
              elements.floating.style.maxHeight = `${availableHeight}px`
            }
          },
          boundaryElement: floatingBoundary || undefined,
          constrainSize,
          margins,
          matchReferenceWidth,
          padding: DEFAULT_POPOVER_PADDING,
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
    constrainSize,
    fallbackPlacements,
    floatingBoundary,
    placementProp,
    placementStrategy,
    margins,
    matchReferenceWidth,
    preventOverflow,
    referenceBoundary,
  ])

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

  const setArrow = useCallback((arrowEl: HTMLDivElement | null) => {
    arrowRef.current = arrowEl
  }, [])

  const setFloating = useCallback(
    (node: HTMLDivElement | null) => {
      ref.current = node
      refs.setFloating(node)
    },
    [refs],
  )

  const setReference = useCallback(
    (node: HTMLElement | null) => {
      refs.setReference(node)

      if (!childProp) return

      const childRef = getElementRef(childProp)

      if (typeof childRef === 'function') {
        childRef(node)
      } else if (childRef) {
        childRef.current = node
      }
    },
    [childProp, refs],
  )

  const child = useMemo(() => {
    // If a reference element is defined, we don't need to clone the child
    if (referenceElement) return childProp

    if (!childProp) return null

    return cloneElement(childProp, {ref: setReference})
  }, [childProp, referenceElement, setReference])

  useEffect(() => {
    if (updateRef) {
      if (typeof updateRef === 'function') {
        updateRef(update)
      } else if (updateRef) {
        updateRef.current = update
      }
    }
  }, [update, updateRef])

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
        arrowRef={setArrow}
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

  const children =
    open &&
    (portal ? (
      <Portal __unstable_name={typeof portal === 'string' ? portal : undefined}>
        <CardProvider tone={tone === 'inherit' ? card.tone : tone} scheme={scheme ?? 'light'}>
          {node}
        </CardProvider>
      </Portal>
    ) : (
      node
    ))

  return (
    <>
      {/* the popover */}
      {animate ? <AnimatePresence>{children}</AnimatePresence> : children}

      {/* the referred element */}
      {child}
    </>
  )
}
