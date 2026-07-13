import clsx from 'clsx'
import {Activity, type ComponentPropsWithRef, type ElementType, type FocusEvent, type MouseEvent} from 'react'

import {getProps} from '../../utils/getProps'
import {Box} from '../box/Box'
import {
  type TooltipContentProps,
  type TooltipSubcomponentRootProps,
  type TooltipTriggerProps,
  tooltipContentProps,
  tooltipSubcomponentRootProps,
  tooltipTriggerProps,
} from './tooltip.props'
import {TooltipContext, useTooltip, useTooltipContext} from './useTooltip'
import { suffixClassName } from '../../utils/suffixClassName'

const tooltiptriggerClassName = suffixClassName('sui-TooltipTrigger')
const tooltipContentClassName = suffixClassName('sui-TooltipContent')

function TooltipRoot(props: TooltipSubcomponentRootProps) {
  const {children, disabled, id} = getProps(props, tooltipSubcomponentRootProps)
  const value = useTooltip({disabled, id})

  return <TooltipContext.Provider value={value}>{children}</TooltipContext.Provider>
}

export function TooltipTrigger<T extends ElementType = 'button'>(
  props: TooltipTriggerProps<T> &
    Omit<ComponentPropsWithRef<T>, keyof TooltipTriggerProps<T>>,
) {
  const {id, disabled, setDismissed} = useTooltipContext()
  const {as, children, className, style, onMouseLeave, onBlur, onClick, ...rest} = getProps(
    props,
    tooltipTriggerProps,
  )
  const Component = as || 'button'

  return (
    <Component
      aria-describedby={disabled ? undefined : id}
      data-ui="TooltipTrigger"
      className={clsx(tooltiptriggerClassName, className)}
      style={
        disabled
          ? style
          : {
              ...style,
              anchorName: `--tooltip-anchor-${id}`,
            }
      }
      onMouseLeave={(e: MouseEvent<Element>) => {
        setDismissed(false)
        onMouseLeave?.(e)
      }}
      onBlur={(e: FocusEvent<Element>) => {
        setDismissed(false)
        onBlur?.(e)
      }}
      onClick={(e: MouseEvent<Element>) => {
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
  const {id, dismissed, disabled} = useTooltipContext()
  const {className, style, text, ...rest} = getProps({placement, ...props}, tooltipContentProps)

  if (disabled) {
    return null
  }

  return (
    <Activity mode={dismissed ? 'hidden' : 'visible'}>
      <Box
        className={clsx(tooltipContentClassName, dismissed ? 'sui-tooltip-dismissed' : '', className)}
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
export const TooltipSubcomponent = Object.assign(TooltipRoot, {
  Trigger: TooltipTrigger,
  Content: TooltipContent,
})
