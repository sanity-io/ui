import classNames from 'classnames'
import type {ComponentPropsWithRef, ElementType} from 'react'

import {getProps} from '../../utils/getProps'
import {getVersionedClassname} from '../../utils/getVersionedClassname'
import {HStack} from '../h-stack/HStack'
import {type IndicatorStackProps, indicatorStackProps} from './indicatorStack.props'

const indicatorStackClassname = getVersionedClassname('sui-IndicatorStack')

/** @public */
export function IndicatorStack<T extends ElementType = 'div'>(
  props: IndicatorStackProps<T> & Omit<ComponentPropsWithRef<T>, keyof IndicatorStackProps<T>>,
) {
  const {as, children, className, style, ...rest} = getProps(props, indicatorStackProps)
  const Component = as || 'div'

  return (
    <HStack
      as={Component}
      className={classNames(indicatorStackClassname, className)}
      style={style}
      data-ui="IndicatorStack"
      {...rest}
    >
      {children}
    </HStack>
  )
}
