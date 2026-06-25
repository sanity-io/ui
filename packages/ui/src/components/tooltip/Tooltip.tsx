import classNames from 'classnames'
import {cloneElement, useEffect, useId, useState} from 'react'

import {getProps} from '../../utils/getProps'
import {getVersionedClassname} from '../../utils/getVersionedClassname'
import {Box} from '../box/Box'
import {type TooltipProps, tooltipProps} from './tooltip.props'

/** @public */
export function Tooltip({placement = 'bottom', ...props}: TooltipProps) {
  const {
    children,
    className,
    style,
    disabled,
    id: idProp,
    text,
    ...rest
  } = getProps({placement, ...props}, tooltipProps)
  const reactId = useId()
  const id = idProp || reactId
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (dismissed) {
      return
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDismissed(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [dismissed])

  const trigger = cloneElement(children, {
    'aria-describedby': id,
    'onMouseEnter': (e) => {
      setDismissed(false)
      children.props.onMouseEnter?.(e)
    },
    'onFocus': (e) => {
      setDismissed(false)
      children.props.onFocus?.(e)
    },
    'onClick': (e) => {
      setDismissed(true)
      children.props.onClick?.(e)
    },
    'style': {
      ...children.props.style,
      anchorName: `--tooltip-anchor-${id}`,
    },
  })

  if (disabled) {
    return children
  }

  return (
    <>
      {trigger}

      <Box
        className={classNames(
          getVersionedClassname('sui-Tooltip'),
          dismissed ? getVersionedClassname('sui-Tooltip-Dismissed') : '',
          className,
        )}
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
    </>
  )
}
