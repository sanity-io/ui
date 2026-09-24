import clsx from 'clsx'
import type {ComponentPropsWithRef, ElementType} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {type VisuallyHiddenProps, visuallyHiddenProps} from './visuallyHidden.props'

const visuallyHiddenClassName = suffixClassName('sui-VisuallyHidden')

/** @public */
export function VisuallyHidden<T extends ElementType = 'span'>(
  props: VisuallyHiddenProps<T> & Omit<ComponentPropsWithRef<T>, keyof VisuallyHiddenProps<T>>,
) {
  const {as, children, className, style, ...rest} = getProps(props, visuallyHiddenProps)
  const Component = as || 'span'

  return (
    <Component
      className={clsx(visuallyHiddenClassName, className)}
      style={style}
      data-ui="VisuallyHidden"
      {...rest}
    >
      {children}
    </Component>
  )
}

export type {VisuallyHiddenProps}
