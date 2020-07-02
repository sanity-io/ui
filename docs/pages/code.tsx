import {AppLayout, CodeBlock} from '~/components'
import {Card, Code, Heading, Stack} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'

function CodePage() {
  return (
    <>
      <Head>
        <title>Code – Sanity UI</title>
      </Head>

      <AppLayout>
        <Stack space={[4, 5, 6]}>
          <Heading as="h1" size={3}>
            Code
          </Heading>

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
      </AppLayout>
    </>
  )
}

export default CodePage
