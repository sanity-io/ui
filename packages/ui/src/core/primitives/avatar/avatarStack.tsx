import {clsx} from 'clsx/lite'
import {Children, cloneElement, isValidElement} from 'react'
import {styled} from 'styled-components'

import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {EMPTY_RECORD} from '../../constants'
import {_getArrayProp, _responsive, rem} from '../../styles/helpers'
import {ThemeProps} from '../../styles/types'
import {AvatarSize} from '../../types/avatar'
import {AvatarCounter} from './avatarCounter'

import {avatarStack} from './avatar.css'

function responsiveAvatarStackSizeStyle(props: {$size: AvatarSize[]} & ThemeProps) {
  const {avatar, media} = getTheme_v2(props.theme)

  return _responsive(media, props.$size, (size) => {
    const avatarSize = avatar.sizes[size]

    if (!avatarSize) return EMPTY_RECORD

    return {
      '& > div + div': {
        marginLeft: rem(avatarSize.distance),
      },
    }
  })
}

const StyledAvatarStack = styled.div<{$size: AvatarSize[]}>(responsiveAvatarStackSizeStyle)

/**
 * @public
 */
export interface AvatarStackProps {
  children: React.ReactNode
  maxLength?: number
  size?: AvatarSize | AvatarSize[]
  /** @deprecated No longer supported. */
  tone?: never
}

/**
 * @public
 */
export function AvatarStack(props: AvatarStackProps & Omit<React.HTMLProps<HTMLDivElement>, 'as'>) {
  const {
    children: childrenProp,
    className,
    maxLength: maxLengthProp = 4,
    ref,
    size: sizeProp = 1,
    ...restProps
  } = props
  const children: React.JSX.Element[] = Children.toArray(childrenProp).filter(isValidElement)
  const maxLength = Math.max(maxLengthProp, 0)
  const size = _getArrayProp(sizeProp)

  const len = children.length
  const visibleCount = maxLength - 1
  const extraCount = len - visibleCount
  const visibleChildren = extraCount > 1 ? children.slice(extraCount, len) : children

  return (
    <StyledAvatarStack
      className={clsx(avatarStack, className)}
      data-ui="AvatarStack"
      {...restProps}
      ref={ref}
      $size={size}
    >
      {len === 0 && (
        <div>
          <AvatarCounter count={len} size={size} />
        </div>
      )}

      {len !== 0 && extraCount > 1 && (
        <div>
          <AvatarCounter count={extraCount} size={size} />
        </div>
      )}

      {visibleChildren.map((child, childIndex) => (
        // oxlint-disable-next-line no-array-index-key
        <div key={String(childIndex)}>{cloneElement(child, {size})}</div>
      ))}
    </StyledAvatarStack>
  )
}
