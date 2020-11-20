import {Heading, Stack} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'
import {AppLayout} from '$components'
import {DesignPageLayout} from '$components/_designPage/layout'

function DesignPage() {
  return (
    <>
      <Head>
        <title>Design – Sanity Design</title>
      </Head>

      <AppLayout>
        <DesignPageLayout>
          <Stack space={[4, 4, 5, 6]}>
            <Heading as="h1" size={[2, 2, 3, 4]}>
              Design
            </Heading>
          </Stack>
        </DesignPageLayout>
      </AppLayout>
    </>
  )
}

export default DesignPage
