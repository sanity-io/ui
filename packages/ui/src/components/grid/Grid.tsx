import classNames from 'classnames'
import React from 'react'

import {type GapProps} from '../../props/gap'
import {type GridParentProps} from '../../props/gridParent'
import {type LayoutProps} from '../../props/layout'
import {type DisplayGrid} from '../../types/Display'
import {type Responsive} from '../../types/Responsive'
import {getProps} from '../../utils/getProps'
import {gridProps} from './grid.props'

/** @public */
export interface FlexProps<T extends React.ElementType>
  extends GridParentProps, GapProps, LayoutProps {
  /** Element to render */
  as?: T
  /** CSS **display** property */
  display?: Responsive<DisplayGrid>
}

/** @public */
export function Grid<T extends React.ElementType = 'div'>(
  {display = 'grid', ...props}: FlexProps<T> & Omit<React.ComponentPropsWithRef<T>, keyof FlexProps<T>>,
) {
  const {as, children, className, style, ...rest} = getProps({display, ...props}, gridProps)
  const Component = as || 'div'

  return (
    <Component className={classNames('sui-Grid', className)} style={style} data-ui="Grid" {...rest}>
      {children}
    </Component>
  )
}
