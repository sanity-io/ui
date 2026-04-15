import React from 'react'
import classNames from 'classnames'

import {getProps} from '../utils/getProps'
import {boxProps} from './box.props'
import type { TypographyProps } from '../props/typography'
import type { TextSize } from '../types/Text'

/** @public */
export interface TextProps<T extends React.ElementType> extends TypographyProps {
  /** Element to render */
  as?: T
  /** CSS **font-size** property */
  size?: TextSize
}

/** @public */
export function Text<T extends React.ElementType = 'p'>(
  props: TextProps<T> & Omit<React.ComponentPropsWithRef<T>, keyof TextProps<T>>,
) {
  const {as, children, className, style, ...rest} = getProps(props, boxProps)
  const Component = as || 'p'

  return (
    <Component className={classNames('sui-Text', className)} style={style} data-ui="Text" {...rest}>
      {children}
    </Component>
  )
}
