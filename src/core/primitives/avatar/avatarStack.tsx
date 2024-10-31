import {_composeClassNames, avatarStack, type ResponsiveProp} from '@sanity/ui/css'
import type {AvatarSize} from '@sanity/ui/theme'
import {Children, cloneElement, isValidElement, type ReactElement} from 'react'

import {useArrayProp} from '../../hooks'
import type {ComponentType, Props} from '../../types'
import {Box, type BoxOwnProps} from '../box'
import type {AvatarProps} from './avatar'
import {AvatarCounter} from './avatarCounter'

/** @public */
export const DEFAULT_AVATAR_STACK_ELEMENT = 'div'

/** @public */
export type AvatarStackChild = ReactElement<AvatarProps<'div'>> | null | undefined | false

/** @public */
export type AvatarStackOwnProps = Omit<BoxOwnProps, 'align' | 'display'> & {
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
    AvatarProps<'div'>
  >[]
  const maxLength = Math.max(maxLengthProp, 0)
  const size = useArrayProp(sizeProp)

  const len = children.length
  const visibleCount = maxLength - 1
  const extraCount = len - visibleCount
  const visibleChildren = extraCount > 1 ? children.slice(extraCount, len) : children

  return (
    <Box
      data-ui="AvatarStack"
      {...rest}
      align="center"
      as={as}
      className={_composeClassNames(className, avatarStack({size}))}
      display="flex"
    >
      {len === 0 && (
        <Box flex="none">
          <AvatarCounter count={len} size={size} />
        </Box>
      )}

      {len !== 0 && extraCount > 1 && (
        <Box flex="none">
          <AvatarCounter count={extraCount} size={size} />
        </Box>
      )}

      {visibleChildren.map((child, childIndex) => (
        <Box flex="none" key={String(childIndex)}>
          {cloneElement(child, {size})}
        </Box>
      ))}
    </Box>
  )
}

AvatarStack.displayName = 'AvatarStack'
