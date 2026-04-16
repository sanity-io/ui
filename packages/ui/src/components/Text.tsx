import classNames from 'classnames'
import React from 'react'

import type {TypographyProps} from '../props/typography'
import type {TextSize} from '../types/Text'
import {getProps} from '../utils/getProps'
import {textProps} from './text.props'

/** @public */
export interface TextProps<T extends React.ElementType> extends TypographyProps {
  /** Element to render */
  as?: T
  /** CSS **font-size** property */
  size?: TextSize
}

/** @public */
export function Text<T extends React.ElementType = 'p'>({
  size = 2,
  ...props
}: TextProps<T> & Omit<React.ComponentPropsWithRef<T>, keyof TextProps<T>>) {
  const {as, children, className, style, ...rest} = getProps({size, ...props}, textProps)
  const Component = as || 'p'

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
