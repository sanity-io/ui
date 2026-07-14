'use client'

import {ReactElement, ReactNode} from 'react'
import {styled} from 'styled-components'

import {Banner} from './Banner'
import {AppFooter} from './Footer'
import {Navbar} from './Navbar'

const Root = styled.div({
  'height': '100%',
  'flexDirection': 'column',

  '&:not([hidden])': {
    display: 'flex',
  },
})

export function Layout(props: {children?: ReactNode}): ReactElement {
  const {children} = props

  return (
    <Root>
      <Banner />
      <Navbar />
      {children}
      <AppFooter />
    </Root>
  )
}
