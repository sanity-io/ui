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

import {useIsClient} from '../../hooks/useIsClient'
import {getProps} from '../../utils/getProps'
import {mergeTriggerProps} from '../../utils/mergeTriggerProps'
import {renderPortal} from '../../utils/renderPortal'
import {suffixClassName} from '../../utils/suffixClassName'
import {type PopoverProps, popoverProps} from './popover.props'

const popoverClassName = suffixClassName('sui-Popover')

function PopoverRoot<T extends ElementType = 'div'>({
  placement = 'bottom',
  fullBleed = false,
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
    anchorName,
    content,
    portal,
    triggerProps: forwardedTriggerProps,
    ...rest
  } = getProps({placement, fullBleed, ...props}, popoverProps)
  const reactId = useId()
  const id = idProp || reactId
  const Component = as || 'div'
  const [open, setOpen] = useState(false)
  const isClient = useIsClient()

  const handleToggle = (e: ToggleEvent) => {
    setOpen(e.newState === 'open')
  }

  const triggerProps = {
    popoverTarget: id,
    style: {anchorName: `--anchor-${anchorName || id}`},
  }

  const trigger = children.type.forwardsTriggerProps
    ? cloneElement(children, {triggerProps})
    : cloneElement(children, mergeTriggerProps(children.props, forwardedTriggerProps, triggerProps))

  return (
    <>
      {trigger}

      {renderPortal(
        <Activity mode={open ? 'visible' : 'hidden'}>
          <Component
            className={clsx(
              popoverClassName,
              'sui-radius3 sui-position-fixed sui-shadow2 sui-text-body1 sui-text-trim-edge',
              className,
            )}
            style={{
              ...style,
              positionAnchor: `--anchor-${anchorName || id}`,
            }}
            data-ui="Popover"
            popover="auto"
            id={id}
            onToggle={handleToggle}
            {...rest}
          >
            {content}
          </Component>
        </Activity>,
        isClient,
        portal,
      )}
    </>
  )
}

/** @beta */
export const Popover = Object.assign(PopoverRoot, {
  forwardsTriggerProps: true,
})

export type {PopoverProps}
