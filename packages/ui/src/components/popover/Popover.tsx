import clsx from 'clsx'
import {
  Activity,
  cloneElement,
  useId,
  useState,
  type ComponentPropsWithRef,
  type ElementType,
  type ToggleEvent,
} from 'react'

import {getProps} from '../../utils/getProps'
import {mergeTriggerProps} from '../../utils/mergeTriggerProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {type PopoverProps, popoverProps} from './popover.props'

const popoverClassName = suffixClassName('sui-PopoverContent')

function PopoverRoot<T extends ElementType = 'div'>({
  placement = 'bottom',
  ...props
}: PopoverProps<T> &
  Omit<ComponentPropsWithRef<T>, keyof PopoverProps<T>> & {
    triggerProps?: Record<string, unknown>
  }) {
  const {
    as,
    children,
    className,
    style,
    id: idProp,
    content,
    triggerProps: forwardedTriggerProps,
    ...rest
  } = getProps({placement, ...props}, popoverProps)
  const reactId = useId()
  const id = idProp || reactId
  const popoverId = `popover-${id}`
  const Component = as || 'div'
  const [open, setOpen] = useState(false)

  const handleToggle = (e: ToggleEvent) => {
    setOpen(e.newState === 'open')
  }

  const triggerProps = {
    popoverTarget: popoverId,
    style: {anchorName: `--anchor-${id}`},
  }

  const trigger = children.type.forwardsTriggerProps
    ? cloneElement(children, {triggerProps})
    : cloneElement(children, mergeTriggerProps(children.props, forwardedTriggerProps, triggerProps))

  console.log('popover trigger', trigger)

  return (
    <>
      {trigger}

      <Activity mode={open ? 'visible' : 'hidden'}>
        <Component
          className={clsx(
            popoverClassName,
            'sui-p1 sui-radius2 sui-position-fixed sui-shadow2',
            className,
          )}
          style={{
            ...style,
            positionAnchor: `--anchor-${id}`,
          }}
          data-ui="Popover"
          popover="auto"
          id={popoverId}
          onToggle={handleToggle}
          {...rest}
        >
          {content}
        </Component>
      </Activity>
    </>
  )
}

/** @public */
export const Popover = Object.assign(PopoverRoot, {
  forwardsTriggerProps: true,
})
