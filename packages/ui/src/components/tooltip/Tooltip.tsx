import clsx from 'clsx'
import {
  type ComponentPropsWithRef,
  type ElementType,
  type FocusEvent,
  type MouseEvent,
  type PropsWithChildren,
  type ToggleEvent,
} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {
  type TooltipContentProps,
  type TooltipTriggerProps,
  tooltipContentProps,
  tooltipTriggerProps,
} from './tooltip.props'
import {TooltipContext, useTooltip, useTooltipContext} from './useTooltip'

const tooltiptriggerClassName = suffixClassName('sui-TooltipTrigger')
const tooltipContentClassName = suffixClassName('sui-TooltipContent')

function TooltipRoot({children}: PropsWithChildren) {
  const value = useTooltip()

  return <TooltipContext.Provider value={value}>{children}</TooltipContext.Provider>
}

function TooltipTrigger<T extends ElementType = 'button'>(
  props: TooltipTriggerProps<T> & Omit<ComponentPropsWithRef<T>, keyof TooltipTriggerProps<T>>,
) {
  const {id, dismissedRef} = useTooltipContext()
  const {as, children, className, style, onMouseLeave, onBlur, onClick, ...rest} = getProps(
    props,
    tooltipTriggerProps,
  )
  const Component = as || 'button'

  return (
    <Component
      aria-describedby={id}
      data-ui="TooltipTrigger"
      className={clsx(tooltiptriggerClassName, className)}
      style={{
        ...style,
        anchorName: `--tooltip-anchor-${id}`,
      }}
      interestfor={id}
      onMouseLeave={(e: MouseEvent) => {
        dismissedRef.current = false
        onMouseLeave?.(e)
      }}
      onBlur={(e: FocusEvent) => {
        dismissedRef.current = false
        onBlur?.(e)
      }}
      onClick={(e: MouseEvent) => {
        dismissedRef.current = true
        document.getElementById(id)?.togglePopover(false)
        onClick?.(e)
      }}
      {...rest}
    >
      {children}
    </Component>
  )
}

function TooltipContent({placement = 'bottom', ...props}: TooltipContentProps) {
  const {id, dismissedRef} = useTooltipContext()
  const {children, className, style, text, ...rest} = getProps(
    {placement, ...props},
    tooltipContentProps,
  )

  const handleBeforeToggle = (e: ToggleEvent) => {
    if (e.newState === 'open' && dismissedRef.current) {
      e.preventDefault()
    }
  }

  return (
    <div
      className={clsx(
        tooltipContentClassName,
        'sui-px2 sui-py1 sui-radius2 sui-position-fixed sui-shadow2',
        className,
      )}
      style={{
        ...style,
        positionAnchor: `--tooltip-anchor-${id}`,
      }}
      data-ui="TooltipContent"
      role="tooltip"
      popover="hint"
      id={id}
      onBeforeToggle={handleBeforeToggle}
      {...rest}
    >
      {text}
    </div>
  )
}

/** @public */
export const Tooltip = Object.assign(TooltipRoot, {
  Trigger: TooltipTrigger,
  Content: TooltipContent,
})
