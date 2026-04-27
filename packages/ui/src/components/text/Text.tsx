import classNames from 'classnames'
import React from 'react'

import {getProps} from '../../utils/getProps'
import {type TextProps, textProps} from './text.props'

/** @public */
export function Text<T extends React.ElementType = 'span'>({
  size = 2,
  ...props
}: TextProps<T> & Omit<React.ComponentPropsWithRef<T>, keyof TextProps<T>>) {
  const {as, children, className, style, ...rest} = getProps({size, ...props}, textProps)
  const Component = as || 'span'

  if (props.lineClamp && props.trim) {
    return (
      <Component
        className={classNames('sui-Text', className?.replace('sui-line-clamp', ''))}
        style={style}
        data-ui="Text"
        {...rest}
      >
        <span className="sui-line-clamp">{children}</span>
      </Component>
    )
  }

  return (
    <Component className={classNames('sui-Text', className)} style={style} data-ui="Text" {...rest}>
      {children}
    </Component>
  )
}
