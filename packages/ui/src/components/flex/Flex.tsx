import classNames from 'classnames'
import React from 'react'

import {getProps} from '../../utils/getProps'
import {type FlexProps, flexProps} from './flex.props'

/** @public */
export function Flex<T extends React.ElementType = 'div'>({
  display = 'flex',
  ...props
}: FlexProps<T> & Omit<React.ComponentPropsWithRef<T>, keyof FlexProps<T>>) {
  const {as, children, className, style, ...rest} = getProps({display, ...props}, flexProps)
  const Component = as || 'div'

  return (
    <Component className={classNames('sui-Flex', className)} style={style} data-ui="Flex" {...rest}>
      {children}
    </Component>
  )
}
