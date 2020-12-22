import React, {cloneElement, forwardRef} from 'react'
import styled, {css} from 'styled-components'
import {getResponsiveProp, rem, responsive, ThemeProps} from '../../styles'
import {childrenToElementArray} from '../helpers'
import {AvatarCounter} from './avatarCounter'
import {AvatarSize} from './types'

function avatarStackStyle() {
  return css`
    white-space: nowrap;

    & > div {
      vertical-align: top;

      &:not([hidden]) {
        display: inline-block;
      }
    }
  `
}

function responsiveAvatarStackSizeStyle(props: {size: AvatarSize | AvatarSize[]} & ThemeProps) {
  const {theme} = props
  const {avatar, media} = theme.sanity

  return responsive(media, getResponsiveProp(props.size), (size) => {
    const avatarSize = avatar.sizes[size]

    if (!avatarSize) return {}

    return {
      '& > div + div': {
        marginLeft: rem(avatarSize.distance),
      },
    }
  })
}

const Root = styled.div<{size: AvatarSize | AvatarSize[]}>(
  responsiveAvatarStackSizeStyle,
  avatarStackStyle
)

interface AvatarStackProps {
  children: React.ReactNode
  maxLength?: number
  size?: AvatarSize | AvatarSize[]
  tone?: 'navbar'
}

export const AvatarStack = forwardRef(
  (
    props: AvatarStackProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'ref'>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const {
      children: childrenProp,
      maxLength: maxLengthProp = 4,
      size = 0,
      tone,
      ...restProps
    } = props
    const maxLength = Math.max(maxLengthProp, 0)
    const children = childrenToElementArray(childrenProp).filter(
      (child) => typeof child !== 'string'
    ) as React.ReactElement[]
    const len = children.length
    const visibleCount = maxLength - 1
    const extraCount = len - visibleCount
    const visibleChildren = extraCount > 1 ? children.slice(extraCount, len) : children

    return (
      <Root data-ui="AvatarStack" {...restProps} ref={ref} size={size}>
        {len === 0 && (
          <div>
            <AvatarCounter count={len} tone={tone} />
          </div>
        )}

        {len !== 0 && extraCount > 1 && (
          <div>
            <AvatarCounter count={extraCount} size={size} tone={tone} />
          </div>
        )}

        {visibleChildren.map((child, childIndex) => (
          <div key={String(childIndex)}>{cloneElement(child, {size, tone})}</div>
        ))}
      </Root>
    )
  }
)

AvatarStack.displayName = 'AvatarStack'
