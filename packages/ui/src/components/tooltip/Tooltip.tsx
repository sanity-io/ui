import clsx from 'clsx'
import {Activity, cloneElement, useId, useRef, useState, type ToggleEvent} from 'react'

import {getProps} from '../../utils/getProps'
import {mergeTriggerProps} from '../../utils/mergeTriggerProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {type TooltipProps, tooltipProps} from './tooltip.props'

const tooltipClassName = suffixClassName('sui-Tooltip')

function TooltipRoot({
  placement = 'bottom',
  ...props
}: TooltipProps & {
  triggerProps?: Record<string, unknown>
}) {
  const {
    children,
    className,
    style,
    id: idProp,
    disabled,
    content,
    triggerProps: forwardedTriggerProps,
    ...rest
  } = getProps({placement, ...props}, tooltipProps)
  const reactId = useId()
  const id = idProp || reactId
  const tooltipId = `tooltip-${id}`
  const tooltipRef = useRef<HTMLDivElement>(null)
  const dismissedRef = useRef(false)
  const [open, setOpen] = useState(false)

  const triggerProps = disabled
    ? undefined
    : {
        'aria-describedby': tooltipId,
        'interestfor': tooltipId,
        'style': {anchorName: `--anchor-${id}`},
        'onMouseLeave': () => {
          dismissedRef.current = false
        },
        'onBlur': () => {
          dismissedRef.current = false
        },
        'onClick': () => {
          dismissedRef.current = true
          tooltipRef.current?.togglePopover(false)
        },
      }

  const trigger = children.type.forwardsTriggerProps
    ? cloneElement(children, {triggerProps: disabled ? forwardedTriggerProps : triggerProps})
    : cloneElement(children, mergeTriggerProps(children.props, forwardedTriggerProps, triggerProps))

  if (disabled) {
    return trigger
  }

  const handleBeforeToggle = (e: ToggleEvent) => {
    if (e.newState === 'open' && dismissedRef.current) {
      e.preventDefault()
    }
  }

  const handleToggle = (e: ToggleEvent) => {
    setOpen(e.newState === 'open')
  }

  return (
    <>
      {trigger}

      <Activity mode={open ? 'visible' : 'hidden'}>
        <div
          className={clsx(
            tooltipClassName,
            'sui-px2 sui-py1 sui-radius2 sui-position-fixed sui-shadow2',
            className,
          )}
          style={{
            ...style,
            positionAnchor: `--anchor-${id}`,
          }}
          data-ui="Tooltip"
          role="tooltip"
          popover="hint"
          id={tooltipId}
          ref={tooltipRef}
          onBeforeToggle={handleBeforeToggle}
          onToggle={handleToggle}
          {...rest}
        >
          {content}
        </div>
      </Activity>
    </>
  )
}

/** @public */
export const Tooltip = Object.assign(TooltipRoot, {
  forwardsTriggerProps: true,
}) as typeof TooltipRoot
