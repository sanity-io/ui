import React from 'react'
import classNames from 'classnames';

import { type DisplayFlex } from '../types/Display';
import { flexProps } from './flex.props';
import { getProps } from '../utils/getProps';
import { type LayoutProps } from '../props/layout';
import type { GapProps } from '../props/gap';
import type { FlexParentProps } from '../props/flexParent';
import { type Responsive } from '../types/Responsive';

export interface FlexProps<T extends React.ElementType> extends FlexParentProps, GapProps, LayoutProps {
  /** Element to render */
  as?: T
  /** CSS **display** property */
  display?: Responsive<DisplayFlex>
}


export function Flex<T extends React.ElementType = 'div'>(
  {display = 'flex', ...props}: FlexProps<T>
  & Omit<React.ComponentPropsWithRef<T>, keyof FlexProps<T>>
) {
  const { as, children, className, style, ...rest } = getProps({display, ...props}, flexProps)
  const Component = as || 'div'

  return (
    <Component
      className={classNames('sui-Flex', className)}
      style={style}
      data-ui="Flex"
      {...rest}
    >
      {children}
    </Component>
  );
}
