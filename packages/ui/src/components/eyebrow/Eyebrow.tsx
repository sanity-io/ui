import clsx from 'clsx'
import type {ComponentPropsWithRef, ElementType} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {type EyebrowProps, eyebrowProps} from './eyebrow.props'

const eyebrowClassName = suffixClassName('sui-Eyebrow')

/** @public */
export function Eyebrow<T extends ElementType = 'span'>({
  size = 2,
  weight = 'semibold',
  ...props
}: EyebrowProps<T> & Omit<ComponentPropsWithRef<T>, keyof EyebrowProps<T>>) {
  const {as, children, className, style, ...rest} = getProps({size, weight, ...props}, eyebrowProps)
  const Component = as || 'span'

  if (props.lineClamp && props.trim) {
    return (
      <Component
        className={clsx(eyebrowClassName, className?.replace('sui-line-clamp', ''))}
        style={style}
        data-ui="Eyebrow"
        {...rest}
      >
        <span className="sui-line-clamp">{children}</span>
      </Component>
    )
  }

  return (
    <Component
      className={clsx(eyebrowClassName, className)}
      style={style}
      data-ui="Eyebrow"
      {...rest}
    >
      {children}
    </Component>
  )
}
