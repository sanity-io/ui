import {Box} from '@sanity/ui'
import {ReactElement, ReactNode} from 'react'

import {Banner} from './Banner'
import {AppFooter} from './Footer'
import {Navbar} from './Navbar'

export function Layout(props: {children?: ReactNode; path: string[]}): ReactElement {
  const {children, path} = props

  return (
    <Box display="flex" flexDirection="column" height="fill">
      <Banner />
      <Navbar path={path} />
      {children}
      <AppFooter />
    </Box>
  )
}
