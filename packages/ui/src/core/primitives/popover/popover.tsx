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
  type UseFloatingReturn,
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

import {ThemeColorSchemeKey} from '../../../theme/system/color/_system'
import {useLatestRef} from '../../hooks/useLatestRef'
import {useMediaIndex} from '../../hooks/useMediaIndex/useMediaIndex'
import {usePrefersReducedMotion} from '../../hooks/usePrefersReducedMotion'
import {origin} from '../../middleware/origin'
import {_elementSizeObserver, ElementRectValue} from '../../observers/elementSizeObserver'
import {_getArrayProp} from '../../styles/helpers'
import {useTheme_v2} from '../../theme/useTheme'
import {BoxOverflow} from '../../types/box'
import {CardTone} from '../../types/card'
import {Placement} from '../../types/placement'
import {PopoverMargins} from '../../types/popover'
import {AnimateActivity} from '../../utils/animateActivity'
import {attachRef} from '../../utils/attachRef'
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
  /**
   * Whether the popover is open.
   *
   * Set it inside `startTransition`. A closed popover pre-renders its content hidden, in a
   * transition, once the reference element shows intent to open it (focus, a pointer entering or
   * pressing it). Opening in a transition too lets React keep rendering that content in the
   * background when the open comes before it is done, instead of rendering it synchronously in the
   * click. Content that was pre-rendered already shows in the first frame after the click either
   * way.
   *
   * ```tsx
   * const [open, setOpen] = useState(false)
   *
   * <Popover content={content} open={open}>
   *   <Button onClick={() => startTransition(() => setOpen((isOpen) => !isOpen))} text="Toggle" />
   * </Popover>
   * ```
   *
   * Wrap the state update itself: a `startTransition` around code that schedules the update for
   * later (a timeout) does not reach it.
   */
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

/**
 * Calls `handleIntent` whenever `element` shows intent to open the popover, until the returned
 * function is called. `focusin` rather than `focus` so that focus landing inside the reference
 * element counts too. `pointerdown` is a fallback for a pointer that was already over the element
 * when it rendered, which fires no `pointerenter`.
 */
function listenForIntent(element: HTMLElement, handleIntent: () => void): () => void {
  const controller = new AbortController()
  const {signal} = controller

  for (const type of INTENT_EVENT_TYPES) {
    element.addEventListener(type, handleIntent, {signal})
  }

  // Focus that landed before the listeners did (an `autoFocus` reference, a `referenceElement`
  // that was focused already) fired its `focusin` unheard, so count it now
  const {activeElement} = element.ownerDocument

  if (activeElement && element.contains(activeElement)) handleIntent()

  return () => controller.abort()
}

/** Holds the function that stops the intent listeners on the cloned child's element, while they are on */
type IntentListener = React.RefObject<(() => void) | null>

type FloatingRefs = UseFloatingReturn<HTMLElement>['refs']

interface ReferenceCallbackOptions {
  childElementRef: React.RefObject<HTMLElement | null>
  childIntentListener: IntentListener
  childRef: React.Ref<HTMLElement> | undefined
  handleIntent: () => void
  refs: FloatingRefs
  shouldRenderRef: React.RefObject<boolean>
}

/**
 * The ref callback for the cloned child: keeps its element in `childElementRef`, attaches the
 * child's own ref to it, listens to it for intent unless the popover has rendered already (which
 * leaves nothing to pre-render), and hands it to Floating UI while there is a card to position
 * against it (see `updateReferenceWhileOpen`), and detaches all of that again in the cleanup it
 * returns. A new callback whenever the child's ref changes, so that React detaches the old ref
 * and attaches the new one the way it does for a `ref` prop.
 *
 * A hook of its own, with the ref accesses in the module-scope functions below (which
 * `setFloating` in `Popover` shares): the React Compiler takes a callback that accesses refs for
 * a possible read during render wherever it flows into a plain call — `cloneElement` in
 * `Popover` — and would skip the component, since it cannot tell when the callback runs. The
 * result of a hook call carries no such mark.
 */
