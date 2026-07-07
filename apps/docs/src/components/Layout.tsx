import {ReactElement, ReactNode} from 'react'
import {styled} from 'styled-components'

import {Banner} from './Banner'
import {AppFooter} from './Footer'
import {Navbar} from './Navbar'

const Root = styled.div({
  height: '100%',
  flexDirection: 'column',

  '&:not([hidden])': {
    display: 'flex',
  },
})

export function Layout(props: {children?: ReactNode; path: string[]}): ReactElement {
  const {children, path} = props

  return (
    <Root>
      <Banner />
      <Navbar path={path} />
      {children}
      <AppFooter />
    </Root>
  )
}
