import classNames from 'classnames'
import React from 'react'

import {getProps} from '../../utils/getProps'
import {type ContainerProps, containerProps} from './container.props'

/** @public */
export function Container<T extends React.ElementType = 'div'>({
  marginX = 'auto',
  ...props
}: ContainerProps<T> & Omit<React.ComponentPropsWithRef<T>, keyof ContainerProps<T>>) {
  const {as, children, className, style, ...rest} = getProps({marginX, ...props}, containerProps)
  const Component = as || 'div'

  return (
    <Component
      className={classNames('sui-Container', className)}
      style={style}
      data-ui="Container"
      {...rest}
    >
      {children}
    </Component>
  )
}
