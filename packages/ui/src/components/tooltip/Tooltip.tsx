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
  const {children, className, style, disabled, text, ...rest} = getProps(
    {placement, ...props},
    tooltipProps,
  )
  const id = useId()
  const tooltipRef = useRef<HTMLDivElement>(null)
  const dismissedRef = useRef(false)

  if (disabled) {
    return children
  }

  const handleBeforeToggle = (e: ToggleEvent) => {
    if (e.newState === 'open' && dismissedRef.current) {
      e.preventDefault()
    }
  }

  const trigger = cloneElement(children, {
    'aria-describedby': id,
    'interestfor': id,
    'style': {
      ...children.props.style,
      anchorName: `--tooltip-anchor-${id}`,
    },
    'onMouseLeave': (e: MouseEvent) => {
      dismissedRef.current = false
      children.props.onMouseLeave?.(e)
    },
    'onBlur': (e: FocusEvent) => {
      dismissedRef.current = false
      children.props.onBlur?.(e)
    },
    'onClick': (e: MouseEvent) => {
      dismissedRef.current = true
      tooltipRef.current?.togglePopover(false)
      children.props.onClick?.(e)
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
          positionAnchor: `--tooltip-anchor-${id}`,
        }}
        data-ui="Tooltip"
        role="tooltip"
        popover="hint"
        id={id}
        ref={tooltipRef}
        onBeforeToggle={handleBeforeToggle}
        {...rest}
      >
        {text}
      </div>
    </>
  )
}
