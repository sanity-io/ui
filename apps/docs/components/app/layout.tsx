import {Flex} from '@sanity/ui'
import React from 'react'
import styled from 'styled-components'
import {AppBanner} from './banner'
import {AppFooter} from './footer'
import {AppNavbar} from './navbar'

const Root = styled(Flex)`
  & > * {
    min-height: auto;
  }
`

export function AppLayout({children}: {children: React.ReactNode}) {
  return (
    <Root direction="column" height="fill">
      <AppBanner />
      <AppNavbar />
      {children}
      <AppFooter />
    </Root>
  )
}
