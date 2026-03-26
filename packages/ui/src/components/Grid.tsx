import React from 'react'
import classNames from 'classnames';

import { type DisplayFlex } from '../types/Display';
import { flexProps } from './flex.props';
import { getProps } from '../utils/getProps';
import { type LayoutProps } from '../props/layout';
import type { GapProps } from '../props/gap';
import type { FlexParentProps } from '../props/flexParent';
import { type Responsive } from '../types/Responsive';

export type FlexProps<T extends React.ElementType> = LayoutProps & FlexParentProps & GapProps & {
  as?: T
  display?: Responsive<DisplayFlex>
}

export function Flex<T extends React.ElementType = 'div'>(
  props: FlexProps<T>
  & Omit<React.ComponentPropsWithRef<T>, keyof FlexProps<T>>
) {
  const { as, children, className, display = 'block', style, ...rest } = getProps(props, flexProps)
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
