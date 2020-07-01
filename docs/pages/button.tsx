import {AppLayout, CodeBlock} from '~/components'
import {Box, Button, Card, Inline} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'

function ButtonPage() {
  return (
    <>
      <Head>
        <title>Button – Sanity UI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <Box as="main" padding={4}>
          <h1>Button</h1>

          <Card padding={2} tone="transparent">
            <Inline space={2}>
              <Button padding={4}>Button</Button>
              <Button padding={4} tone="brand">
                Button
              </Button>
            </Inline>
          </Card>

          <CodeBlock>{`<Inline space={2}>
  <Button padding={4}>Button</Button>
  <Button padding={4} tone="brand">
    Button
  </Button>
</Inline>`}</CodeBlock>
        </Box>
      </AppLayout>
    </>
  )
}

export default ButtonPage
