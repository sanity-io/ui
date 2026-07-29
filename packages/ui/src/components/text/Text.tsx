import clsx from 'clsx'
import type {ComponentPropsWithRef, ElementType} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {type TextProps, textProps} from './text.props'

const textClassName = suffixClassName('sui-Text')

/** @public */
export function Text<T extends ElementType = 'span'>({
  size = 2,
  ...props
}: TextProps<T> & Omit<ComponentPropsWithRef<T>, keyof TextProps<T>>) {
  const {as, children, className, style, ...rest} = getProps({size, ...props}, textProps)
  const Component = as || 'span'

  if (props.truncate && props.trim) {
    return (
      <Component
        className={clsx(
          textClassName,
          className?.replace('sui-line-clamp', '').replace('sui-text-overflow', ''),
        )}
        style={style}
        data-ui="Text"
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
      className={clsx(textClassName, 'sui-overflow-hidden', className)}
      style={style}
      data-ui="Text"
      {...rest}
    >
      {children}
    </Component>
  )
}

export type {TextProps}
