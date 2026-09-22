import clsx from 'clsx'
import type {ComponentPropsWithRef, ElementType} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {type BoxProps, boxProps} from './box.props'

const boxClassName = suffixClassName('sui-Box')

/** @public */
export function Box<T extends ElementType = 'div'>({
  display = 'block',
  ...props
}: BoxProps<T> & Omit<ComponentPropsWithRef<T>, keyof BoxProps<T>>) {
  const {as, children, className, style, ...rest} = getProps({display, ...props}, boxProps)
  const Component = as || 'div'

  return (
    <Component className={clsx(boxClassName, className)} style={style} data-ui="Box" {...rest}>
      {children}
    </Component>
  )
}

export type {BoxProps}
