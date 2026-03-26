import React from 'react'
import classNames from 'classnames';

import { boxProps } from './box.props';
import { type DisplayBlock } from '../types/Display';
import { type Responsive } from '../types/Responsive';

import { getProps } from '../utils/getProps';
import { type LayoutProps } from '../props/layout';

export interface BoxProps<T extends React.ElementType> extends LayoutProps {
  as?: T
  display?: Responsive<DisplayBlock>
}

export function Box<T extends React.ElementType = 'div'>(
  {display = 'block', ...props}: BoxProps<T>
  & Omit<React.ComponentPropsWithRef<T>, keyof BoxProps<T>>
) {
  const {as, children, className, style, ...rest} = getProps({display, ...props}, boxProps)
  const Component = as || 'div'

  return (
    <Component
      className={classNames('sui-Box', className)}
      style={style}
      data-ui="Box"
      {...rest}
    >
      {children}
    </Component>
  );
}
