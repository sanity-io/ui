import {AppLayout, CodeBlock} from '~/components'
import {Box, Card, Code, Stack} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'

function CodePage() {
  return (
    <>
      <Head>
        <title>Code – Sanity UI</title>
      </Head>

      <AppLayout>
        <Box as="main" padding={4}>
          <h1>Code</h1>

          <Stack space={4}>
            <Card padding={3} radius={2} tone="transparent">
              <Stack space={4}>
                <Card>
                  <Code size={0}>Code 0</Code>
                </Card>
                <Card>
                  <Code size={1}>Code 1</Code>
                </Card>
                <Card>
                  <Code size={2}>Code 2</Code>
                </Card>
                <Card>
                  <Code size={3}>Code 3</Code>
                </Card>
                <Card>
                  <Code size={4}>Code 4</Code>
                </Card>
              </Stack>
            </Card>

            <CodeBlock>{`<Stack space={4}>
  <Card>
    <Code size={0}>Code 0</Code>
  </Card>
  <Card>
    <Code size={1}>Code 1</Code>
  </Card>
  <Card>
    <Code size={2}>Code 2</Code>
  </Card>
  <Card>
    <Code size={3}>Code 3</Code>
  </Card>
  <Card>
    <Code size={4}>Code 4</Code>
  </Card>
</Stack>`}</CodeBlock>
          </Stack>
        </Box>
      </AppLayout>
    </>
  )
}

export default CodePage
