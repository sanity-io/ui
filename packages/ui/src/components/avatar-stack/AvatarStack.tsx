import clsx from 'clsx'
import {
  Children,
  cloneElement,
  isValidElement,
  type ComponentPropsWithRef,
  type ElementType,
  type ReactElement,
} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {AvatarCounter} from '../avatar-counter/AvatarCounter'
import type {AvatarProps} from '../avatar/avatar.props'
import {HStack} from '../h-stack/HStack'
import {type AvatarStackProps, avatarStackProps} from './avatarStack.props'

const avatarStackClassName = suffixClassName('sui-AvatarStack')

/** @public */
export function AvatarStack<T extends ElementType = 'div'>({
  size = 1,
  ...props
}: AvatarStackProps<T> & Omit<ComponentPropsWithRef<T>, keyof AvatarStackProps<T>>) {
  const {
    as,
    children,
    className,
    style,
    maxLength: maxLengthProp,
    size: sizeProp,
    ...rest
  } = getProps({size, ...props}, avatarStackProps)
  const Component = as || 'div'
  const childArray = Children.toArray(children).filter(isValidElement) as ReactElement<
    AvatarProps<T>
  >[]
  const length = childArray.length
  const maxLength = maxLengthProp ?? length
  const slicedArray = length > maxLength ? childArray.slice(length - maxLength, length) : childArray

  return (
    <HStack
      as={Component}
      className={clsx(avatarStackClassName, className)}
      style={style}
      data-ui="AvatarStack"
      flexWrap="nowrap"
      {...rest}
    >
      {!length && <AvatarCounter count={0} size={sizeProp} />}
      {length > maxLength && <AvatarCounter count={length - maxLength} size={sizeProp} />}

      {slicedArray.map((child, i) => cloneElement(child, {key: i, size: sizeProp}))}
    </HStack>
  )
}
