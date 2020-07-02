import {AppLayout} from '~/components'
import {Heading, Text, Stack} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'

function IndexPage() {
  return (
    <>
      <Head>
        <title>Sanity UI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <Stack space={[4, 5, 6]}>
          <Heading as="h1" size={3}>
            Sanity UI
          </Heading>

          <Text>
            Sanity UI is a kit for building web applications, that is used by the design and tech
            teams at Sanity to build and maintain the Studio and Manage applications.
          </Text>
        </Stack>
      </AppLayout>
    </>
  )
}

export default IndexPage
