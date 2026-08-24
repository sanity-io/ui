import clsx from 'clsx'
import {Activity, cloneElement, useId, useState, type ToggleEvent} from 'react'

import {useIsClient} from '../../hooks/useIsClient'
import {getProps} from '../../utils/getProps'
import {mergeTriggerProps} from '../../utils/mergeTriggerProps'
import {renderPortal} from '../../utils/renderPortal'
import {suffixClassName} from '../../utils/suffixClassName'
import {type PopoverProps, popoverProps} from './popover.props'

const popoverClassName = suffixClassName('sui-PopoverContent')

function PopoverRoot({
  placement = 'bottom',
  ...props
}: PopoverProps & {
  triggerProps?: Record<string, unknown>
}) {
  const {
    children,
    className,
    style,
    id: idProp,
    anchorName,
    content,
    portal,
    triggerProps: forwardedTriggerProps,
    ...rest
  } = getProps({placement, ...props}, popoverProps)
  const reactId = useId()
  const id = idProp || reactId
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
          <div
            className={clsx(
              popoverClassName,
              'sui-px2 sui-py1 sui-radius2 sui-position-fixed sui-shadow2',
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
          </div>
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
