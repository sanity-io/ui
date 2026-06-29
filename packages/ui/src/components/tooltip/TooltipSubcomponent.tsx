import classNames from 'classnames'
import {type ComponentPropsWithRef, type ElementType, type FocusEvent, type MouseEvent} from 'react'

import {getProps} from '../../utils/getProps'
import {Box} from '../box/Box'
import {
  type TooltipSubcomponentContentProps,
  type TooltipSubcomponentRootProps,
  type TooltipSubcomponentTriggerProps,
  tooltipSubcomponentContentProps,
  tooltipSubcomponentRootProps,
  tooltipSubcomponentTriggerProps,
} from './tooltip.props'
import {TooltipContext, useTooltip, useTooltipContext} from './useTooltip'

function TooltipSubcomponentRoot(props: TooltipSubcomponentRootProps) {
  const {children, disabled, id} = getProps(props, tooltipSubcomponentRootProps)
  const value = useTooltip({disabled, id})

  return <TooltipContext.Provider value={value}>{children}</TooltipContext.Provider>
}

export function TooltipSubcomponentTrigger<T extends ElementType = 'button'>(
  props: TooltipSubcomponentTriggerProps<T> &
    Omit<ComponentPropsWithRef<T>, keyof TooltipSubcomponentTriggerProps<T>>,
) {
  const {id, disabled, setDismissed} = useTooltipContext()
  const {as, children, className, style, onMouseEnter, onFocus, onClick, ...rest} = getProps(
    props,
    tooltipSubcomponentTriggerProps,
  )
  const Component = as || 'button'

  return (
    <Component
      aria-describedby={disabled ? undefined : id}
      data-ui="TooltipSubcomponentTrigger"
      className={classNames('sui-TooltipSubcomponentTrigger', className)}
      style={
        disabled
          ? style
          : {
              ...style,
              anchorName: `--tooltip-anchor-${id}`,
            }
      }
      onMouseEnter={(e: MouseEvent<Element>) => {
        setDismissed(false)
        onMouseEnter?.(e)
      }}
      onFocus={(e: FocusEvent<Element>) => {
        setDismissed(false)
        onFocus?.(e)
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

export function TooltipSubcomponentContent({placement = 'bottom', ...props}: TooltipSubcomponentContentProps) {
  const {id, dismissed, disabled} = useTooltipContext()
  const {className, style, text, ...rest} = getProps({placement, ...props}, tooltipSubcomponentContentProps)

  if (disabled) {
    return null
  }

  return (
    <Box
      className={classNames('sui-Tooltip', dismissed ? 'sui-Tooltip-Dismissed' : '', className)}
      role="tooltip"
      style={{
        ...style,
        positionAnchor: `--tooltip-anchor-${id}`,
      }}
      data-ui="Tooltip"
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
  )
}

/** @public */
export const TooltipSubcomponent = Object.assign(TooltipSubcomponentRoot, {
  Trigger: TooltipSubcomponentTrigger,
  Content: TooltipSubcomponentContent,
})
