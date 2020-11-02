import {Placement} from '@popperjs/core'
import React, {useCallback, useEffect, useState} from 'react'
import {usePopper} from 'react-popper'
import styled from 'styled-components'
import {Layer, Portal} from '../../utils'
import {Card} from '../card'
import {TooltipArrow} from './tooltipArrow'

export interface TooltipProps {
  boundaryElement?: HTMLElement | null
  children?: React.ReactElement
  content?: React.ReactNode
  disabled?: boolean
  placement?: Placement
  portal?: boolean
  allowedAutoPlacements?: Placement[]
  fallbackPlacements?: Placement[]
}

const Root = styled(Layer)`
  pointer-events: none;
`

export function Tooltip(
  props: TooltipProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'children' | 'content'>
) {
  const {
    boundaryElement,
    children,
    content,
    disabled,
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
          allowedAutoPlacements: props.allowedAutoPlacements,
          fallbackPlacements: props.fallbackPlacements,
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
