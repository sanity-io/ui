import clsx from 'clsx'
import type {ComponentPropsWithRef, ElementType} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Eyebrow} from '../eyebrow/Eyebrow'
import {Flex} from '../flex/Flex'
import {type AvatarCounterProps, avatarCounterProps} from './avatarCounter.props'

const avatarCounterClassName = suffixClassName('sui-AvatarCounter')

/** @public */
export function AvatarCounter<T extends ElementType = 'div'>({
  size = 1,
  ...props
}: AvatarCounterProps<T> & Omit<ComponentPropsWithRef<T>, keyof AvatarCounterProps<T>>) {
  const {
    as,
    className,
    style,
    'aria-label': ariaLabel,
    count,
    ...rest
  } = getProps({size, ...props}, avatarCounterProps)
  const Component = as || 'div'

  return (
    <Flex
      as={Component}
      className={clsx(avatarCounterClassName, className)}
      style={style}
      data-ui="Avatar"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      radius="full"
      border
      {...rest}
    >
      <Eyebrow role="img" aria-label={ariaLabel ?? `+ ${count} more`}>
        {count}
      </Eyebrow>
    </Flex>
  )
}

export type {AvatarCounterProps}
