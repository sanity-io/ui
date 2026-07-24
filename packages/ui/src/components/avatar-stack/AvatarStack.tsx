import clsx from 'clsx'
import type {ComponentPropsWithRef, ElementType} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {HStack} from '../h-stack/HStack'
import {type AvatarStackProps, avatarStackProps} from './avatarStack.props'

const avatarStackClassName = suffixClassName('sui-AvatarStack')

/** @public */
export function AvatarStack<T extends ElementType = 'div'>(
  props: AvatarStackProps<T> & Omit<ComponentPropsWithRef<T>, keyof AvatarStackProps<T>>,
) {
  const {as, children, className, style, ...rest} = getProps(props, avatarStackProps)
  const Component = as || 'div'

  return (
    <HStack
      as={Component}
      className={clsx(avatarStackClassName, className)}
      style={style}
      data-ui="AvatarStack"
      flexWrap="nowrap"
      {...rest}
    >
      {children}
    </HStack>
  )
}
