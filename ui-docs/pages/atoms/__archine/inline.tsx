import {Card, Inline, Heading, Stack, Text} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'
import {AppLayout, CodeBlock} from '~/components'

function InlinePage() {
  return (
    <>
      <Head>
        <title>Inline – Sanity UI</title>
      </Head>

      <AppLayout>
        <Stack space={[4, 4, 5, 6]}>
          <Heading as="h1" size={[2, 2, 3, 4]}>
            Inline
          </Heading>

          <Card padding={[3, 3, 4, 5]} radius={2} tone="transparent">
            <Inline space={[3, 3, 4, 5]} style={{textAlign: 'center'}}>
              <Card padding={1}>
                <Text size={[2, 2, 3, 4]}>foo</Text>
              </Card>
              <Card padding={2}>
                <Text size={[2, 2, 3, 4]}>bar</Text>
              </Card>
              <Card padding={3}>
                <Text size={[2, 2, 3, 4]}>baz</Text>
              </Card>
              <Card padding={4}>
                <Text size={[2, 2, 3, 4]}>baz</Text>
              </Card>
              <Card padding={5}>
                <Text size={[2, 2, 3, 4]}>baz</Text>
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
