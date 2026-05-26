import classNames from 'classnames'
import type {ComponentPropsWithRef, ElementType} from 'react'

import {getProps} from '../../utils/getProps'
import {type HeadingProps, headingProps} from './heading.props'

/** @public */
export function Heading<T extends ElementType = 'h2'>({
  size = 2,
  weight = 'bold',
  ...props
}: HeadingProps & Omit<ComponentPropsWithRef<T>, keyof HeadingProps>) {
  const {as, children, className, style, ...rest} = getProps({size, weight, ...props}, headingProps)
  const Component = as || 'h2'

  if (props.lineClamp && props.trim) {
    return (
      <Component
        className={classNames('sui-Heading', className?.replace('sui-line-clamp', ''))}
        style={style}
        data-ui="Heading"
        {...rest}
      >
        <span className="sui-line-clamp">{children}</span>
      </Component>
    )
  }

  return (
    <Component
      className={classNames('sui-Heading', className)}
      style={style}
      data-ui="Heading"
      {...rest}
    >
      {children}
    </Component>
  )
}
