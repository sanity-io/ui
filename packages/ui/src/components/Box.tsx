import React from 'react'
import classNames from 'classnames';

import { layoutProps, type LayoutProps } from '../props/layout';
import { getProps } from '../utils/getProps';

export const DISPLAY = ['block', 'inline-block', 'none'] as const
export type Display = (typeof DISPLAY)[number]

export type BoxProps<T extends React.ElementType> = LayoutProps & {
  as?: T
  display?: Display
}

export function Box<T extends React.ElementType = 'div'>(
  props: BoxProps<T>
  & Omit<React.ComponentPropsWithRef<T>, keyof BoxProps<T>>
) {
  const { as, children, className, display = 'block', style, ...rest } = getProps(props, {
    ...layoutProps,
    display: {
      type: 'enum',
      className: 'display',
      values: DISPLAY,
    }
  })
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
