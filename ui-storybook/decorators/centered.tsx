import {Card} from '@sanity/ui'
import React from 'react'
import styled from 'styled-components'

const Root = styled(Card)`
  background: ${({theme}) => theme.color.light.card.tones.transparent.enabled.bg};
  color: ${({theme}) => theme.color.light.card.tones.transparent.enabled.fg};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

export const withCentered = (storyFn: () => JSX.Element) => (
  <Root tone="transparent">{storyFn()}</Root>
)
