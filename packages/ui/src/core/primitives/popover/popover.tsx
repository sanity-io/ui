import {
  arrow,
  autoPlacement,
  autoUpdate,
  flip,
  hide,
  Middleware,
  offset,
  RootBoundary,
  shift,
  useFloating,
} from '@floating-ui/react-dom'
import {
  Activity,
  cloneElement,
  type Ref,
  startTransition,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
// Not React's own `useEffectEvent`: on React 19.2 the native hook keeps reading first-render
// values when the calling component is wrapped in `memo` or `forwardRef`
// (https://github.com/facebook/react/issues/34818), and consumers may wrap `Popover` in `memo`.
import {useEffectEvent} from 'use-effect-event'

import {ThemeColorSchemeKey} from '../../../theme/system/color/_system'
import {useLatestRef} from '../../hooks/useLatestRef'
import {useMediaIndex} from '../../hooks/useMediaIndex/useMediaIndex'
import {usePrefersReducedMotion} from '../../hooks/usePrefersReducedMotion'
import {origin} from '../../middleware/origin'
import {withBoundary} from '../../middleware/withBoundary'
import {_elementSizeObserver, ElementRectValue} from '../../observers/elementSizeObserver'
import {_getArrayProp} from '../../styles/helpers'
import {useTheme_v2} from '../../theme/useTheme'
import {BoxOverflow} from '../../types/box'
import {CardTone} from '../../types/card'
import {Placement} from '../../types/placement'
import {PopoverMargins} from '../../types/popover'
import {AnimateActivity} from '../../utils/animateActivity'
import {useBoundaryElement} from '../../utils/boundaryElement/useBoundaryElement'
import {getElementRef} from '../../utils/getElementRef'
import {LayerProps} from '../../utils/layer/layer'
import {LayerProvider} from '../../utils/layer/layerProvider'
import {useLayer} from '../../utils/layer/useLayer'
import {Portal} from '../../utils/portal/portal'
import {ResponsiveRadiusProps, ResponsiveShadowProps} from '../types'
import {
  DEFAULT_FALLBACK_PLACEMENTS,
  DEFAULT_POPOVER_DISTANCE,
  DEFAULT_POPOVER_MARGINS,
  DEFAULT_POPOVER_PADDING,
} from './constants'
import {size} from './floating-ui/size'
import {calcCurrentWidth, calcMaxWidth} from './helpers'
import {PopoverCard} from './popoverCard'
import {PopoverUpdateCallback, PopoverWidth} from './types'

/** @public */
export interface PopoverProps
  extends Omit<LayerProps, 'as'>, ResponsiveRadiusProps, ResponsiveShadowProps {
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
  /** @deprecated Use `floatingBoundary` and/or `referenceBoundary` instead */
  boundaryElement?: never
  children?: React.JSX.Element
  /**
   * When `true`, prevent overflow within the current boundary:
   * - by flipping on its side axis
   * - by resizing
  /*
   * Note that:
   * - setting `preventOverflow` to `true` also prevents overflow on its side axis
   * - setting `matchReferenceWidth` to `true` also causes the popover to resize
   *
   * @defaultValue false
   */
  constrainSize?: boolean
  content?: React.ReactNode
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
  overflow?: BoxOverflow
  padding?: number | number[]
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
  scheme?: ThemeColorSchemeKey
  tone?: CardTone
  /** @beta */
  updateRef?: Ref<PopoverUpdateCallback | undefined>
  width?: PopoverWidth | PopoverWidth[]
}

/**
 * The events on the reference element that count as intent to open the popover. Each precedes the
 * interaction that usually opens a popover: focus before a key press, the pointer entering before
 * a click or a tap.
 */
const INTENT_EVENT_TYPES = ['focusin', 'pointerenter', 'pointerdown'] as const

const ViewportOverlay = () => {
  const {zIndex} = useLayer()

  return (
    <div
      data-ui="PopoverOverlay"
      style={{height: '100vh', inset: 0, position: 'fixed', width: '100vw', zIndex}}
    />
  )
}

/**
 * The `Popover` component is used to display some content on top of another.
 *
 * @public
 */
export function Popover(
  props: PopoverProps &
    Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'children' | 'content' | 'width'>,
): React.JSX.Element {
  const {container, layer} = useTheme_v2()
  const boundaryElementContext = useBoundaryElement()

  const {
    __unstable_margins: margins = DEFAULT_POPOVER_MARGINS,
    animate: _animate = false,
    arrow: arrowProp = false,
    children: childProp,
    constrainSize = false,
    content,
    disabled,
    fallbackPlacements: _fallbackPlacements,
    matchReferenceWidth,
    floatingBoundary: _floatingBoundary,
    modal,
    // oxlint-disable-next-line no-unused-vars
    onActivate,
    open,
    overflow = 'hidden',
    padding: paddingProp,
    placement: placementProp = 'bottom',
    placementStrategy = 'flip',
    portal,
    preventOverflow = true,
    radius: radiusProp = 3,
    ref: forwardedRef,
    referenceBoundary: _referenceBoundary,
    referenceElement,
    scheme,
    shadow: shadowProp = 3,
    tone = 'inherit',
    width: widthProp = 'auto',
    zOffset: _zOffsetProp,
    updateRef,
    ...restProps
  } = props
  const fallbackPlacements =
    _fallbackPlacements ?? DEFAULT_FALLBACK_PLACEMENTS[props.placement ?? 'bottom']
  const floatingBoundary = _floatingBoundary ?? boundaryElementContext.element
  const referenceBoundary = _referenceBoundary ?? boundaryElementContext.element
  // Max-width uses BoundaryElementProvider when present; otherwise the floating
  // boundary (same element the old `boundaryElement` prop used for both).
  const boundaryElement = boundaryElementContext.element ?? floatingBoundary
  const zOffsetProp = _zOffsetProp ?? layer.popover.zOffset
  const prefersReducedMotion = usePrefersReducedMotion()
  const animate = prefersReducedMotion ? false : _animate

  // Opening renders the popover whether or not any intent preceded it. A `disabled` popover
  // renders only its child, so neither `open` nor intent counts while it is disabled: otherwise
  // enabling it later would render it hidden without it ever having opened or been about to.
  const isOpen = Boolean(open) && !disabled

  const boundarySize = useBoundarySize(boundaryElement, isOpen)
  const padding = _getArrayProp(paddingProp)
  const radius = _getArrayProp(radiusProp)
  const shadow = _getArrayProp(shadowProp)
  const widthArrayProp = _getArrayProp(widthProp)
  const zOffset = _getArrayProp(zOffsetProp)
  const ref = useRef<HTMLDivElement | null>(null)
  const arrowRef = useRef<HTMLDivElement | null>(null)
  const rootBoundary: RootBoundary = 'viewport'

  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(forwardedRef, () => ref.current)

  const mediaIndex = useMediaIndex()
  const boundaryWidth = constrainSize || preventOverflow ? boundarySize?.width : undefined

  // The width the `width` property resolves to at the current media index, and the cap that it and
  // the boundary width give. Both are rendered on the card, except where the `size` middleware
  // writes the property to the element itself during positioning (see `size.ts`): the width when
  // it matches the reference element's, the max width (and max height) when `constrainSize` caps
  // it to the available room as well. The card is passed `undefined` for a property while the
  // middleware owns it — React never touches a style it did not render, so the middleware's write
  // stands across renders — and a value or `''` otherwise, so that React clears the middleware's
  // write once the property is React's again (`matchReferenceWidth` or `constrainSize` turned
  // off), open or closed.
  const width = calcCurrentWidth({
    container,
    mediaIndex,
    width: widthArrayProp,
  })
  const maxWidth = calcMaxWidth({boundaryWidth, currentWidth: width})
  // Read by the `size` middleware on every positioning pass (see `size.ts`), so that a change of
  // the max width does not recreate the middleware: `useFloating` would re-render for the new
  // array and restart `autoUpdate` for it. Kept current by the layout effect below.
  const maxWidthRef = useRef(maxWidth)

  const middleware = useMiddleware({
    animate,
    arrowProp,
    arrowRef,
    constrainSize,
    fallbackPlacements,
    floatingBoundary,
    margins,
    matchReferenceWidth,
    maxWidthRef,
    placementProp,
    placementStrategy,
    preventOverflow,
    referenceBoundary,
    rootBoundary,
  })

  const {x, y, elements, middlewareData, placement, refs, strategy, update} =
    useFloating<HTMLElement>({
      middleware,
      placement: placementProp,
      whileElementsMounted: autoUpdate,
      elements: referenceElement
        ? {
            reference: referenceElement,
          }
        : undefined,
    })

  // The middleware reads the boundaries and the max width through refs (see `useMiddleware` and
  // `size.ts`), so a change of either does not reach Floating UI by itself: an open popover is
  // repositioned here when they change, without tearing `autoUpdate` down — unless Floating UI
  // runs a pass of its own in this commit anyway, which reads the refs: in the commit in which it
  // received the floating element (the one right after the popover opened, where the boundary
  // measured in the opening commit by `useBoundarySize` lands too) `autoUpdate` starts with a pass,
  // and when `constrainSize` toggled the middleware changed and `autoUpdate` restarts with one.
  // While closed there is no element to position. The max width is only read under
  // `constrainSize`; React renders it otherwise. A layout effect is early enough to write that
  // ref: Floating UI awaits the element measurements before it runs any middleware, so even the
  // pass `autoUpdate` starts in this commit reads the ref one microtask later at the earliest.
  const reposition = useEffectEvent(() => update())
  const floatingElement = elements.floating
  const positionedRef = useRef<{
    constrainSize: boolean
    element: HTMLElement | null
    floatingBoundary: HTMLElement | null
    maxWidth: number | undefined
    referenceBoundary: HTMLElement | null
  }>({
    constrainSize: false,
    element: null,
    floatingBoundary: null,
    maxWidth: undefined,
    referenceBoundary: null,
  })

  useLayoutEffect(() => {
    maxWidthRef.current = maxWidth

    const previous = positionedRef.current

    positionedRef.current = {
      constrainSize,
      element: floatingElement,
      floatingBoundary,
      maxWidth,
      referenceBoundary,
    }

    if (
      floatingElement === null ||
      floatingElement !== previous.element ||
      constrainSize !== previous.constrainSize
    ) {
      return
    }

    const boundaryChanged =
      floatingBoundary !== previous.floatingBoundary ||
      referenceBoundary !== previous.referenceBoundary
    const maxWidthChanged = constrainSize && maxWidth !== previous.maxWidth

    if (boundaryChanged || maxWidthChanged) reposition()
  }, [constrainSize, floatingBoundary, floatingElement, maxWidth, referenceBoundary])

  // Whether the popover (card, portal and `content`) has been rendered yet. Closed popovers
  // render inside a hidden `<Activity>`, so whatever is rendered while closed is pre-rendered DOM
  // that only pays off if the popover opens. Nothing is rendered until the popover opens or the
  // reference element shows intent to open it (see `INTENT_EVENT_TYPES`), and from then on it
  // stays rendered so the state of its `content` survives reopening. Consumers that do not want
  // a popover pre-rendered on intent can leave `content` empty until it opens.
  const [hasRendered, setHasRendered] = useState(false)

  if (isOpen && !hasRendered) setHasRendered(true)

  const shouldRender = isOpen || hasRendered
  // The element to listen to for intent to open the popover: none once the popover has rendered,
  // since there is nothing left to pre-render, and none while disabled, which also drops the
  // listeners of a popover that was enabled before
  const intentReference = shouldRender || disabled ? null : elements.reference

  useEffect(() => {
    if (!intentReference) return undefined

    const controller = new AbortController()
    const {signal} = controller
    // In a transition, so that it never holds up an open that follows right away (a click), and
    // so that React pre-renders the hidden popover in the background
    const handleIntent = () => startTransition(() => setHasRendered(true))

    // `focusin` rather than `focus` so that focus landing inside the reference element counts too.
    // `pointerdown` is a fallback for a pointer that was already over the element when it
    // rendered, which fires no `pointerenter`.
    for (const type of INTENT_EVENT_TYPES) {
      intentReference.addEventListener(type, handleIntent, {signal})
    }

    // Focus that landed before the listeners did (an `autoFocus` reference, a `referenceElement`
    // that was focused already) fired its `focusin` unheard, so count it now
    const {activeElement} = intentReference.ownerDocument

    if (activeElement && intentReference.contains(activeElement)) handleIntent()

    return () => controller.abort()
  }, [intentReference])

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

  const popover = (
    <LayerProvider zOffset={zOffset}>
      {/* Optional transparent blocking overlay at the top-most z-index layer. Must be positioned before the below popover card. */}
      {modal && <ViewportOverlay />}

      <PopoverCard
        {...restProps}
        __unstable_margins={margins}
        animate={animate}
        arrow={arrowProp}
        arrowRef={setArrow}
        arrowX={arrowX}
        arrowY={arrowY}
        hidden={referenceHidden}
        maxHeight={constrainSize ? undefined : ''}
        maxWidth={constrainSize ? undefined : (maxWidth ?? '')}
        overflow={overflow}
        padding={padding}
        placement={placement}
        radius={radius}
        ref={setFloating}
        scheme={scheme}
        shadow={shadow}
        originX={originX}
        originY={originY}
        strategy={strategy}
        tone={tone}
        width={matchReferenceWidth ? undefined : (width ?? '')}
        x={x}
        y={y}
      >
        {content}
      </PopoverCard>
    </LayerProvider>
  )

  const popoverNode = portal ? (
    <Portal __unstable_name={typeof portal === 'string' ? portal : undefined}>{popover}</Portal>
  ) : (
    popover
  )

  return (
    <>
      {/* the popover (not rendered until it opens or is about to, see `hasRendered`) */}
      {animate ? (
        <AnimateActivity layoutMode="default" mode={open ? 'visible' : 'hidden'}>
          {shouldRender ? popoverNode : null}
        </AnimateActivity>
      ) : (
        <Activity mode={open ? 'visible' : 'hidden'}>{shouldRender ? popoverNode : null}</Activity>
      )}

      {/* the referred element */}
      {child}
    </>
  )
}

/**
 * The border-box size of the boundary element in whole pixels, tracked only while the popover is
 * open.
 *
 * Closed popovers have nothing to size, so they hold no `ResizeObserver` subscription and do not
 * re-render when the boundary resizes (one subscription per popover, every closed popover
 * re-rendering on every boundary resize, is what this replaces). The boundary is measured
 * synchronously in a layout effect when the popover opens, so the max width is right in the first
 * painted frame instead of one `ResizeObserver` callback later; the shared observer takes over
 * from there. The last size is kept while closed.
 *
 * Both measurements are rounded to whole pixels so that they agree: the observer's first delivery
 * must not change the size the opening commit measured, or the max width would be corrected a
 * frame later after all. See `measureBorderBox`.
 */
function useBoundarySize(element: HTMLElement | null, open: boolean): ElementRectValue | undefined {
  const [size, setSize] = useState<ElementRectValue | undefined>(undefined)

  useLayoutEffect(() => {
    if (!open || !element) return undefined

    // Measuring the boundary is what this effect is for: the DOM is only measurable after the
    // commit, and the result has to be in the next paint
    // oxlint-disable-next-line react/set-state-in-effect
    setSize((prev) => sameSize(prev, measureBorderBox(element)))

    return _elementSizeObserver.subscribe(element, ({border}) =>
      setSize((prev) =>
        sameSize(prev, {width: Math.round(border.width), height: Math.round(border.height)}),
      ),
    )
  }, [element, open])

  return size
}

/**
 * The border-box size of an element in whole pixels, the way `_elementSizeObserver` reports it:
 * from `ResizeObserverEntry.borderBoxSize`, which is the layout size with no CSS transform or
 * `zoom` applied, in the element's writing mode (`inlineSize` as `width`, `blockSize` as
 * `height`), rounded by `useBoundarySize`. `offsetWidth`/`offsetHeight` are that same untransformed
 * border box rounded to whole pixels. `getBoundingClientRect` would include transforms (a boundary
 * mid scale animation) and `zoom`, and `getComputedStyle` serializes lengths with limited
 * precision, so neither agrees with the observer for every element.
 *
 * Kept at module scope on purpose: reading the offset size forces a synchronous layout, and the
 * React Compiler (which the package build runs) lifts a member expression on an element captured
 * by a component callback into a memo dependency evaluated during render. A plain function call
 * on the element gives it nothing to lift.
 */
function measureBorderBox(element: HTMLElement): ElementRectValue {
  const {offsetWidth, offsetHeight} = element

  if (getComputedStyle(element).writingMode.startsWith('horizontal')) {
    return {width: offsetWidth, height: offsetHeight}
  }

  // In a vertical writing mode the inline size is the physical height
  return {width: offsetHeight, height: offsetWidth}
}

/** Keeps the previous object when the size has not changed, so `setState` bails out */
function sameSize(prev: ElementRectValue | undefined, next: ElementRectValue): ElementRectValue {
  return prev && prev.width === next.width && prev.height === next.height ? prev : next
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
  maxWidthRef,
  placementProp,
  placementStrategy,
  preventOverflow,
  referenceBoundary,
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
  maxWidthRef: React.RefObject<number | undefined>
  placementProp: Placement
  placementStrategy: 'flip' | 'autoPlacement'
  preventOverflow: boolean
  referenceBoundary: HTMLElement | null
  rootBoundary: RootBoundary
}) {
  // The boundaries are read through refs when Floating UI runs the middleware (see
  // `withBoundary`), so the middleware array keeps its identity when a boundary element changes —
  // and with it `useFloating`'s `update` callback and `autoUpdate` subscription, which a new array
  // would re-create and restart. The component repositions an open popover itself when a boundary
  // changes (see `useLayoutEffect` in `Popover`).
  const floatingBoundaryRef = useLatestRef(floatingBoundary)
  const referenceBoundaryRef = useLatestRef(referenceBoundary)

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
          flip(
            withBoundary(floatingBoundaryRef, {
              fallbackPlacements,
              padding: DEFAULT_POPOVER_PADDING,
              rootBoundary,
            }),
          ),
        )
      }
    }

    // Define distance between reference and floating element
    ret.push(offset({mainAxis: DEFAULT_POPOVER_DISTANCE}))

    // Track sizes
    if (constrainSize || matchReferenceWidth) {
      ret.push(
        size({
          boundaryRef: floatingBoundaryRef,
          constrainSize,
          margins,
          matchReferenceWidth,
          maxWidthRef,
          padding: DEFAULT_POPOVER_PADDING,
        }),
      )
    }

    // Shift the popover so its sits within the boundary element
    if (preventOverflow) {
      ret.push(
        shift(withBoundary(floatingBoundaryRef, {rootBoundary, padding: DEFAULT_POPOVER_PADDING})),
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
      hide(
        withBoundary(referenceBoundaryRef, {
          padding: DEFAULT_POPOVER_PADDING,
          strategy: 'referenceHidden',
        }),
      ),
    )

    return ret
  }, [
    animate,
    arrowProp,
    arrowRef,
    constrainSize,
    fallbackPlacements,
    floatingBoundaryRef,
    margins,
    matchReferenceWidth,
    maxWidthRef,
    placementProp,
    placementStrategy,
    preventOverflow,
    referenceBoundaryRef,
    rootBoundary,
  ])
}
