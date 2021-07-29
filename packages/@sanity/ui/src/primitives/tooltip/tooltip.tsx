import React, {cloneElement, forwardRef, useCallback, useEffect, useState} from 'react'
import {usePopper} from 'react-popper'
import styled from 'styled-components'
import {useForwardedRef} from '../../hooks'
import {useTheme} from '../../theme'
import {Placement} from '../../types'
import {Layer, LayerProps, Portal, useBoundaryElement} from '../../utils'
import {Card} from '../card'
import {TooltipArrow} from './tooltipArrow'

/**
 * @public
 */
export interface TooltipProps extends Omit<LayerProps, 'as'> {
  allowedAutoPlacements?: Placement[]
  boundaryElement?: HTMLElement | null
  children?: React.ReactElement
  content?: React.ReactNode
  disabled?: boolean
  fallbackPlacements?: Placement[]
  placement?: Placement
  portal?: boolean
}

const Root = styled(Layer)`
  pointer-events: none;
`

/**
 * @public
 */
export const Tooltip = forwardRef(function Tooltip(
  props: TooltipProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'children' | 'content'>,
  ref
) {
  const boundaryElementContext = useBoundaryElement()
  const theme = useTheme()
  const {
    allowedAutoPlacements,
    boundaryElement = boundaryElementContext?.element,
    children,
    content,
    disabled,
    fallbackPlacements,
    placement = 'bottom',
    portal,
    zOffset = theme.sanity.layer?.tooltip.zOffset,
    ...restProps
  } = props
  const forwardedRef = useForwardedRef(ref)
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null)
  const popper = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [
      {
        name: 'arrow',
        options: {
          element: arrowElement,
          padding: 4,
        },
      },
      {
        name: 'preventOverflow',
        options: {
          altAxis: true,
          boundary: boundaryElement || undefined,
          padding: 4,
        },
      },
      {
        name: 'offset',
        options: {offset: [0, 3]},
      },
      {
        name: 'flip',
        options: {
          allowedAutoPlacements,
          fallbackPlacements,
        },
      },
    ],
  })
  const {forceUpdate} = popper
  const [isOpen, setIsOpen] = useState(false)
  const handleBlur = useCallback(() => setIsOpen(false), [])
  const handleFocus = useCallback(() => setIsOpen(true), [])
  const handleMouseEnter = useCallback(() => setIsOpen(true), [])
  const handleMouseLeave = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    if (forceUpdate) forceUpdate()
  }, [forceUpdate, content])

  // Close when `disabled` changes to `true`
  useEffect(() => {
    if (disabled) setIsOpen(false)
  }, [disabled])

  // Close when `content` changes to falsy
  useEffect(() => {
    if (!content) setIsOpen(false)
  }, [content])

  const setRef = (el: HTMLDivElement | null) => {
    setPopperElement(el)
    forwardedRef.current = el
  }

  if (!children) return <></>

  if (disabled) return children

  const referenceProps = {
    onBlur: handleBlur,
    onFocus: handleFocus,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    ref: setReferenceElement,
  }

  const referenceNode = cloneElement(children, referenceProps)

  const popperNode = (
    <Root
      data-ui="Tooltip"
      {...restProps}
      {...popper.attributes.popper}
      ref={setRef}
      style={popper.styles.popper}
      zOffset={zOffset}
    >
      <Card radius={2} shadow={3}>
        {content}
        <TooltipArrow ref={setArrowElement} style={popper.styles.arrow} />
      </Card>
    </Root>
  )

  return (
    <>
      {referenceNode}

      {isOpen && (
        <>
          {portal && <Portal>{popperNode}</Portal>}
          {!portal && popperNode}
        </>
      )}
    </>
  )
})
