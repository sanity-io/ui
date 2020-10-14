import React from 'react'
import styled, {css} from 'styled-components'
import {rem} from '../../styles'
import {Text} from '../text'
import {AvatarSize} from './types'

const Root = styled.div(({theme}) => {
  return css`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: calc(23px / 2);
    box-sizing: border-box;
    user-select: none;
    color: inherit;
    color: var(--card-fg-color);
    background: var(--card-bg-color);
    min-width: 23px;
    height: 23px;
    box-shadow: 0 0 0 1px var(--card-bg-color), inset 0 0 0 1.5px var(--card-hairline-hard-color);
    padding: 0 ${rem(theme.space[2])};
  `
})

interface AvatarCounterProps {
  count: number
  size?: AvatarSize
  tone?: 'navbar'
}

export function AvatarCounter({count, size = 0, tone}: AvatarCounterProps) {
  return (
    <Root data-size={size} data-tone={tone}>
      <Text size={0} as="span">
        <strong>{count}</strong>
      </Text>
    </Root>
  )
}
