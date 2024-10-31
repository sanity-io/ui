import {avatarStack, composeClassNames, ResponsiveProp} from '@sanity/ui/css'
import {AvatarSize} from '@sanity/ui/theme'
import {Children, cloneElement, ForwardedRef, forwardRef, isValidElement, ReactElement} from 'react'

import {useArrayProp} from '../../hooks'
import {Props} from '../../types'
import {Box, BoxProps} from '../box'
import {AvatarProps} from './avatar'
import {AvatarCounter} from './avatarCounter'

/**
 * @public
 */
export type AvatarStackChild = ReactElement<Props<AvatarProps, 'div'>> | null | undefined | false

/**
 * @public
 */
export interface AvatarStackProps extends Omit<BoxProps, 'align' | 'className' | 'display'> {
  children: AvatarStackChild | AvatarStackChild[]
  maxLength?: number
  size?: ResponsiveProp<AvatarSize>
  /** @deprecated No longer supported. */
  tone?: 'navbar'
}

/**
 * @public
 */
export const AvatarStack = forwardRef(function AvatarStack(
  props: Props<AvatarStackProps, 'div'>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {
    children: childrenProp,
    className,
    maxLength: maxLengthProp = 4,
    size: sizeProp = 1,
    ...restProps
  } = props
  const children = Children.toArray(childrenProp).filter(isValidElement) as ReactElement<
    Props<AvatarProps, 'div'>
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
      {...restProps}
      align="center"
      className={composeClassNames(className, avatarStack({size}))}
      display="flex"
      ref={ref}
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
})

AvatarStack.displayName = 'ForwardRef(AvatarStack)'
