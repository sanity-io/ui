import classNames from 'classnames'
import type {ComponentPropsWithRef, ElementType} from 'react'

import {getProps} from '../../utils/getProps'
import {getVersionedClassname} from '../../utils/getVersionedClassname'
import {type CardProps, cardProps} from './card.props'

const cardClassname = getVersionedClassname('sui-Card')

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
      className={classNames(cardClassname, 'sui-border', className)}
      style={style}
      data-ui="Card"
      {...rest}
    >
      {children}
    </Component>
  )
}
