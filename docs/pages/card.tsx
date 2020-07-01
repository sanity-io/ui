import {AppLayout, CodeBlock} from '~/components'
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

          <CodeBlock>{`<Card padding={4}>
  <Text>Text</Text>
</Card>`}</CodeBlock>
        </Box>
      </AppLayout>
    </>
  )
}

export default CardPage
