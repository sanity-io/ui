import clsx from 'clsx'
import {
  Activity,
  type ComponentPropsWithRef,
  type ElementType,
  type FocusEvent,
  type MouseEvent,
  type PropsWithChildren,
} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Box} from '../box/Box'
import {
  type TooltipContentProps,
  type TooltipTriggerProps,
  tooltipContentProps,
  tooltipTriggerProps,
} from './tooltip.props'
import {TooltipContext, useTooltip, useTooltipContext} from './useTooltip'

console.log('teste')

const tooltiptriggerClassName = suffixClassName('sui-TooltipTrigger')
const tooltipContentClassName = suffixClassName('sui-TooltipContent')

function TooltipRoot({children}: PropsWithChildren) {
  const value = useTooltip()

  return <TooltipContext.Provider value={value}>{children}</TooltipContext.Provider>
}

export function TooltipTrigger<T extends ElementType = 'button'>(
  props: TooltipTriggerProps<T> & Omit<ComponentPropsWithRef<T>, keyof TooltipTriggerProps<T>>,
) {
  const {id, setDismissed} = useTooltipContext()
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
      onMouseLeave={(e: MouseEvent) => {
        setDismissed(false)
        onMouseLeave?.(e)
      }}
      onBlur={(e: FocusEvent) => {
        setDismissed(false)
        onBlur?.(e)
      }}
      onClick={(e: MouseEvent) => {
        setDismissed(true)
        onClick?.(e)
      }}
      {...rest}
    >
      {children}
    </Component>
  )
}

export function TooltipContent({placement = 'bottom', ...props}: TooltipContentProps) {
  const {id, dismissed} = useTooltipContext()
  const {className, style, text, ...rest} = getProps({placement, ...props}, tooltipContentProps)

  return (
    <Activity mode={dismissed ? 'hidden' : 'visible'}>
      <Box
        className={clsx(
          tooltipContentClassName,
          dismissed ? 'sui-tooltip-dismissed' : '',
          className,
        )}
        role="tooltip"
        style={{
          ...style,
          positionAnchor: `--tooltip-anchor-${id}`,
        }}
        data-ui="TooltipContent"
        id={id}
        paddingX={2}
        paddingY={1}
        radius={2}
        position="fixed"
        zIndex={9999}
        shadow={2}
        {...rest}
      >
        {text}
      </Box>
    </Activity>
  )
}

/** @public */
export const Tooltip = Object.assign(TooltipRoot, {
  Trigger: TooltipTrigger,
  Content: TooltipContent,
})
