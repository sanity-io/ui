import {AppLayout, CodeBlock} from '~/components'
import {Card, Heading, Stack, Text} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'

function StackPage() {
  return (
    <>
      <Head>
        <title>Stack – Sanity UI</title>
      </Head>

      <AppLayout>
        <Stack space={4}>
          <Heading as="h1" size={3}>
            Stack
          </Heading>

          <Card padding={3} radius={2} tone="transparent">
            <Stack space={4}>
              <Card>
                <Text>foo</Text>
              </Card>
              <Card>
                <Text>bar</Text>
              </Card>
              <Card>
                <Text>baz</Text>
              </Card>
            </Stack>
          </Card>

          <CodeBlock>{`<Stack space={4}>
  <Card>
    <Text>foo</Text>
  </Card>
  <Card>
    <Text>bar</Text>
  </Card>
  <Card>
    <Text>baz</Text>
  </Card>
</Stack>`}</CodeBlock>
        </Stack>
      </AppLayout>
    </>
  )
}

export default StackPage