function useReferenceCallback(
  options: ReferenceCallbackOptions,
): (node: HTMLElement) => () => void {
  const {childElementRef, childIntentListener, childRef, handleIntent, refs, shouldRenderRef} =
    options

  return useCallback(
    (node: HTMLElement) =>
      attachReference(node, {
        childElementRef,
        childIntentListener,
        childRef,
        handleIntent,
        refs,
        shouldRenderRef,
      }),
    [childElementRef, childIntentListener, childRef, handleIntent, refs, shouldRenderRef],
  )
}

function attachReference(
  node: HTMLElement,
  {
    childElementRef,
    childIntentListener,
    childRef,
    handleIntent,
    refs,
    shouldRenderRef,
  }: ReferenceCallbackOptions,
): () => void {
  childElementRef.current = node
  updateReferenceWhileOpen(refs, node)

  if (!shouldRenderRef.current) {
    childIntentListener.current = listenForIntent(node, handleIntent)
  }

  const detachChildRef = attachRef(childRef, node)

  return () => {
    detachChildRef()
    stopListeningForIntent(childIntentListener)
    childElementRef.current = null
    updateReferenceWhileOpen(refs, null)
  }
}

function stopListeningForIntent(listener: IntentListener): void {
  listener.current?.()
  listener.current = null
}

/**
 * Floating UI is only told about the cloned child's element while it has a card to position
 * against it, so that the child's ref callback schedules nothing (see `childElementRef`): the
 * element is handed over as the card mounts, which is when the popover opens, so the update
 * Floating UI schedules for it rides along with the one for the card, in the commit that opens
 * the popover.
 */
function handOverReference(
  refs: FloatingRefs,
  childElementRef: React.RefObject<HTMLElement | null>,
): void {
  // Not with a `referenceElement` prop, which Floating UI gets as an option
  if (childElementRef.current) refs.setReference(childElementRef.current)
}

/**
 * Keeps Floating UI's reference current while the popover is open: a child element replaced (or
 * removed) while the popover is open repositions it right away.
 */
