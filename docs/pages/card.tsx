import {AppLayout} from '~/components'
import {Box, Card, Text} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'

function CardPage() {
  return (
    <>
      <Head>
        <title>Card – Sanity UI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <Box as="main" padding={4}>
          <h1>Card</h1>

          <Card padding={2} tone="transparent">
            <Card padding={4}>
              <Text>Text</Text>
            </Card>
          </Card>

          <Card as="pre" padding={2} tone="contrast">
            <code>{`<Card padding={4}>
  <Text>Text</Text>
</Card>`}</code>
          </Card>
        </Box>
      </AppLayout>
    </>
  )
}

export default CardPage
