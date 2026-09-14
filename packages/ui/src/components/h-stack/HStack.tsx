import clsx from 'clsx'
import type {ComponentPropsWithRef, ElementType} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Flex} from '../flex/Flex'
import {type HStackProps, hStackProps} from './hStack.props'

const hStackClassName = suffixClassName('sui-HStack')

/** @public */
export function HStack<T extends ElementType = 'div'>(
  props: HStackProps<T> & Omit<ComponentPropsWithRef<T>, keyof HStackProps<T>>,
) {
  const {as, children, className, style, ...rest} = getProps(props, hStackProps)
  const Component = as || 'div'

  return (
    <Flex
      as={Component}
      className={clsx(hStackClassName, className)}
      style={style}
      data-ui="HStack"
      display="inline-flex"
      alignItems="center"
      flexWrap="wrap"
      {...rest}
    >
      {children}
    </Flex>
  )
}

export type {HStackProps}
