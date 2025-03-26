import {getTheme_v2} from '@sanity/ui/theme'
import {Children, cloneElement, forwardRef, isValidElement} from 'react'
import {css, styled} from 'styled-components'

import {EMPTY_RECORD} from '../../constants'
import {useArrayProp} from '../../hooks'
import {_responsive, rem, ThemeProps} from '../../styles'
import {AvatarSize} from '../../types'
import {AvatarCounter} from './avatarCounter'

const BASE_STYLES = css`
  white-space: nowrap;

  & > div {
    vertical-align: top;

    &:not([hidden]) {
      display: inline-block;
    }
  }
`

function avatarStackStyle() {
  return BASE_STYLES
}

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

const StyledAvatarStack = styled.div<{$size: AvatarSize[]}>(
  responsiveAvatarStackSizeStyle,
  avatarStackStyle,
)

/**
 * @public
 */
export interface AvatarStackProps {
  children: React.ReactNode
  maxLength?: number
  size?: AvatarSize | AvatarSize[]
  /** @deprecated No longer supported. */
  tone?: 'navbar'
}

/**
 * @public
 */
export const AvatarStack = forwardRef(function AvatarStack(
  props: AvatarStackProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'ref'>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    children: childrenProp,
    maxLength: maxLengthProp = 4,
    size: sizeProp = 1,
    ...restProps
  } = props
  const children: React.JSX.Element[] = Children.toArray(childrenProp).filter(isValidElement)
  const maxLength = Math.max(maxLengthProp, 0)
  const size = useArrayProp(sizeProp)

  const len = children.length
  const visibleCount = maxLength - 1
  const extraCount = len - visibleCount
  const visibleChildren = extraCount > 1 ? children.slice(extraCount, len) : children

  return (
    <StyledAvatarStack data-ui="AvatarStack" {...restProps} ref={ref} $size={size}>
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
        <div key={String(childIndex)}>{cloneElement(child, {size})}</div>
      ))}
    </StyledAvatarStack>
  )
})
AvatarStack.displayName = 'ForwardRef(AvatarStack)'
