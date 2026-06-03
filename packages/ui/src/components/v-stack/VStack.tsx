import classNames from 'classnames'
import type {ComponentPropsWithRef, ElementType} from 'react'

import {getProps} from '../../utils/getProps'
import {Flex} from '../flex/Flex'
import {type VStackProps, vStackProps} from './vStack.props'

/** @public */
export function VStack<T extends ElementType = 'div'>(
  props: VStackProps<T> & Omit<ComponentPropsWithRef<T>, keyof VStackProps<T>>,
) {
  const {as, children, className, style, ...rest} = getProps(props, vStackProps)
  const Component = as || 'div'

  return (
    <Flex
      as={Component}
      className={classNames('sui-VStack', className)}
      style={style}
      data-ui="VStack"
      flexDirection="column"
      {...rest}
    >
      {children}
    </Flex>
  )
}
