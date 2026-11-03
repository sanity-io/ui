import clsx from 'clsx'
import type {ComponentPropsWithRef, ElementType} from 'react'

import type {ComponentProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Flex} from '../flex/Flex'
import {type VStackProps} from './vStack.props'

const vStackClassName = suffixClassName('sui-VStack')

/** @public */
export function VStack<T extends ElementType = 'div'>({
  className,
  ...props
}: VStackProps<T> & Omit<ComponentPropsWithRef<T>, keyof VStackProps<T>>) {
  return (
    <Flex
      className={clsx(vStackClassName, className)}
      data-ui="VStack"
      flexDirection="column"
      {...(props as ComponentProps)}
    />
  )
}

export type {VStackProps}
