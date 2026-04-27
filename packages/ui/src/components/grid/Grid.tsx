import classNames from 'classnames'
import React from 'react'

import {getProps} from '../../utils/getProps'
import {type GridProps, gridProps} from './grid.props'

/** @public */
export function Grid<T extends React.ElementType = 'div'>({
  display = 'grid',
  ...props
}: GridProps<T> & Omit<React.ComponentPropsWithRef<T>, keyof GridProps<T>>) {
  const {as, children, className, style, ...rest} = getProps({display, ...props}, gridProps)
  const Component = as || 'div'

  return (
    <Component className={classNames('sui-Grid', className)} style={style} data-ui="Grid" {...rest}>
      {children}
    </Component>
  )
}
