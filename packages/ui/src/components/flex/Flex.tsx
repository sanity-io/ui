import classNames from 'classnames'
import type {ComponentPropsWithRef, ElementType} from 'react'

import {getProps} from '../../utils/getProps'
import {getVersionedClassname} from '../../utils/getVersionedClassname'
import {type FlexProps, flexProps} from './flex.props'

/** @public */
export function Flex<T extends ElementType = 'div'>({
  display = 'flex',
  ...props
}: FlexProps<T> & Omit<ComponentPropsWithRef<T>, keyof FlexProps<T>>) {
  const {as, children, className, style, ...rest} = getProps({display, ...props}, flexProps)
  const Component = as || 'div'

  return (
    <Component
      className={classNames(getVersionedClassname('sui-Flex'), className)}
      style={style}
      data-ui="Flex"
      {...rest}
    >
      {children}
    </Component>
  )
}
