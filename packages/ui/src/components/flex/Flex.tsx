import clsx from 'clsx'
import type {ComponentPropsWithRef, ElementType} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {type FlexProps, flexProps} from './flex.props'

const flexClassName = suffixClassName('sui-Flex')

/** @public */
export function Flex<T extends ElementType = 'div'>({
  display = 'flex',
  minHeight = '0',
  minWidth = '0',
  ...props
}: FlexProps<T> & Omit<ComponentPropsWithRef<T>, keyof FlexProps<T>>) {
  const {as, children, className, style, ...rest} = getProps(
    {display, minHeight, minWidth, ...props},
    flexProps,
  )
  const Component = as || 'div'

  return (
    <Component className={clsx(flexClassName, className)} style={style} data-ui="Flex" {...rest}>
      {children}
    </Component>
  )
}

export type {FlexProps}
