import clsx from 'clsx'
import {
  cloneElement,
  useId,
  useRef,
  type FocusEvent,
  type MouseEvent,
  type ToggleEvent,
} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {type TooltipProps, tooltipProps} from './tooltip.props'

const tooltipClassName = suffixClassName('sui-Tooltip')

/** @public */
export function Tooltip({placement = 'bottom', ...props}: TooltipProps) {
  const {
    children,
    className,
    style,
    id: idProp,
    disabled,
    text,
    asTrigger,
    triggerProps,
    ...rest
  } = getProps({placement, ...props}, tooltipProps)
  const reactId = useId()
  const id = idProp || reactId
  const tooltipId = `tooltip-${id}`
  const tooltipRef = useRef<HTMLDivElement>(null)
  const dismissedRef = useRef(false)

  if (disabled) {
    return asTrigger ? cloneElement(children, triggerProps) : children
  }

  const handleBeforeToggle = (e: ToggleEvent) => {
    if (e.newState === 'open' && dismissedRef.current) {
      e.preventDefault()
    }
  }

  const handleMouseLeave = (e: MouseEvent) => {
    dismissedRef.current = false
    children.props.onMouseLeave?.(e)
  }

  const handleOnBlur = (e: FocusEvent) => {
    dismissedRef.current = false
    children.props.onBlur?.(e)
  }

  const handleOnClick = (e: MouseEvent) => {
    dismissedRef.current = true
    tooltipRef.current?.togglePopover(false)
    children.props.onClick?.(e)
  }

  const trigger = children.props.asTrigger
    ? cloneElement(children, {
        triggerProps: {
          'aria-describedby': tooltipId,
          'interestfor': tooltipId,
          'style': {anchorName: `--anchor-${id}`},
          'onMouseLeave': handleMouseLeave,
          'onBlur': handleOnBlur,
          'onClick': handleOnClick,
        },
      })
    : cloneElement(children, {
        ...triggerProps,
        'aria-describedby': tooltipId,
        'interestfor': tooltipId,
        'style': {
          ...children.props.style,
          ...triggerProps?.style,
          anchorName: `--anchor-${id}`,
        },
        'onMouseLeave': (e: MouseEvent) => {
          triggerProps?.onMouseLeave?.(e)
          handleMouseLeave(e)
        },
        'onBlur': (e: FocusEvent) => {
          triggerProps?.onBlur?.(e)
          handleOnBlur(e)
        },
        'onClick': (e: MouseEvent) => {
          triggerProps?.onClick?.(e)
          handleOnClick(e)
        },
      })

  return (
    <>
      {trigger}

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
        id={`tooltip-${id}`}
        ref={tooltipRef}
        onBeforeToggle={handleBeforeToggle}
        {...rest}
      >
        {text}
      </div>
    </>
  )
}
