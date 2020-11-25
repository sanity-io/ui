import {Card} from '@sanity/ui'
import React from 'react'
import styled from 'styled-components'

const Root = styled(Card)`
  align-items: center;
  justify-content: center;
  height: 100%;

  &&:not([hidden]) {
    display: flex;
  }
`

export const withCentered = (storyFn: () => JSX.Element) => (
  <Root tone="transparent">{storyFn()}</Root>
)
