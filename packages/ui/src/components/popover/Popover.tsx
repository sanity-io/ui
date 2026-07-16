import clsx from 'clsx'
import {Activity, cloneElement, useId, useState, type ToggleEvent} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {type PopoverProps, popoverProps} from './popover.props'

const popoverClassName = suffixClassName('sui-PopoverContent')

/** @public */
export function Popover({placement = 'bottom', ...props}: PopoverProps) {
  const {
    children,
    className,
    style,
    id: idProp,
    content,
    ...rest
  } = getProps({placement, ...props}, popoverProps)
  const reactId = useId()
  const id = idProp || reactId
  const [open, setOpen] = useState(false)

  const handleToggle = (e: ToggleEvent) => {
    setOpen(e.newState === 'open')
  }

  const trigger = cloneElement(children, {
    popoverTarget: `popover-${id}`,
    style: {
      ...children.props.style,
      anchorName: `--anchor-${id}`,
    },
  })

  return (
    <>
      {trigger}

      <Activity mode={open ? 'visible' : 'hidden'}>
        <div
          className={clsx(
            popoverClassName,
            'sui-px2 sui-py1 sui-radius2 sui-position-fixed sui-shadow2',
            className,
          )}
          style={{
            ...style,
            positionAnchor: `--anchor-${id}`,
          }}
          data-ui="Popover"
          popover="auto"
          id={`popover-${id}`}
          onToggle={handleToggle}
          {...rest}
        >
          {content}
        </div>
      </Activity>
    </>
  )
}
