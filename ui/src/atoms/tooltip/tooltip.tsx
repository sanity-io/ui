import React, {useCallback, useEffect, useState} from 'react'
import {usePopper} from 'react-popper'
import styled from 'styled-components'
import {Placement} from '../../types'
import {Layer, Portal, useBoundaryElement} from '../../utils'
import {Card} from '../card'
import {TooltipArrow} from './tooltipArrow'

export interface TooltipProps {
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

export function Tooltip(
  props: TooltipProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'children' | 'content'>
) {
  const boundaryElementContext = useBoundaryElement()
  const {
    allowedAutoPlacements,
    boundaryElement = boundaryElementContext,
    children,
    content,
    disabled,
    fallbackPlacements,
    placement = 'bottom',
    portal: portalProp,
    ...restProps
  } = props

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

  if (disabled) {
    return children || <span />
  }

  const popperNode = (
    <Root
      {...restProps}
      ref={setPopperElement}
      style={popper.styles.popper}
      {...popper.attributes.popper}
    >
      <Card radius={2} shadow={3}>
        {content}
        <TooltipArrow ref={setArrowElement} style={popper.styles.arrow} />
      </Card>
    </Root>
  )

  if (!children) {
    return <span />
  }

  return (
    <>
      {React.cloneElement(children, {
        onBlur: handleBlur,
        onFocus: handleFocus,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        ref: setReferenceElement,
      })}

      {isOpen && (
        <>
          {portalProp && <Portal>{popperNode}</Portal>}
          {!portalProp && popperNode}
        </>
      )}
    </>
  )
}
