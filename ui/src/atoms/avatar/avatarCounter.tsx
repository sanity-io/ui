import React from 'react'
import styled, {css} from 'styled-components'
import {rem} from '../../styles'
import {Theme} from '../../theme'
import {Text} from '../text'
import {avatarTheme} from './theme'
import {AvatarSize} from './types'

const Root = styled.div<{size: number}>(({size, theme}: {size: number; theme: Theme}) => {
  return css`
    align-items: center;
    justify-content: center;
    border-radius: ${rem(avatarTheme.size[size] / 2)};
    box-sizing: border-box;
    user-select: none;
    color: inherit;
    color: var(--card-fg-color);
    background: var(--card-bg-color);
    min-width: ${rem(avatarTheme.size[size])};
    height: ${rem(avatarTheme.size[size])};
    box-shadow: 0 0 0 1px var(--card-bg-color), inset 0 0 0 1.5px var(--card-hairline-hard-color);
    padding: 0 ${rem(theme.sanity.space[2])};

    &:not([hidden]) {
      display: flex;
    }
  `
})

interface AvatarCounterProps {
  count: number
  size?: AvatarSize
  tone?: 'navbar'
}

export function AvatarCounter({count, size = 0, tone}: AvatarCounterProps) {
  return (
    <Root size={size} data-tone={tone}>
      <Text as="span" size={size}>
        <strong>{count}</strong>
      </Text>
    </Root>
  )
}
