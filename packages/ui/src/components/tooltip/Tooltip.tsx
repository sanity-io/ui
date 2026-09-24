import clsx from 'clsx'
import {cloneElement, useId, useState, type ToggleEvent} from 'react'

import {useIsClient} from '../../hooks/useIsClient'
import {getProps} from '../../utils/getProps'
import {mergeTriggerProps} from '../../utils/mergeTriggerProps'
import {renderPortal} from '../../utils/renderPortal'
import {suffixClassName} from '../../utils/suffixClassName'
import {type TooltipProps, tooltipProps} from './tooltip.props'

const tooltipClassName = suffixClassName('sui-Tooltip')

function TooltipRoot({
  placement = 'bottom',
  ...props
}: TooltipProps & {
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
  } = getProps({placement, ...props}, tooltipProps)
  const reactId = useId()
  const id = idProp || reactId
  const [dismissed, setDismissed] = useState(false)
  const isClient = useIsClient()

  const triggerProps = {
    'aria-describedby': id,
    'interestfor': id,
    'style': {anchorName: `--anchor-${anchorName || id}`},
    'onMouseLeave': () => {
      setDismissed(false)
    },
    'onBlur': () => {
      setDismissed(false)
    },
    'onClick': () => {
      setDismissed(true)
      document.getElementById(id)?.hidePopover()
    },
  }

  const trigger = children.type.forwardsTriggerProps
    ? cloneElement(children, {triggerProps})
    : cloneElement(children, mergeTriggerProps(children.props, forwardedTriggerProps, triggerProps))

  const handleBeforeToggle = (e: ToggleEvent) => {
    if (e.newState === 'open' && dismissed) {
      e.preventDefault()
    }
  }

  return (
    <>
      {trigger}

      {renderPortal(
        <div
          className={clsx(
            tooltipClassName,
            'sui-px2 sui-py1 sui-radius2 sui-position-fixed sui-shadow2',
            className,
          )}
          style={{
            ...style,
            positionAnchor: `--anchor-${anchorName || id}`,
          }}
          data-ui="Tooltip"
          role="tooltip"
          popover="hint"
          id={id}
          onBeforeToggle={handleBeforeToggle}
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
export const Tooltip = Object.assign(TooltipRoot, {
  forwardsTriggerProps: true,
}) as typeof TooltipRoot

export type {TooltipProps}