function updateReferenceWhileOpen(refs: FloatingRefs, node: HTMLElement | null): void {
  if (refs.floating.current) refs.setReference(node)
}

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
  // The cloned child's element, in a ref rather than state. Nothing reads it during render: the
  // intent listeners are attached from the ref callback that receives it (`setReference`), and
  // Floating UI, which has nothing to position until the popover opens, is handed the element
  // when the card mounts (`setFloating`). A state update from the ref callback would be
  // scheduled at Immediate priority in the commit that attaches the ref — on mount, on unmount,
  // and each time an `<Activity>` hides or shows the element — and such an update is committed
  // as soon as a view transition that reveals or hides the element is ready to animate, delaying
  // its first frame; should anything flush sync work while the browser is still preparing the
  // transition (a `flushSync`, React restoring a controlled input), it is what makes React cancel
  // the transition. A transition update instead would land only once that transition has
  // finished, and would itself be an update for any `<ViewTransition>` around the popover to
  // snapshot and animate. See `apps/storybook/tests/viewTransitionReveal.test.tsx`.
  const childElementRef = useRef<HTMLElement | null>(null)
  const rootBoundary: RootBoundary = 'viewport'

  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(forwardedRef, () => ref.current)

  const mediaIndex = useMediaIndex()
  const boundaryWidth = constrainSize || preventOverflow ? boundarySize?.width : undefined

  // Update width when
  // - media index changes
  // - `width` property changes
  const width = calcCurrentWidth({
    container,
    mediaIndex,
    width: widthArrayProp,
  })
  const widthRef = useRef(width)

  useEffect(() => {
    widthRef.current = width
  }, [width])

  // Update max width when
  // - boundary width changes
  // - `width` property changes
  const maxWidth = calcMaxWidth({boundaryWidth, currentWidth: width})
  const maxWidthRef = useRef(maxWidth)

  useEffect(() => {
    maxWidthRef.current = maxWidth
  }, [maxWidth])

  // Keep track of reference element width (see `size` middleware below)
  const referenceWidthRef = useRef<number>(undefined)

  // Force apply width & max width to floating element
  useEffect(() => {
    const floatingElement = ref.current

    if (!open || !floatingElement) return

    const referenceWidth = referenceWidthRef.current

    if (matchReferenceWidth) {
      if (referenceWidth !== undefined) {
        floatingElement.style.width = `${referenceWidth}px`
      }
    } else if (width !== undefined) {
      floatingElement.style.width = `${width}px`
    }

    if (typeof maxWidth === 'number') {
      floatingElement.style.maxWidth = `${maxWidth}px`
    }
  }, [width, matchReferenceWidth, maxWidth, open])

  const [referenceWidth, setReferenceWidth] = useState<number | undefined>(undefined)
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
    referenceWidthRef,
    rootBoundary,
    setReferenceWidth,
    widthRef,
  })

  const {x, y, middlewareData, placement, refs, strategy, update} = useFloating<HTMLElement>({
    middleware,
    placement: placementProp,
    whileElementsMounted: autoUpdate,
    elements: referenceElement
      ? {
          reference: referenceElement,
        }
      : undefined,
  })

  // Whether the popover (card, portal and `content`) has been rendered yet. Closed popovers
  // render inside a hidden `<Activity>`, so whatever is rendered while closed is pre-rendered DOM
  // that only pays off if the popover opens. Nothing is rendered until the popover opens or the
  // reference element shows intent to open it (see `INTENT_EVENT_TYPES`), and from then on it
  // stays rendered so the state of its `content` survives reopening. Consumers that do not want
  // a popover pre-rendered on intent can leave `content` empty until it opens.
  const [hasRendered, setHasRendered] = useState(false)

  if (isOpen && !hasRendered) setHasRendered(true)

  const shouldRender = isOpen || hasRendered
  const shouldRenderRef = useLatestRef(shouldRender)

  // Arms the pre-render. In a transition, so that it never holds up an open that follows right
  // away (a click), and so that React pre-renders the hidden popover in the background.
  const handleIntent = useCallback(() => startTransition(() => setHasRendered(true)), [])

  // Nothing is listened to once the popover has rendered, since there is nothing left to
  // pre-render, nor while disabled, which also drops the listeners of a popover that was enabled
  // before. A `referenceElement` given as a prop is listened to from here; the cloned child from
  // the ref callback that receives its element (`setReference`), whose listeners are stopped
  // from here once the popover has rendered.
  const childIntentListener: IntentListener = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (shouldRender) stopListeningForIntent(childIntentListener)

    if (!referenceElement || disabled || shouldRender) return undefined

    return listenForIntent(referenceElement, handleIntent)
  }, [disabled, handleIntent, referenceElement, shouldRender])

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
      if (node) handOverReference(refs, childElementRef)
      refs.setFloating(node)
    },
    [refs],
  )

  // The child's own ref, when it has one: attached from the same callback as ours (see
  // `setReference`), so it holds the element from the commit that mounts it on. With a
  // `referenceElement` the child is not cloned and keeps its ref to itself.
  // oxlint-disable-next-line no-unsafe-type-assertion
  const childRef = (childProp && !referenceElement ? getElementRef(childProp) : undefined) as
    | React.Ref<HTMLElement>
    | undefined

  const setReference = useReferenceCallback({
    childElementRef,
    childIntentListener,
    childRef,
    handleIntent,
    refs,
    shouldRenderRef,
  })

  const child = useMemo(() => {
    // If a reference element is defined, we don't need to clone the child
    if (referenceElement) return childProp

    if (!childProp) return null

    return cloneElement(childProp, {ref: setReference})
  }, [childProp, referenceElement, setReference])

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
        width={matchReferenceWidth ? referenceWidth : width}
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
  referenceWidthRef,
  rootBoundary,
  setReferenceWidth,
  widthRef,
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
  referenceWidthRef: React.RefObject<number | undefined>
  rootBoundary: RootBoundary
  setReferenceWidth: (referenceWidth: number) => void
  widthRef: React.RefObject<number | undefined>
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
          maxWidthRef,
          padding: DEFAULT_POPOVER_PADDING,
          referenceWidthRef,
          setReferenceWidth,
          widthRef,
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
    maxWidthRef,
    placementProp,
    placementStrategy,
    preventOverflow,
    referenceBoundary,
    referenceWidthRef,
    rootBoundary,
    setReferenceWidth,
    widthRef,
  ])
}
