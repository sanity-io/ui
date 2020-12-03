import {Card, useRootTheme} from '@sanity/ui'
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

export const withCentered = (storyFn: () => React.ReactElement) => <Centered>{storyFn()}</Centered>

function Centered({children}: {children: React.ReactNode}) {
  const {tone} = useRootTheme()

  return <Root tone={tone}>{children}</Root>
}
