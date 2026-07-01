import clsx from 'clsx'
import type {ComponentPropsWithRef, ElementType} from 'react'

import {getProps} from '../../utils/getProps'
import {type BoxProps, boxProps} from './box.props'

/** @public */
export function Box<T extends ElementType = 'div'>({
  display = 'block',
  ...props
}: BoxProps<T> & Omit<ComponentPropsWithRef<T>, keyof BoxProps<T>>) {
  const {as, children, className, style, ...rest} = getProps({display, ...props}, boxProps)
  const Component = as || 'div'

  return (
    <Component className={clsx('sui-Box', className)} style={style} data-ui="Box" {...rest}>
      {children}
    </Component>
  )
}
