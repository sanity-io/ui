/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
  type Middleware,
  type RootBoundary,
} from '@floating-ui/react-dom'
import type {ThemeColorSchemeKey} from '@sanity/ui/theme'
import {AnimatePresence} from 'framer-motion'
import {
  cloneElement,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ForwardedRef,
  useId,
  useSyncExternalStore,
  useImperativeHandle,
} from 'react'
import {styled} from 'styled-components'
import {useArrayProp, usePrefersReducedMotion} from '../../hooks'
import {useDelayedState} from '../../hooks/useDelayedState'
import {origin} from '../../middleware/origin'
import {useTheme_v2} from '../../theme'
import type {Placement} from '../../types'
import {
  ConditionalWrapper,
  Layer,
  type LayerProps,
  Portal,
  useBoundaryElement,
  usePortal,
} from '../../utils'
import type {Delay} from '../types'
import {
  DEFAULT_FALLBACK_PLACEMENTS,
  DEFAULT_TOOLTIP_DISTANCE,
  DEFAULT_TOOLTIP_PADDING,
} from './constants'
import {TooltipCard} from './tooltipCard'
import {useTooltipDelayGroup} from './tooltipDelayGroup'

/**
 * @public
 */
export interface TooltipProps extends Omit<LayerProps, 'as'> {
  /** @deprecated Use `fallbackPlacements` instead. */
  allowedAutoPlacements?: Placement[]
  arrow?: boolean
  boundaryElement?: HTMLElement | null
  children?: React.ReactElement
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

const Root = styled(Layer)<{$maxWidth: number}>`
  pointer-events: none;
  max-width: ${({$maxWidth}) => $maxWidth}px;
`

/**
 * Tooltips display information when hovering, focusing or tapping.
 *
 * @public
 */
export const Tooltip = forwardRef(function Tooltip(
  props: TooltipProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'children' | 'content'>,
  forwardedRef: React.ForwardedRef<HTMLDivElement>,
) {
  const boundaryElementContext = useBoundaryElement()
  const {layer} = useTheme_v2()
  const {
    animate: _animate = false,
    arrow: arrowProp = false,
    boundaryElement = boundaryElementContext?.element,
    children: childProp,
    content,
    disabled,
    fallbackPlacements: fallbackPlacementsProp = props.fallbackPlacements ??
      DEFAULT_FALLBACK_PLACEMENTS[props.placement ?? 'bottom'],
    padding = 2,
    placement: placementProp = 'bottom',
    portal: portalProp,
    radius = 2,
    scheme,
    shadow = 2,
    zOffset = layer.tooltip.zOffset,
    delay,
    ...restProps
  } = props
  const prefersReducedMotion = usePrefersReducedMotion()
  const animate = prefersReducedMotion ? false : _animate
  const fallbackPlacements = useArrayProp(fallbackPlacementsProp)
  const ref = useRef<HTMLDivElement | null>(null)
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null)
  const arrowRef = useRef<HTMLDivElement | null>(null)
  const rootBoundary: RootBoundary = 'viewport'

  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(forwardedRef, () => ref.current)

  const portal = usePortal()
  const portalElement =
    typeof portalProp === 'string' ? portal.elements?.[portalProp] || null : portal.element

  const documentBodyOffsetWidth = useSyncExternalStore(
    emptySubscribe,
    () => document.body.offsetWidth,
    // We don't actually know what the width of the body is during SSR, so we'll just assume it's 800px or larger
    () => 800,
  )
  // Get the maximum tooltip width (sans tooltip padding)
  // Tooltip width should never exceed the width of either any supplied boundary or portal element.
  // If both portal and boundary elements are provided, use the smaller width of the two.
  const tooltipWidth = useMemo(() => {
    const availableWidths = [
      ...(boundaryElement ? [boundaryElement.offsetWidth] : []),
      portalElement?.offsetWidth || documentBodyOffsetWidth,
    ]

    return Math.min(...availableWidths) - DEFAULT_TOOLTIP_PADDING * 2
  }, [boundaryElement, documentBodyOffsetWidth, portalElement?.offsetWidth])

  const middleware = useMemo(() => {
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
  }, [animate, arrowProp, boundaryElement, fallbackPlacements])

  const {floatingStyles, placement, middlewareData, refs, update} = useFloating({
    middleware,
    placement: placementProp,
    whileElementsMounted: autoUpdate,
  })

  const arrowX = middlewareData.arrow?.x
  const arrowY = middlewareData.arrow?.y

  const originX = middlewareData['@sanity/ui/origin']?.originX
  const originY = middlewareData['@sanity/ui/origin']?.originY

  const tooltipId = useId()
  const [isOpen, setIsOpen] = useDelayedState(false)
  const delayGroupContext = useTooltipDelayGroup()
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

          delayGroupContext.setIsGroupActive(open, groupedOpenDelay)
          delayGroupContext.setOpenTooltipId(tooltipId, groupedOpenDelay)
        } else {
          const minimumGroupDeactivateDelay = 200 // We should provide some delay to allow the user to reach the next tooltip.
          const groupDeactivateDelay =
            closeDelay > minimumGroupDeactivateDelay ? closeDelay : minimumGroupDeactivateDelay

          delayGroupContext.setIsGroupActive(open, groupDeactivateDelay)
          delayGroupContext.setOpenTooltipId(null, immediate ? 0 : closeDelay)
        }
      } else {
        const standaloneDelay = immediate ? 0 : open ? openDelay : closeDelay

        // When it's not inside a group, the open or close status will be handled by the tooltip itself.
        setIsOpen(open, standaloneDelay)
      }
    },
    [isInsideGroup, delayGroupContext, openDelay, tooltipId, closeDelay, setIsOpen],
  )

  const handleBlur = useCallback(
    (e: FocusEvent) => {
      handleIsOpenChange(false)
      childProp?.props?.onBlur?.(e)
    },
    [childProp?.props, handleIsOpenChange],
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
      handleIsOpenChange(false)
      childProp?.props?.onMouseLeave?.(e)
    },
    [childProp?.props, handleIsOpenChange],
  )

  // Detect whether the mouse is moving outside of the reference element. This is sometimes
  // necessary, because the tooltip might not always close as it should (e.g. when clicking
  // the reference element triggers a CPU-heavy operation.)
  useEffect(() => {
    if (!showTooltip) return

    function handleWindowMouseMove(event: MouseEvent) {
      if (!referenceElement) return

      const isHoveringReference =
        referenceElement === event.target ||
        (event.target instanceof Node && referenceElement.contains(event.target))

      if (!isHoveringReference) {
        handleIsOpenChange(false)
        window.removeEventListener('mousemove', handleWindowMouseMove)
      }
    }

    window.addEventListener('mousemove', handleWindowMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove)
    }
  }, [showTooltip, referenceElement, handleIsOpenChange])

  // Close when `disabled` changes to `true`
  useEffect(() => {
    if (disabled && showTooltip) handleIsOpenChange(false)
  }, [disabled, handleIsOpenChange, showTooltip])

  // Close when `content` changes to falsy
  useEffect(() => {
    if (!content && showTooltip) handleIsOpenChange(false)
  }, [content, handleIsOpenChange, showTooltip])

  // Update reference
  useEffect(() => refs.setReference(referenceElement), [referenceElement, refs])

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

  const childRef: ForwardedRef<HTMLElement | null> = (childProp as any)?.ref

  const setReference = useCallback(
    (node: HTMLElement | null) => {
      if (typeof childRef === 'function') {
        childRef(node)
      } else if (childRef) {
        childRef.current = node
      }

      // childRef.current = node
      setReferenceElement(node)
    },
    [childRef],
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
      ref: setReference,
    })
  }, [
    childProp,
    handleBlur,
    handleClick,
    handleContextMenu,
    handleFocus,
    handleMouseEnter,
    handleMouseLeave,
    setReference,
  ])

  if (!child) return <></>

  if (disabled) return child

  const tooltip = (
    <Root
      data-ui="Tooltip"
      {...restProps}
      ref={setFloating}
      style={floatingStyles}
      zOffset={zOffset}
      $maxWidth={tooltipWidth}
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
    </Root>
  )

  return (
    <>
      {/* the tooltip */}
      <ConditionalWrapper
        condition={animate}
        wrapper={(children) => <AnimatePresence>{children}</AnimatePresence>}
      >
        {showTooltip && (
          <ConditionalWrapper
            condition={!!portalProp}
            wrapper={(children) => (
              <Portal __unstable_name={typeof portalProp === 'string' ? portalProp : undefined}>
                {children}
              </Portal>
            )}
          >
            {tooltip}
          </ConditionalWrapper>
        )}
      </ConditionalWrapper>

      {/* the referred element */}
      {child}
    </>
  )
})

const emptySubscribe = () => () => {}
