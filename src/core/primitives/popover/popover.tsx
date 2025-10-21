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
import {ThemeColorSchemeKey} from '@sanity/ui/theme'
import {AnimatePresence} from 'motion/react'
import {
  cloneElement,
  forwardRef,
  memo,
  MutableRefObject,
  RefCallback,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'

import {useArrayProp, useElementSize, useMediaIndex, usePrefersReducedMotion} from '../../hooks'
import {origin} from '../../middleware/origin'
import {useTheme_v2} from '../../theme'
import {BoxOverflow, CardTone, Placement, PopoverMargins} from '../../types'
import {LayerProps, LayerProvider, Portal, useBoundaryElement, useLayer} from '../../utils'
import {getElementRef} from '../../utils/getElementRef'
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
  updateRef?:
    | MutableRefObject<PopoverUpdateCallback | undefined>
    | RefCallback<PopoverUpdateCallback | undefined>
  width?: PopoverWidth | PopoverWidth[]
}

const ViewportOverlay = () => {
  const {zIndex} = useLayer()

  return <div style={{height: '100vh', inset: 0, position: 'fixed', width: '100vw', zIndex}} />
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
  ): React.JSX.Element {
    const {container, layer} = useTheme_v2()
    const boundaryElementContext = useBoundaryElement()

    const {
      __unstable_margins: margins = DEFAULT_POPOVER_MARGINS,
      animate: _animate = false,
      arrow: arrowProp = false,
      boundaryElement = boundaryElementContext.element,
      children: childProp,
      constrainSize = false,
      content,
      disabled,
      fallbackPlacements = props.fallbackPlacements ??
        DEFAULT_FALLBACK_PLACEMENTS[props.placement ?? 'bottom'],
      matchReferenceWidth,
      floatingBoundary = props.boundaryElement ?? boundaryElementContext.element,
      modal,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onActivate,
      open,
      overflow = 'hidden',
      padding: paddingProp,
      placement: placementProp = 'bottom',
      placementStrategy = 'flip',
      portal,
      preventOverflow = true,
      radius: radiusProp = 3,
      referenceBoundary = props.boundaryElement ?? boundaryElementContext.element,
      referenceElement,
      scheme,
      shadow: shadowProp = 3,
      tone = 'inherit',
      width: widthProp = 'auto',
      zOffset: zOffsetProp = layer.popover.zOffset,
      updateRef,
      ...restProps
    } = props
    const prefersReducedMotion = usePrefersReducedMotion()
    const animate = prefersReducedMotion ? false : _animate
    const boundarySize = useElementSize(boundaryElement)?.border
    const padding = useArrayProp(paddingProp)
    const radius = useArrayProp(radiusProp)
    const shadow = useArrayProp(shadowProp)
    const widthArrayProp = useArrayProp(widthProp)
    const zOffset = useArrayProp(zOffsetProp)
    const ref = useRef<HTMLDivElement | null>(null)
    const arrowRef = useRef<HTMLDivElement | null>(null)
    const rootBoundary: RootBoundary = 'viewport'

    useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
      forwardedRef,
      () => ref.current,
    )

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

              const _currentWidth = widthRef.current
              const _maxWidth = maxWidthRef.current

              if (matchReferenceWidth) {
                elements.floating.style.width = `${referenceWidth}px`
              } else if (_currentWidth !== undefined) {
                elements.floating.style.width = `${_currentWidth}px`
              }

              if (constrainSize) {
                elements.floating.style.maxWidth = `${Math.min(
                  availableWidth,
                  _maxWidth ?? Infinity,
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
      placementProp,
      placementStrategy,
      floatingBoundary,
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

        const childRef = getElementRef(childProp as any)

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
          width={matchReferenceWidth ? referenceWidthRef.current : width}
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
