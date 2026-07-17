import clsx from 'clsx'
import {
  Activity,
  cloneElement,
  useId,
  useState,
  type FocusEvent,
  type MouseEvent,
  type ToggleEvent,
} from 'react'

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
    triggerProps,
    ...rest
  } = getProps({placement, ...props}, popoverProps)
  const reactId = useId()
  const id = idProp || reactId
  const popoverId = `popover-${id}`
  const [open, setOpen] = useState(false)
  const {anchorName: _anchorName, ...contentStyle} = style ?? {}

  const handleToggle = (e: ToggleEvent) => {
    setOpen(e.newState === 'open')
  }

  const trigger = children.props.asTrigger
    ? cloneElement(children, {
        triggerProps: {popoverTarget: popoverId},
      })
    : cloneElement(children, {
        ...triggerProps,
        popoverTarget: popoverId,
        style: {
          ...children.props.style,
          ...triggerProps?.style,
          anchorName: `--anchor-${id}`,
        },
        onClick: (e: MouseEvent) => {
          triggerProps?.onClick?.(e)
          children.props.onClick?.(e)
        },
        onBlur: (e: FocusEvent) => {
          triggerProps?.onBlur?.(e)
          children.props.onBlur?.(e)
        },
        onMouseLeave: (e: MouseEvent) => {
          triggerProps?.onMouseLeave?.(e)
          children.props.onMouseLeave?.(e)
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
            ...contentStyle,
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
