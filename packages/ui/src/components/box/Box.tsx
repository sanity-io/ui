import classNames from 'classnames'
import type {ComponentPropsWithRef, ElementType} from 'react'

import {getProps} from '../../utils/getProps'
import {getVersionedClassname} from '../../utils/getVersionedClassname'
import {type BoxProps, boxProps} from './box.props'

/** @public */
export function Box<T extends ElementType = 'div'>({
  display = 'block',
  ...props
}: BoxProps<T> & Omit<ComponentPropsWithRef<T>, keyof BoxProps<T>>) {
  const {as, children, className, style, ...rest} = getProps({display, ...props}, boxProps)
  const Component = as || 'div'

  return (
    <Component
      className={classNames(getVersionedClassname('sui-Box'), className)}
      style={style}
      data-ui="Box"
      {...rest}
    >
      {children}
    </Component>
  )
}
