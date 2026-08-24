import clsx from 'clsx'
import {type ComponentPropsWithRef, type ElementType, useRef, useState} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {type TooltipGroupProps, tooltipGroupProps} from './tooltipGroup.props'

const tooltipGroupClassName = suffixClassName('sui-TooltipGroup')

/** @public */
export function TooltipGroup<T extends ElementType = 'div'>(
  props: TooltipGroupProps<T> & Omit<ComponentPropsWithRef<T>, keyof TooltipGroupProps<T>>,
) {
  const {as, children, className, style, ...rest} = getProps(props, tooltipGroupProps)
  const Component = as || 'div'
  const ref = useRef<HTMLElement>(null)
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
    if (ref.current && ref.current.contains(e.relatedTarget as Node)) {
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
      data-ui="TooltipGroup"
      ref={ref}
      onTransitionEnd={handleTransitionEnd}
      onMouseLeave={handleMouseLeave}
      onBlur={handleBlur}
      {...rest}
    >
      {children}
    </Component>
  )
}

export type {TooltipGroupProps}
