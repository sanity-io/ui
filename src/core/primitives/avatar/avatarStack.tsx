import {avatarStack, type ResponsiveProp} from '@sanity/ui/css'
import type {AvatarSize} from '@sanity/ui/theme'
import {Children, cloneElement, Fragment, isValidElement, type ReactElement} from 'react'

import {useResponsiveProp} from '../../hooks/useResponsiveProp'
import type {ComponentType, Props} from '../../types/props'
import {Box, type BoxOwnProps} from '../box/box'
import type {AvatarProps} from './avatar'
import {AvatarCounter} from './avatarCounter'

/** @public */
export const DEFAULT_AVATAR_STACK_ELEMENT = 'span'

/** @public */
export type AvatarStackChild = ReactElement<AvatarProps<'div'>> | null | undefined | false

/** @public */
export type AvatarStackOwnProps = Omit<
  BoxOwnProps,
  'align' | 'alignItems' | 'display' | 'justify' | 'justifyContent'
> & {
  children: AvatarStackChild | AvatarStackChild[]
  maxLength?: number
  size?: ResponsiveProp<AvatarSize>
  /** @deprecated No longer supported. */
  tone?: 'navbar'
}

/** @public */
export type AvatarStackElementType = 'div' | 'span' | ComponentType

/** @public */
export type AvatarStackProps<E extends AvatarStackElementType = AvatarStackElementType> = Props<
  AvatarStackOwnProps,
  E
>

/** @public */
export function AvatarStack<E extends AvatarStackElementType = typeof DEFAULT_AVATAR_STACK_ELEMENT>(
  props: AvatarStackProps<E>,
) {
  const {
    as = DEFAULT_AVATAR_STACK_ELEMENT,
    children: childrenProp,
    className,
    maxLength: maxLengthProp = 4,
    size: sizeProp = 1,
    ...rest
  } = props as AvatarStackProps<typeof DEFAULT_AVATAR_STACK_ELEMENT>

  const children = Children.toArray(childrenProp).filter(isValidElement) as ReactElement<
    AvatarProps<'span'>
  >[]
  const maxLength = Math.max(maxLengthProp, 0)
  const size = useResponsiveProp(sizeProp)

  const len = children.length
  const visibleCount = maxLength - 1
  const extraCount = len - visibleCount
  const visibleChildren = extraCount > 1 ? children.slice(extraCount, len) : children

  return (
    <Box
      data-ui="AvatarStack"
      {...rest}
      alignItems="center"
      as={as}
      className={avatarStack({className, size})}
      display="flex"
      justifyContent="flex-start"
    >
      {len === 0 && <AvatarCounter count={len} size={size} />}

      {len !== 0 && extraCount > 1 && <AvatarCounter count={extraCount} size={size} />}

      {visibleChildren.map((child, childIndex) => (
        <Fragment key={String(childIndex)}>{cloneElement(child, {size})}</Fragment>
      ))}
    </Box>
  )
}
