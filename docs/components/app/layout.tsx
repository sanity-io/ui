import {Card} from '@sanity/ui'
import React from 'react'
import styled from 'styled-components'
import {Navbar} from './navbar'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const ContentContainer = styled(Card)`
  flex: 1;
`

export function AppLayout({children}: {children: React.ReactNode}) {
  return (
    <Root>
      <Navbar />
      <ContentContainer>{children}</ContentContainer>
    </Root>
  )
}
