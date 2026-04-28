import classNames from 'classnames'
import React from 'react'

import {getProps} from '../../utils/getProps'
import {type CardProps, cardProps} from './card.props'

/** @public */
export function Card<T extends React.ElementType = 'div'>({
  density = 'regular',
  tone = 'none',
  ...props
}: CardProps<T> & Omit<React.ComponentPropsWithRef<T>, keyof CardProps<T>>) {
  const {as, children, className, style, ...rest} = getProps({density, tone, ...props}, cardProps)
  const Component = as || 'div'

  return (
    <Component
      className={classNames('sui-Card sui-border', className)}
      style={style}
      data-ui="Card"
      {...rest}
    >
      {children}
    </Component>
  )
}
