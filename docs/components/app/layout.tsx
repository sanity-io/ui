import {ArrowRightIcon, RocketIcon} from '@sanity/icons'
import {Card, Text} from '@sanity/ui'
import Link from 'next/link'
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
      <Card padding={3} scheme="dark" tone="primary">
        <Text align="center" size={1}>
          <strong>
            <RocketIcon />
            &nbsp;&nbsp; Early access
          </strong>
          .{' '}
          <Link href="https://sanity.io/blog">
            <a>
              Read the blog post <ArrowRightIcon />
            </a>
          </Link>
        </Text>
      </Card>
      <AppNavbar />
      <ContentContainer>{children}</ContentContainer>
      <AppFooter />
    </Root>
  )
}
