import classNames from 'classnames'
import type {ComponentPropsWithRef, ElementType} from 'react'

import {getProps} from '../../utils/getProps'
import {HStack} from '../h-stack/HStack'
import {type IndicatorGroupProps, indicatorGroupProps} from './indicatorGroup.props'

/** @public */
export function IndicatorGroup<T extends ElementType = 'div'>(
  props: IndicatorGroupProps<T> & Omit<ComponentPropsWithRef<T>, keyof IndicatorGroupProps<T>>,
) {
  const {as, children, className, style, ...rest} = getProps(props, indicatorGroupProps)
  const Component = as || 'div'

  return (
    <HStack
      as={Component}
      className={classNames('sui-IndicatorGroup', className)}
      style={style}
      data-ui="IndicatorGroup"
      {...rest}
    >
      {children}
    </HStack>
  )
}
