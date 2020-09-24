import {AppLayout, CodeBlock} from '~/components'
import {Card, Inline, Heading, Stack, Text} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'

function InlinePage() {
  return (
    <>
      <Head>
        <title>Inline – Sanity UI</title>
      </Head>

      <AppLayout>
        <Stack space={[4, 5, 6]}>
          <Heading as="h1" size={3}>
            Inline
          </Heading>

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
