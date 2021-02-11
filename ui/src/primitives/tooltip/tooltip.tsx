import React, {cloneElement, forwardRef, useCallback, useEffect, useState} from 'react'
import {usePopper} from 'react-popper'
import styled from 'styled-components'
import {useForwardedRef} from '../../hooks'
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

export const Tooltip = forwardRef(
  (
    props: TooltipProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'children' | 'content'>,
    ref
  ) => {
    const boundaryElementContext = useBoundaryElement()
    const {
      allowedAutoPlacements,
      boundaryElement = boundaryElementContext?.element,
      children,
      content,
      disabled,
      fallbackPlacements,
      placement = 'bottom',
      portal,
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
        ref={setRef}
        style={popper.styles.popper}
        {...popper.attributes.popper}
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
  }
)

Tooltip.displayName = 'Tooltip'
