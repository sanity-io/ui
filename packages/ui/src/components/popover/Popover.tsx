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
import {type TriggerProps} from '../trigger/trigger.props'
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
    asTrigger,
    triggerProps: forwardedTriggerProps,
    ...rest
  } = getProps({placement, ...props}, popoverProps)
  const reactId = useId()
  const id = idProp || reactId
  const [open, setOpen] = useState(false)
  const {anchorName: _anchorName, ...contentStyle} = style ?? {}

  const handleToggle = (e: ToggleEvent) => {
    setOpen(e.newState === 'open')
  }

  const popoverTriggerProps: TriggerProps = {
    popoverTarget: `popover-${id}`,
    style: {anchorName: `--anchor-${id}`},
  }

  let trigger

  if (asTrigger) {
    const triggerProps: TriggerProps = {
      ...forwardedTriggerProps,
      ...popoverTriggerProps,
      style: {
        ...children.props.style,
        ...forwardedTriggerProps?.style,
        ...popoverTriggerProps.style,
      },
      onClick: (e: MouseEvent) => {
        forwardedTriggerProps?.onClick?.(e)
        children.props.onClick?.(e)
      },
      onBlur: (e: FocusEvent) => {
        forwardedTriggerProps?.onBlur?.(e)
        children.props.onBlur?.(e)
      },
      onMouseLeave: (e: MouseEvent) => {
        forwardedTriggerProps?.onMouseLeave?.(e)
        children.props.onMouseLeave?.(e)
      },
    }

    trigger = cloneElement(children, triggerProps)
  } else if (children.props.asTrigger) {
    trigger = cloneElement(children, {
      triggerProps: {popoverTarget: popoverTriggerProps.popoverTarget},
    })
  } else {
    trigger = cloneElement(children, {
      ...popoverTriggerProps,
      style: {...children.props.style, ...popoverTriggerProps.style},
    })
  }

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
