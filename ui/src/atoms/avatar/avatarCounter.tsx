import React from 'react'
import styled, {css} from 'styled-components'
import {getResponsiveProp, rem, responsive, ThemeProps} from '../../styles'
import {Text} from '../text'
import {avatarTheme} from './theme'
import {AvatarSize} from './types'

function responsiveAvatarCounterSizeStyle(props: {$size: AvatarSize | AvatarSize[]} & ThemeProps) {
  const {theme} = props

  return responsive(theme.sanity.media, getResponsiveProp(props.$size), (size) => ({
    borderRadius: rem(avatarTheme.size[size] / 2),
    minWidth: rem(avatarTheme.size[size]),
    height: rem(avatarTheme.size[size]),
  }))
}

function avatarCounterBaseStyle(props: ThemeProps) {
  const {theme} = props

  return css`
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    user-select: none;
    color: inherit;
    color: var(--card-fg-color);
    background: var(--card-bg-color);
    box-shadow: 0 0 0 1px var(--card-bg-color), inset 0 0 0 1.5px var(--card-hairline-hard-color);
    padding: 0 ${rem(theme.sanity.space[2])};

    &:not([hidden]) {
      display: flex;
    }
  `
}

const Root = styled.div<{$size: AvatarSize | AvatarSize[]}>(
  responsiveAvatarCounterSizeStyle,
  avatarCounterBaseStyle
)

interface AvatarCounterProps {
  count: number
  size?: AvatarSize | AvatarSize[]
  tone?: 'navbar'
}

export function AvatarCounter({count, size = 0, tone}: AvatarCounterProps) {
  return (
    <Root $size={size} data-tone={tone}>
      <Text as="span" size={size}>
        <strong>{count}</strong>
      </Text>
    </Root>
  )
}
