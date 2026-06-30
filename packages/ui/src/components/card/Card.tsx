import clsx from 'clsx'
import type {ComponentPropsWithRef, ElementType} from 'react'

import {getProps} from '../../utils/getProps'
import {type CardProps, cardProps} from './card.props'

/** @public */
export function Card<T extends ElementType = 'div'>({
  density = 'regular',
  tone = 'neutral',
  ...props
}: CardProps<T> & Omit<ComponentPropsWithRef<T>, keyof CardProps<T>>) {
  const {as, children, className, style, ...rest} = getProps({density, tone, ...props}, cardProps)
  const Component = as || 'div'

  return (
    <Component
      className={clsx('sui-Card sui-border', className)}
      style={style}
      data-ui="Card"
      {...rest}
    >
      {children}
    </Component>
  )
}
