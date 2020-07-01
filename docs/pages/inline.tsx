import {AppLayout, CodeBlock} from '~/components'
import {Card, Inline, Stack, Text} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'

function InlinePage() {
  return (
    <>
      <Head>
        <title>Inline – Sanity UI</title>
      </Head>

      <AppLayout>
        <h1>Inline</h1>

        <Stack space={4}>
          <Card padding={3} radius={2} tone="transparent">
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

          <CodeBlock>{`<Inline space={4} style={{textAlign: 'center'}}>
  <Card padding={1}>
    <Text>foo</Text>
  </Card>
  <Card padding={2}>
    <Text>bar</Text>
  </Card>
  <Card padding={3}>
    <Text>baz</Text>
  </Card>
</Inline>`}</CodeBlock>
        </Stack>
      </AppLayout>
    </>
  )
}

export default InlinePage
