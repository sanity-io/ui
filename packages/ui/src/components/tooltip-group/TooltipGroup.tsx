import clsx from 'clsx'
import {type ElementType, useRef, useState} from 'react'

import {composeRefs} from '../../utils/composeRefs'
import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {type TooltipGroupProps, tooltipGroupProps} from './tooltipGroup.props'

const tooltipGroupClassName = suffixClassName('sui-TooltipGroup')

/** @public */
export function TooltipGroup<T extends ElementType = 'div'>(props: TooltipGroupProps<T>) {
  const {as, children, className, style, ref, ...rest} = getProps(props, tooltipGroupProps)
  const Component = as || 'div'
  const tooltipGroupRef = useRef<HTMLElement>(null)
  const [isActive, setIsActive] = useState(false)

  const handleTransitionEnd = (e: TransitionEvent) => {
    const tooltip = (e.target as Element).closest('[data-ui="Tooltip"]')

    if (!tooltip) {
      return
    }

    if (e.propertyName === 'opacity' && window.getComputedStyle(tooltip).opacity !== '0') {
      setIsActive(true)
    }
  }

  const handleMouseLeave = () => {
    setIsActive(false)
  }

  const handleBlur = (e: FocusEvent) => {
    if (tooltipGroupRef.current && tooltipGroupRef.current.contains(e.relatedTarget as Node)) {
      return
    }

    setIsActive(false)
  }

  return (
    <Component
      className={clsx(tooltipGroupClassName, className)}
      style={{
        ...style,
        ...(isActive && {
          '--tooltip-delay-group': '0ms',
        }),
      }}
      {...rest}
      data-ui="TooltipGroup"
      ref={composeRefs(tooltipGroupRef, ref)}
      onTransitionEnd={handleTransitionEnd}
      onMouseLeave={handleMouseLeave}
      onBlur={handleBlur}
    >
      {children}
    </Component>
  )
}

export type {TooltipGroupProps}
