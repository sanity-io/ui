import clsx from 'clsx'
import type {ComponentPropsWithRef, ElementType} from 'react'

import {getProps} from '../../utils/getProps'
import {getVersionedClassname} from '../../utils/getVersionedClassname'
import {type PressAreaProps, pressAreaProps} from './pressArea.props'

const pressAreaClassname = getVersionedClassname('sui-PressArea')

/** @public */
export function PressArea<T extends ElementType = 'button'>(
  props: PressAreaProps<T> & Omit<ComponentPropsWithRef<T>, keyof PressAreaProps<T>>,
) {
  const {as, children, className, style, ...rest} = getProps(props, pressAreaProps)
  const Component = as || 'button'

  return (
    <Component
      className={clsx(pressAreaClassname, 'sui-width-full', className)}
      style={style}
      data-ui="PressArea"
      {...rest}
    >
      {children}
    </Component>
  )
}
