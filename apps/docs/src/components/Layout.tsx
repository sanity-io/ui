import {Box} from '@sanity/ui'
import {ReactElement, ReactNode} from 'react'

import {Banner} from './Banner'
import {AppFooter} from './Footer'
import {Navbar} from './Navbar'

export function Layout(props: {children?: ReactNode; slug: string[] | undefined}): ReactElement {
  const {children, slug} = props

  return (
    <Box display="flex" flexDirection="column" height="fill">
      <Banner />
      <Navbar slug={slug} />
      {children}
      <AppFooter />
    </Box>
  )
}
