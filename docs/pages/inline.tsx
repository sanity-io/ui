import {AppLayout} from '~/components'
import {Box, Card, Inline, Text} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'

function InlinePage() {
  return (
    <>
      <Head>
        <title>Inline – Sanity UI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <Box as="main" padding={4}>
          <h1>Inline</h1>

          <Card padding={2} tone="transparent">
            <Inline space={4} style={{textAlign: 'center'}}>
              <Card padding={1}>
                <Text>foo</Text>
              </Card>
              <Card padding={2}>
                <Text>bar</Text>
              </Card>
              <Card padding={3}>
                <Text>baz</Text>
              </Card>
            </Inline>
          </Card>

          <Card as="pre" padding={2} tone="contrast">
            <code>{`<Inline space={4} style={{textAlign: 'center'}}>
  <Card padding={1}>
    <Text>foo</Text>
  </Card>
  <Card padding={2}>
    <Text>bar</Text>
  </Card>
  <Card padding={3}>
    <Text>baz</Text>
  </Card>
</Inline>`}</code>
          </Card>
        </Box>
      </AppLayout>
    </>
  )
}

export default InlinePage
