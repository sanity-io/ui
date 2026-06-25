import classNames from 'classnames'
import type {ComponentPropsWithRef, ElementType} from 'react'

import {getProps} from '../../utils/getProps'
import {getVersionedClassname} from '../../utils/getVersionedClassname'
import {type VisuallyHiddenProps, visuallyHiddenProps} from './visuallyHidden.props'

/** @public */
export function VisuallyHidden<T extends ElementType = 'span'>(
  props: VisuallyHiddenProps<T> & Omit<ComponentPropsWithRef<T>, keyof VisuallyHiddenProps<T>>,
) {
  const {as, children, className, style, ...rest} = getProps(props, visuallyHiddenProps)
  const Component = as || 'span'

  return (
    <Component
      className={classNames(getVersionedClassname('sui-VisuallyHidden'), className)}
      style={style}
      data-ui="VisuallyHidden"
      {...rest}
    >
      {children}
    </Component>
  )
}
