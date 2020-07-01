import {AppLayout} from '~/components'
import {Box, Card, Container, Text} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'

function ContainerPage() {
  return (
    <>
      <Head>
        <title>Container – Sanity UI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <Box as="main" padding={4}>
          <h1>Container</h1>

          <Card padding={2} tone="transparent">
            <Container width={0}>
              <Card padding={4}>
                <Text>Contained text</Text>
              </Card>
            </Container>
          </Card>

          <Card as="pre" padding={2} tone="contrast">
            <code>{`<Container width={0}>
  <Card padding={4}>
    <Text>Contained text</Text>
  </Card>
</Container>`}</code>
          </Card>
        </Box>
      </AppLayout>
    </>
  )
}

export default ContainerPage
