import {Card} from '@sanity/ui'
import React from 'react'
import styled from 'styled-components'
import {features} from '../../config'
import {Loading} from '../loading'
import {AppBanner} from './banner'
import {AppFooter} from './footer'
import {useApp} from './hooks'
import {AppNavbar} from './navbar'

const Root = styled(Card)`
  flex-direction: column;
  height: 100%;

  &:not([hidden]) {
    display: flex;
  }

  & > * {
    min-height: auto;
  }
`

const LoadingOverlay = styled(Loading)`
  position: fixed;
  z-index: 1000000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

export function AppLayout({children}: {children: React.ReactNode}) {
  const {loading} = useApp()

  return (
    <Root>
      <AppBanner />
      <AppNavbar />
      {features.pageLoadingSpinner && <LoadingOverlay loading={loading} />}
      {children}
      <AppFooter />
    </Root>
  )
}
