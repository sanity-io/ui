import clsx from 'clsx'
import type {ComponentPropsWithRef, ElementType} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {type GridProps, gridProps} from './grid.props'

const gridClassName = suffixClassName('sui-Grid')

/** @public */
export function Grid<T extends ElementType = 'div'>({
  display = 'grid',
  minHeight = '0',
  minWidth = '0',
  ...props
}: GridProps<T> & Omit<ComponentPropsWithRef<T>, keyof GridProps<T>>) {
  const {as, children, className, style, ...rest} = getProps(
    {display, minHeight, minWidth, ...props},
    gridProps,
  )
  const Component = as || 'div'

  return (
    <Component className={clsx(gridClassName, className)} style={style} data-ui="Grid" {...rest}>
      {children}
    </Component>
  )
}

export type {GridProps}
