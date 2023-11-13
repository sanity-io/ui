/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
  Middleware,
  RootBoundary,
} from '@floating-ui/react-dom'
import {
  cloneElement,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  CSSProperties,
  ForwardedRef,
  useId,
} from 'react'
import styled from 'styled-components'
import {FLOATING_STATIC_SIDES} from '../../constants'
import {useArrayProp, useForwardedRef} from '../../hooks'
import {useDelayedState} from '../../hooks/useDelayedState'
import {ThemeColorSchemeKey, useTheme} from '../../theme'
import {Placement} from '../../types'
import {Layer, LayerProps, Portal, useBoundaryElement, usePortal} from '../../utils'
import {Card} from '../card'
import {Delay} from '../types'
import {DEFAULT_FALLBACK_PLACEMENTS, DEFAULT_TOOLTIP_PADDING} from './constants'
import {TooltipArrow} from './tooltipArrow'
import {useTooltipDelayGroup} from './tooltipDelayGroup'

/**
 * @public
 */
export interface TooltipProps extends Omit<LayerProps, 'as'> {
  /** @deprecated Use `fallbackPlacements` instead. */
  allowedAutoPlacements?: Placement[]
  boundaryElement?: HTMLElement | null
  children?: React.ReactElement
  content?: React.ReactNode
  disabled?: boolean
  fallbackPlacements?: Placement[]
  padding?: number | number[]
  placement?: Placement
  portal?: boolean | string
  scheme?: ThemeColorSchemeKey
  shadow?: number | number[]
  /**
   * @public Adds a delay to open or close the tooltip.  Defaults to 0.
   *
   * If only a `number` is passed, it will be used for both opening and closing.
   *
   * If an object `{open: number; close:number}` is passed, it can be used to set different delays for each action.
   */
  delay?: Delay
}

const Root = styled(Layer)<{$maxWidth: number}>`
  pointer-events: none;
  max-width: ${({$maxWidth}) => $maxWidth}px;
`

/**
 * @public
 */
export const Tooltip = forwardRef(function Tooltip(
  props: TooltipProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'children' | 'content'>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const boundaryElementContext = useBoundaryElement()
  const theme = useTheme()
  const {
    boundaryElement = boundaryElementContext?.element,
    children: childProp,
    content,
    disabled,
    fallbackPlacements: fallbackPlacementsProp = props.fallbackPlacements ??
      DEFAULT_FALLBACK_PLACEMENTS[props.placement ?? 'bottom'],
    padding,
    placement: placementProp = 'bottom',
    portal: portalProp,
    scheme,
    shadow = 2,
    zOffset = theme.sanity.layer?.tooltip.zOffset,
    delay,
    ...restProps
  } = props
  const fallbackPlacements = useArrayProp(fallbackPlacementsProp)
  const forwardedRef = useForwardedRef(ref)
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null)
  const arrowRef = useRef<HTMLDivElement | null>(null)
  const rootBoundary: RootBoundary = 'viewport'

  const portal = usePortal()
  const portalElement =
    typeof portalProp === 'string' ? portal.elements?.[portalProp] || null : portal.element

  // Get the maximum tooltip width (sans tooltip padding)
  // Tooltip width should never exceed the width of either any supplied boundary or portal element.
  // If both portal and boundary elements are provided, use the smaller width of the two.
  const tooltipWidth = useMemo(() => {
    const availableWidths = [
      ...(boundaryElement ? [boundaryElement.offsetWidth] : []),
      portalElement?.offsetWidth || document.body.offsetWidth,
    ]

    return Math.min(...availableWidths) - DEFAULT_TOOLTIP_PADDING * 2
  }, [boundaryElement, portalElement?.offsetWidth])

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
    ret.push(offset({mainAxis: 3}))

    // Shift the tooltip so its sits with the boundary element
    ret.push(
      shift({
        boundary: boundaryElement || undefined,
        rootBoundary,
        padding: DEFAULT_TOOLTIP_PADDING,
      }),
    )

    // Place arrow
    ret.push(arrow({element: arrowRef, padding: 2}))

    return ret
  }, [boundaryElement, fallbackPlacements])

  const {floatingStyles, placement, middlewareData, refs, update} = useFloating({
    middleware,
    placement: placementProp,
    whileElementsMounted: autoUpdate,
  })

  const staticSide = placement && FLOATING_STATIC_SIDES[placement.split('-')[0]]

  const arrowX = middlewareData.arrow?.x
  const arrowY = middlewareData.arrow?.y

  const arrowStyle: CSSProperties = useMemo(() => {
    const style: CSSProperties = {
      left: arrowX !== null ? arrowX : undefined,
      top: arrowY !== null ? arrowY : undefined,
      right: undefined,
      bottom: undefined,
    }

    if (staticSide) style[staticSide] = -15

    return style
  }, [arrowX, arrowY, staticSide])

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
      handleIsOpenChange(false, true), [handleIsOpenChange]
      childProp?.props.onClick?.(e)
    },
    [childProp?.props, handleIsOpenChange],
  )
  const handleContextMenu = useCallback(
    (e: MouseEvent) => {
      handleIsOpenChange(false, true), [handleIsOpenChange]
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
    if (!isOpen) return

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
  }, [isOpen, referenceElement, handleIsOpenChange])

  // Close when `disabled` changes to `true`
  useEffect(() => {
    if (disabled) handleIsOpenChange(false)
  }, [disabled, handleIsOpenChange])

  // Close when `content` changes to falsy
  useEffect(() => {
    if (!content) handleIsOpenChange(false)
  }, [content, handleIsOpenChange])

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
      forwardedRef.current = node
      refs.setFloating(node)
    },
    [forwardedRef, refs],
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

  const root = (
    <Root
      data-ui="Tooltip"
      {...restProps}
      ref={setFloating}
      style={floatingStyles}
      zOffset={zOffset}
      $maxWidth={tooltipWidth}
    >
      <Card
        data-ui="Tooltip__card"
        data-placement={placement}
        padding={padding}
        radius={2}
        scheme={scheme}
        shadow={shadow}
      >
        {content}
        <TooltipArrow ref={setArrow} style={arrowStyle} />
      </Card>
    </Root>
  )

  return (
    <>
      {child}

      {showTooltip && (
        <>
          {portalProp ? (
            <Portal __unstable_name={typeof portalProp === 'string' ? portalProp : undefined}>
              {root}
            </Portal>
          ) : (
            root
          )}
        </>
      )}
    </>
  )
})
