import clsx from 'clsx'
import {cloneElement, useEffect, useId, useRef, useState, type ToggleEvent} from 'react'

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
  const tooltipRef = useRef<HTMLDivElement>(null)
  const dismissedRef = useRef(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const triggerProps = {
    'aria-describedby': id,
    'interestfor': id,
    'style': {anchorName: `--anchor-${anchorName || id}`},
    'onMouseLeave': () => {
      dismissedRef.current = false
    },
    'onBlur': () => {
      dismissedRef.current = false
    },
    'onClick': () => {
      dismissedRef.current = true
      tooltipRef.current?.togglePopover(false)
    },
  }

  const trigger = children.type.forwardsTriggerProps
    ? cloneElement(children, {triggerProps})
    : cloneElement(children, mergeTriggerProps(children.props, forwardedTriggerProps, triggerProps))

  const handleBeforeToggle = (e: ToggleEvent) => {
    if (e.newState === 'open' && dismissedRef.current) {
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
          ref={tooltipRef}
          onBeforeToggle={handleBeforeToggle}
          {...rest}
        >
          {content}
        </div>,
        mounted,
        portal,
      )}
    </>
  )
}

/** @beta */
export const Tooltip = Object.assign(TooltipRoot, {
  forwardsTriggerProps: true,
}) as typeof TooltipRoot
