import React, {cloneElement, useEffect, useState} from 'react'
import {usePopper} from 'react-popper'
import {Card} from '../card'
import {PopoverArrow} from './arrow'

interface PopoverProps {
  boundaryElement?: HTMLElement | null
  children?: React.ReactElement
  content?: React.ReactNode
  disabled?: boolean
  open?: boolean
  padding?: number | number[]
  placement?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
  radius?: number | number[]
  referenceElement?: HTMLElement | null
}

export function Popover(
  props: PopoverProps & Omit<React.HTMLProps<HTMLDivElement>, 'children' | 'content'>
) {
  const {
    boundaryElement,
    children: child,
    content,
    disabled,
    open,
    padding,
    placement = 'bottom',
    radius = 2,
    referenceElement: referenceElementProp,
    style = {},
    ...restProps
  } = props
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null)
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null)
  const popperReferenceElement = referenceElementProp || referenceElement
  const popper = usePopper(popperReferenceElement, popperElement, {
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
          padding: 8,
        },
      },
      {
        name: 'offset',
        options: {
          offset: [0, 4],
        },
      },
    ],
  })

  const {attributes, forceUpdate, styles} = popper

  useEffect(() => {
    if (forceUpdate) forceUpdate()
  }, [forceUpdate, content, popperReferenceElement])

  if (disabled) {
    return child || <></>
  }

  const setRef = (el: HTMLElement | null) => {
    const childRef = (child as any).ref

    setReferenceElement(el)

    if (typeof childRef === 'function') {
      childRef(el)
    } else if (childRef) {
      childRef.current = el
    }
  }

  return (
    <>
      {child && !referenceElementProp ? cloneElement(child, {ref: setRef}) : child || <></>}

      {open && (
        <div
          {...restProps}
          ref={setPopperElement}
          style={{...style, ...styles.popper}}
          {...attributes.popper}
        >
          <Card padding={padding} radius={radius} shadow={3}>
            {content}
          </Card>

          <PopoverArrow ref={setArrowElement} tone="default" style={styles.arrow} />
        </div>
      )}
    </>
  )
}
