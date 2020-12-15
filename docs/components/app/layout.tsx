import {Card} from '@sanity/ui'
import React from 'react'
import styled from 'styled-components'
import {AppFooter} from './footer'
import {AppNavbar} from './navbar'

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
      <AppNavbar />
      <ContentContainer>{children}</ContentContainer>
      <AppFooter />
    </Root>
  )
}
