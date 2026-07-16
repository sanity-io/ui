import clsx from 'clsx'
import {
  Activity,
  type ComponentPropsWithRef,
  type ElementType,
  type PropsWithChildren,
  type ToggleEvent,
} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {
  popoverContentProps,
  popoverTriggerProps,
  type PopoverContentProps,
  type PopoverTriggerProps,
} from './popover.props'
import {PopoverContext, usePopover, usePopoverContext} from './usePopover'

const popovertriggerClassName = suffixClassName('sui-PopoverTrigger')
const popoverContentClassName = suffixClassName('sui-PopoverContent')

function PopoverRoot({children}: PropsWithChildren) {
  const value = usePopover()

  return <PopoverContext.Provider value={value}>{children}</PopoverContext.Provider>
}

function PopoverTrigger<T extends ElementType = 'button'>(
  props: PopoverTriggerProps<T> & Omit<ComponentPropsWithRef<T>, keyof PopoverTriggerProps<T>>,
) {
  const {id} = usePopoverContext()
  const {as, children, className, style, ...rest} = getProps(props, popoverTriggerProps)
  const Component = as || 'button'

  return (
    <Component
      popoverTarget={id}
      data-ui="PopoverTrigger"
      className={clsx(popovertriggerClassName, className)}
      style={{
        ...style,
        anchorName: `--popover-anchor-${id}`,
      }}
      {...rest}
    >
      {children}
    </Component>
  )
}

function PopoverContent({placement = 'bottom', ...props}: PopoverContentProps) {
  const {id, open, setOpen} = usePopoverContext()
  const {children, className, style, ...rest} = getProps({placement, ...props}, popoverContentProps)

  const handleToggle = (e: ToggleEvent) => {
    setOpen(e.newState === 'open')
  }

  return (
    <Activity mode={open ? 'visible' : 'hidden'}>
      <div
        className={clsx(
          popoverContentClassName,
          'sui-px2 sui-py1 sui-radius2 sui-position-fixed sui-shadow2',
          className,
        )}
        style={{
          ...style,
          positionAnchor: `--popover-anchor-${id}`,
        }}
        data-ui="PopoverContent"
        popover="auto"
        id={id}
        onToggle={handleToggle}
        {...rest}
      >
        {children}
      </div>
    </Activity>
  )
}

/** @public */
export const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
})
