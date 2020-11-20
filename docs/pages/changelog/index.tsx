import {Card, Heading} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'
import {AppLayout} from '$components'

function ChangelogPage() {
  return (
    <>
      <Head>
        <title>Changelog – Sanity Design</title>
      </Head>

      <AppLayout>
        <Card flex={1} paddingX={[3, 4, 5]} paddingY={[6, 7, 8, 9]}>
          <Heading size={[2, 3, 4, 5]} style={{textAlign: 'center'}}>
            Changelog
          </Heading>
        </Card>
      </AppLayout>
    </>
  )
}

export default ChangelogPage
