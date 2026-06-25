import classNames from 'classnames'
import type {ComponentPropsWithRef, ElementType} from 'react'

import {getProps} from '../../utils/getProps'
import {getVersionedClassname} from '../../utils/getVersionedClassname'
import {type GridProps, gridProps} from './grid.props'

/** @public */
export function Grid<T extends ElementType = 'div'>({
  display = 'grid',
  ...props
}: GridProps<T> & Omit<ComponentPropsWithRef<T>, keyof GridProps<T>>) {
  const {as, children, className, style, ...rest} = getProps({display, ...props}, gridProps)
  const Component = as || 'div'

  return (
    <Component
      className={classNames(getVersionedClassname('sui-Grid'), className)}
      style={style}
      data-ui="Grid"
      {...rest}
    >
      {children}
    </Component>
  )
}
