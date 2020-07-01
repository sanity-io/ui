import {AppLayout, CodeBlock} from '~/components'
import {Box, Button, Card, Inline, Stack} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'

function ButtonPage() {
  return (
    <>
      <Head>
        <title>Button – Sanity UI</title>
      </Head>

      <AppLayout>
        <Box as="main" padding={4}>
          <h1>Button</h1>

          <Stack space={4}>
            <Card padding={3} radius={2} tone="transparent">
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
          </Stack>
        </Box>
      </AppLayout>
    </>
  )
}

export default ButtonPage
