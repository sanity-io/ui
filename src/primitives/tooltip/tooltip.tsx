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
  size,
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
import {useArrayProp, useForwardedRef} from '../../hooks'
import {useDelayedState} from '../../hooks/useDelayedState'
import {ThemeColorSchemeKey, useTheme} from '../../theme'
import {Placement} from '../../types'
import {Arrow, Layer, LayerProps, Portal, useBoundaryElement} from '../../utils'
import {Card} from '../card'
import {Delay} from '../types'
import {
  DEFAULT_FALLBACK_PLACEMENTS,
  DEFAULT_TOOLTIP_ARROW_HEIGHT,
  DEFAULT_TOOLTIP_ARROW_RADIUS,
  DEFAULT_TOOLTIP_ARROW_WIDTH,
  DEFAULT_TOOLTIP_DISTANCE,
  DEFAULT_TOOLTIP_PADDING,
} from './constants'
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
  /** Whether or not to render the tooltip in a portal element. */
  portal?: boolean | string
  radius?: number | number[]
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

const Root = styled(Layer)`
  pointer-events: none;
`

/**
 * Tooltips display information when hovering, focusing or tapping.
 *
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
    padding = 3,
    placement: placementProp = 'bottom',
    portal,
    radius = 2,
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

  const middleware = useMemo(() => {
    const ret: Middleware[] = []

    // Flip the floating element when leaving the boundary box
    ret.push(
      flip({
        boundary: boundaryElement || undefined,
        fallbackPlacements,
        padding: DEFAULT_TOOLTIP_PADDING,
        rootBoundary,
        mainAxis: false,
      }),
    )

    // Define distance between reference and floating element
    ret.push(offset({mainAxis: DEFAULT_TOOLTIP_DISTANCE}))

    // Set width and height on the floating element
    ret.push(
      size({
        apply({availableWidth, availableHeight, elements}) {
          Object.assign(elements.floating.style, {
            maxWidth: `${availableWidth - 4 * 2}px`, // the padding is `4px`
            maxHeight: `${availableHeight - 4 * 2}px`, // the padding is `4px`
          })
        },
      }),
    )

    // Shift the tooltip so its sits with the boundary eleement
    ret.push(
      shift({
        boundary: boundaryElement || undefined,
        rootBoundary,
        padding: 4,
      }),
    )

    // Place arrow
    ret.push(arrow({element: arrowRef, padding: DEFAULT_TOOLTIP_PADDING}))

    return ret
  }, [boundaryElement, fallbackPlacements])

  const {floatingStyles, placement, middlewareData, refs, update} = useFloating({
    middleware,
    placement: placementProp,
    whileElementsMounted: autoUpdate,
  })

  const arrowX = middlewareData.arrow?.x
  const arrowY = middlewareData.arrow?.y

  const arrowStyle: CSSProperties = useMemo(
    () => ({
      left: arrowX !== null ? arrowX : undefined,
      top: arrowY !== null ? arrowY : undefined,
      right: undefined,
      bottom: undefined,
    }),
    [arrowX, arrowY],
  )

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

  const handleBlur = useCallback(() => handleIsOpenChange(false), [handleIsOpenChange])
  const handleFocus = useCallback(() => handleIsOpenChange(true), [handleIsOpenChange])
  const handleMouseEnter = useCallback(() => handleIsOpenChange(true), [handleIsOpenChange])
  const handleMouseLeave = useCallback(() => handleIsOpenChange(false), [handleIsOpenChange])

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
      ref: setReference,
    })
  }, [childProp, handleBlur, handleFocus, handleMouseEnter, handleMouseLeave, setReference])

  if (!child) return <></>

  if (disabled) return child

  const root = (
    <Root
      data-ui="Tooltip"
      {...restProps}
      ref={setFloating}
      style={floatingStyles}
      zOffset={zOffset}
    >
      <Card
        data-ui="Tooltip__card"
        data-placement={placement}
        padding={padding}
        radius={radius}
        scheme={scheme}
        shadow={shadow}
      >
        {content}
        <Arrow
          ref={setArrow}
          style={arrowStyle}
          width={DEFAULT_TOOLTIP_ARROW_WIDTH}
          height={DEFAULT_TOOLTIP_ARROW_HEIGHT}
          radius={DEFAULT_TOOLTIP_ARROW_RADIUS}
        />
      </Card>
    </Root>
  )

  return (
    <>
      {child}

      {showTooltip && (
        <>
          {portal ? (
            <Portal __unstable_name={typeof portal === 'string' ? portal : undefined}>
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
