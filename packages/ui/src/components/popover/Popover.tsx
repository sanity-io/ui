import clsx from 'clsx'
import {cloneElement, useId} from 'react'

import {useIsClient} from '../../hooks/useIsClient'
import {getProps} from '../../utils/getProps'
import {mergeTriggerProps} from '../../utils/mergeTriggerProps'
import {renderPortal} from '../../utils/renderPortal'
import {suffixClassName} from '../../utils/suffixClassName'
import {type PopoverProps, popoverProps} from './popover.props'

const popoverClassName = suffixClassName('sui-Popover')

function PopoverRoot({
  placement = 'bottom',
  fullBleed = false,
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
  } = getProps({placement, fullBleed, ...props}, popoverProps)
  const reactId = useId()
  const id = idProp || reactId
  const isClient = useIsClient()

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
        <div
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
          {...rest}
        >
          {content}
        </div>,
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
