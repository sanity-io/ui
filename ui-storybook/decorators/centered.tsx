import {Card} from '@sanity/ui'
import React from 'react'
import styled from 'styled-components'

const Root = styled(Card)`
  /* display: flex; */
  align-items: center;
  justify-content: center;
  height: 100%;
`

export const withCentered = (storyFn: () => JSX.Element) => (
  <Root display="flex" tone="transparent">
    {storyFn()}
  </Root>
)
