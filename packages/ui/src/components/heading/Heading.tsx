import classNames from 'classnames'
import React from 'react'

import {getProps} from '../../utils/getProps'
import {type HeadingProps, headingProps} from './heading.props'

/** @public */
export function Heading<T extends React.ElementType = 'h1'>({
  size = 2,
  ...props
}: HeadingProps & Omit<React.ComponentPropsWithRef<T>, keyof HeadingProps>) {
  const {as, children, className, style, ...rest} = getProps({size, ...props}, headingProps)
  const Component = as || 'h1'

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
