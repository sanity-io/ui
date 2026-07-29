import clsx from 'clsx'
import type {ComponentPropsWithRef, ElementType} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {type HeadingProps, headingProps} from './heading.props'

const headingClassName = suffixClassName('sui-Heading')

/** @public */
export function Heading<T extends ElementType = 'h2'>({
  size = 2,
  weight = 'bold',
  ...props
}: HeadingProps & Omit<ComponentPropsWithRef<T>, keyof HeadingProps>) {
  const {as, children, className, style, ...rest} = getProps({size, weight, ...props}, headingProps)
  const Component = as || 'h2'

  if (props.truncate && props.trim) {
    return (
      <Component
        className={clsx(
          headingClassName,
          className?.replace('sui-line-clamp', '').replace('sui-text-overflow', ''),
        )}
        style={style}
        data-ui="Heading"
        {...rest}
      >
        <span
          className={clsx(
            'sui-overflow-hidden',
            props.truncate === 1 ? 'sui-text-overflow' : 'sui-line-clamp',
          )}
        >
          {children}
        </span>
      </Component>
    )
  }

  return (
    <Component
      className={clsx(headingClassName, 'sui-overflow-hidden', className)}
      style={style}
      data-ui="Heading"
      {...rest}
    >
      {children}
    </Component>
  )
}

export type {HeadingProps}
