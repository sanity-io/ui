import React, {cloneElement, useState} from 'react'
import {usePopper} from 'react-popper'
import {Card} from '../card'
import {PopoverArrow} from './arrow'

interface PopoverProps {
  children: JSX.Element
  content: React.ReactNode
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
}

export function Popover(props: PopoverProps) {
  const {padding, placement = 'bottom', radius = 2} = props
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)
  // const [arrowElement, setArrowElement] = useState(null)
  const {styles, attributes} = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [
      // {
      //   name: 'arrow',
      //   options: {element: arrowElement},
      // },
      {
        name: 'preventOverflow',
        options: {
          altAxis: true,
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

  return (
    <>
      {cloneElement(props.children, {ref: setReferenceElement})}

      {props.open && (
        <div ref={setPopperElement as any} style={styles.popper} {...attributes.popper}>
          <Card padding={padding} radius={radius} shadow={3}>
            {props.content}
          </Card>
          <PopoverArrow
            data-placement={placement}
            // ref={setArrowElement as any}
            style={styles.arrow}
            tone="default"
          />
        </div>
      )}
    </>
  )
}
