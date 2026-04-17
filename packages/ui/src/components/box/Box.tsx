import classNames from 'classnames'
import React from 'react'

import {type LayoutProps} from '../../props/layout'
import {type DisplayBlock} from '../../types/Display'
import {type Responsive} from '../../types/Responsive'
import {getProps} from '../../utils/getProps'
import {boxProps} from './box.props'

/** @public */
export interface BoxProps<T extends React.ElementType> extends LayoutProps {
  /** Element to render */
  as?: T
  /** CSS **display** property */
  display?: Responsive<DisplayBlock>
}

/** @public */
export function Box<T extends React.ElementType = 'div'>({
  display = 'block',
  ...props
}: BoxProps<T> & Omit<React.ComponentPropsWithRef<T>, keyof BoxProps<T>>) {
  const {as, children, className, style, ...rest} = getProps({display, ...props}, boxProps)
  const Component = as || 'div'

  return (
    <Component className={classNames('sui-Box', className)} style={style} data-ui="Box" {...rest}>
      {children}
    </Component>
  )
}
