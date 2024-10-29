/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  RootBoundary,
  arrow,
  autoUpdate,
  flip,
  hide,
  offset,
  shift,
  useFloating,
} from '@floating-ui/react-dom'
import {ThemeColorSchemeKey} from '@sanity/ui/theme'
import {AnimatePresence} from 'framer-motion'
import {
  MutableRefObject,
  RefCallback,
  cloneElement,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {useArrayProp, useElementSize, useMediaIndex, usePrefersReducedMotion} from '../../hooks'
import {origin} from '../../middleware/origin'
import {useTheme_v2} from '../../theme'
import {BoxOverflow, CardTone, Placement, PopoverMargins} from '../../types'
import {LayerProps, LayerProvider, Portal, useBoundaryElement} from '../../utils'
import {ResponsiveRadiusProps, ResponsiveShadowProps} from '../types'
import {
  DEFAULT_POPOVER_DISTANCE,
  DEFAULT_POPOVER_MARGINS,
  DEFAULT_FALLBACK_PLACEMENTS,
  DEFAULT_POPOVER_PADDING,
} from './constants'
import {size} from './floating-ui/size'
import {calcCurrentWidth, calcMaxWidth} from './helpers'
import {PopoverCard} from './popoverCard'
import {PopoverUpdateCallback, PopoverWidth} from './types'

export type {PopoverUpdateCallback}

/** @public */
export interface PopoverProps
  extends Omit<LayerProps, 'as'>,
    ResponsiveRadiusProps,
    ResponsiveShadowProps {
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
  boundaryElement?: HTMLElement | null
  children?: React.ReactElement
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
  open?: boolean
  overflow?: BoxOverflow
  padding?: number | number[]
  placement?: Placement
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
  updateRef?:
    | MutableRefObject<PopoverUpdateCallback | undefined>
    | RefCallback<PopoverUpdateCallback | undefined>
  width?: PopoverWidth | PopoverWidth[]
}

/**
 * The `Popover` component is used to display some content on top of another.
 *
 * @public
 */
export const Popover = memo(
  forwardRef(function Popover(
    props: PopoverProps &
      Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'children' | 'content' | 'width'>,
    forwardedRef: React.ForwardedRef<HTMLDivElement>,
  ): React.ReactElement {
    const {container, layer} = useTheme_v2()
    const boundaryElementContext = useBoundaryElement()

    const {
      __unstable_margins: margins = DEFAULT_POPOVER_MARGINS,
      animate: _animate = false,
      arrow: arrowProp = false,
      boundaryElement: _boundaryElement,
      children: childProp,
      constrainSize = false,
      content,
      disabled,
      fallbackPlacements: _fallbackPlacements,
      matchReferenceWidth,
      floatingBoundary: _floatingBoundary,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onActivate,
      open,
      overflow = 'hidden',
      padding: paddingProp,
      placement: placementProp = 'bottom',
      portal,
      preventOverflow = true,
      radius: radiusProp = 3,
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
    const boundaryElement = _boundaryElement ?? boundaryElementContext.element
    const fallbackPlacements =
      _fallbackPlacements ?? DEFAULT_FALLBACK_PLACEMENTS[props.placement ?? 'bottom']
    const floatingBoundary = _floatingBoundary ?? boundaryElement ?? boundaryElementContext.element
    const referenceBoundary =
      _referenceBoundary ?? boundaryElement ?? boundaryElementContext.element
    const zOffsetProp = _zOffsetProp ?? layer.popover.zOffset
    const prefersReducedMotion = usePrefersReducedMotion()
    const animate = prefersReducedMotion ? false : _animate
    const boundarySize = useElementSize(boundaryElement)?.border
    const padding = useArrayProp(paddingProp)
    const radius = useArrayProp(radiusProp)
    const shadow = useArrayProp(shadowProp)
    const widthArrayProp = useArrayProp(widthProp)
    const zOffset = useArrayProp(zOffsetProp)
    const ref = useRef<HTMLDivElement | null>(null)
    const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null)
    const rootBoundary: RootBoundary = 'viewport'

    useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
      forwardedRef,
      () => ref.current,
    )

    const mediaIndex = useMediaIndex()
    const boundaryWidth = constrainSize || preventOverflow ? boundarySize?.width : undefined

    // Force apply width & max width to floating element
    useLayoutEffect(() => {
      const floatingElement = ref.current

      // If constrainSize or matchReferenceWidth is true, then the styles are set by the `size` middleware
      if (!open || !floatingElement || constrainSize || matchReferenceWidth) return

      const currentWidth = calcCurrentWidth({
        container,
        mediaIndex,
        width: widthArrayProp,
      })
      const maxWidth = calcMaxWidth({boundaryWidth, currentWidth})

      if (currentWidth !== undefined) {
        floatingElement.style.width = `${currentWidth}px`
      }

      if (typeof maxWidth === 'number') {
        floatingElement.style.maxWidth = `${maxWidth}px`
      }
    }, [
      boundaryWidth,
      constrainSize,
      container,
      matchReferenceWidth,
      mediaIndex,
      open,
      widthArrayProp,
    ])

    const {x, y, middlewareData, placement, refs, strategy, update} = useFloating({
      middleware: [
        // Flip the floating element when leaving the boundary box
        (constrainSize || preventOverflow) &&
          flip({
            boundary: floatingBoundary || undefined,
            fallbackPlacements,
            padding: DEFAULT_POPOVER_PADDING,
            rootBoundary,
          }),
        // Define distance between reference and floating element
        offset({mainAxis: DEFAULT_POPOVER_DISTANCE}),
        // Track sizes
        (constrainSize || matchReferenceWidth) &&
          size({
            apply({availableWidth, availableHeight, elements, referenceWidth}) {
              const currentWidth = calcCurrentWidth({
                container,
                mediaIndex,
                width: widthArrayProp,
              })
              const maxWidth = calcMaxWidth({boundaryWidth, currentWidth})

              if (matchReferenceWidth) {
                elements.floating.style.width = `${referenceWidth}px`
              } else if (currentWidth !== undefined) {
                elements.floating.style.width = `${currentWidth}px`
              }

              if (constrainSize) {
                elements.floating.style.maxWidth = `${Math.min(
                  availableWidth,
                  maxWidth ?? Infinity,
                )}px`

                elements.floating.style.maxHeight = `${availableHeight}px`
              }
            },
            boundaryElement: floatingBoundary || undefined,
            constrainSize,
            margins,
            matchReferenceWidth,
            padding: DEFAULT_POPOVER_PADDING,
          }),
        // Shift the popover so its sits within the boundary element
        preventOverflow &&
          shift({
            boundary: floatingBoundary || undefined,
            rootBoundary,
            padding: DEFAULT_POPOVER_PADDING,
          }),
        // Place arrow
        arrowProp &&
          arrow({
            element: arrowElement,
            padding: DEFAULT_POPOVER_PADDING,
          }),
        // Determine the origin to scale from.
        // Must be placed after `@sanity/ui/size` and `shift` middleware.
        animate && origin,
        hide({
          boundary: referenceBoundary || undefined,
          padding: DEFAULT_POPOVER_PADDING,
          strategy: 'referenceHidden',
        }),
      ],
      placement: placementProp,
      whileElementsMounted: autoUpdate,
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

    const [childElement, setChildElement] = useState<HTMLElement | null>(null)
    const setReference = useCallback(
      (node: HTMLElement | null) => {
        refs.setReference(node)
        setChildElement(node)
      },
      [refs],
    )

    useImperativeHandle(getElementRef(childProp as any), () => childElement, [childElement])

    const child = useMemo(() => {
      if (!childProp || referenceElement) return null

      return cloneElement(childProp, {ref: setReference})
    }, [childProp, referenceElement, setReference])

    useImperativeHandle(updateRef, () => update, [update])

    useEffect(() => {
      if (child) return
      refs.setReference(referenceElement || null)
    }, [referenceElement, refs, child])

    if (disabled) {
      return childProp || <></>
    }

    const popover = (
      <LayerProvider zOffset={zOffset}>
        <PopoverCard
          {...restProps}
          __unstable_margins={margins}
          animate={animate}
          arrow={arrowProp}
          arrowRef={setArrowElement}
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
          x={x}
          y={y}
        >
          {content}
        </PopoverCard>
      </LayerProvider>
    )

    const children =
      open &&
      (portal ? (
        <Portal __unstable_name={typeof portal === 'string' ? portal : undefined}>{popover}</Portal>
      ) : (
        popover
      ))

    return (
      <>
        {/* the popover */}
        {animate ? <AnimatePresence>{children}</AnimatePresence> : children}

        {/* the referred element */}
        {child}
      </>
    )
  }),
)
Popover.displayName = 'Memo(ForwardRef(Popover))'

// Before React 19 accessing `element.props.ref` will throw a warning and suggest using `element.ref`
// After React 19 accessing `element.ref` does the opposite.
// https://github.com/facebook/react/pull/28348
//
// Access the ref using the method that doesn't yield a warning.
function getElementRef(element?: React.ReactElement) {
  if (!element) return null
  // React <=18 in DEV
  let getter = Object.getOwnPropertyDescriptor(element.props, 'ref')?.get
  let mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning

  if (mayWarn) {
    return (element as any).ref
  }

  // React 19 in DEV
  getter = Object.getOwnPropertyDescriptor(element, 'ref')?.get
  mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning

  if (mayWarn) {
    return element.props.ref
  }

  // Not DEV
  return element.props.ref || (element as any).ref
}
