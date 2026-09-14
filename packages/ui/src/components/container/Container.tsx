import clsx from 'clsx'
import type {ComponentPropsWithRef, ElementType} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {type ContainerProps, containerProps} from './container.props'

const containerClassName = suffixClassName('sui-Container')

/** @public */
export function Container<T extends ElementType = 'div'>({
  marginX = 'auto',
  ...props
}: ContainerProps<T> & Omit<ComponentPropsWithRef<T>, keyof ContainerProps<T>>) {
  const {as, children, className, style, ...rest} = getProps({marginX, ...props}, containerProps)
  const Component = as || 'div'

  return (
    <Component
      className={clsx(containerClassName, className)}
      style={style}
      data-ui="Container"
      {...rest}
    >
      {children}
    </Component>
  )
}

export type {ContainerProps}
