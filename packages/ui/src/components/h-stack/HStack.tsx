import clsx from 'clsx'
import type {ComponentPropsWithRef, ElementType} from 'react'

import {type ComponentProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Flex} from '../flex/Flex'
import {type HStackProps} from './hStack.props'

const hStackClassName = suffixClassName('sui-HStack')

/** @public */
export function HStack<T extends ElementType = 'div'>({
  className,
  ...props
}: HStackProps<T> & Omit<ComponentPropsWithRef<T>, keyof HStackProps<T>>) {
  return (
    <Flex
      className={clsx(hStackClassName, className)}
      data-ui="HStack"
      display="inline-flex"
      alignItems="center"
      flexWrap="wrap"
      {...(props as ComponentProps)}
    />
  )
}

export type {HStackProps}
