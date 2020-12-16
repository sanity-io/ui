import {ArrowRightIcon, RocketIcon} from '@sanity/icons'
import {Card, Flex, Text} from '@sanity/ui'
import Link from 'next/link'
import React from 'react'
import {AppFooter} from './footer'
import {AppNavbar} from './navbar'

export function AppLayout({children}: {children: React.ReactNode}) {
  return (
    <Flex direction="column" height="fill">
      <AppBanner />
      <AppNavbar />
      <Card flex={1} style={{minHeight: 'auto'}}>
        {children}
      </Card>
      <AppFooter />
    </Flex>
  )
}

function AppBanner() {
  return (
    <Card padding={3} tone="primary" style={{minHeight: 'auto'}}>
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
  )
}
