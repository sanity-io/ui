import {AppLayout} from '~/components'
import {Text} from '@sanity/ui'
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
        <h1>Sanity UI</h1>

        <Text>
          Sanity UI is a kit for building web applications, that is used by the design and tech
          teams at Sanity to build and maintain the Studio and Manage applications.
        </Text>
      </AppLayout>
    </>
  )
}

export default IndexPage
