import clsx from 'clsx'
import type {ComponentPropsWithRef, ElementType} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Flex} from '../flex/Flex'
import {type VStackProps, vStackProps} from './vStack.props'

const vStackClassName = suffixClassName('sui-VStack')

/** @public */
export function VStack<T extends ElementType = 'div'>(
  props: VStackProps<T> & Omit<ComponentPropsWithRef<T>, keyof VStackProps<T>>,
) {
  const {as, children, className, style, ...rest} = getProps(props, vStackProps)
  const Component = as || 'div'

  return (
    <Flex
      as={Component}
      className={clsx(vStackClassName, className)}
      style={style}
      data-ui="VStack"
      flexDirection="column"
      {...rest}
    >
      {children}
    </Flex>
  )
}

export type {VStackProps}
