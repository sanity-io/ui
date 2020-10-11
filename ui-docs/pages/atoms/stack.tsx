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
        <Stack space={[4, 4, 5, 6]}>
          <Heading as="h1" size={[2, 2, 3, 4]}>
            Stack
          </Heading>

          <Card padding={[3, 3, 4, 5]} radius={2} tone="transparent">
            <Stack space={[3, 3, 4, 5]}>
              <Card>
                <Text size={[2, 2, 3, 4]}>foo</Text>
              </Card>
              <Card>
                <Text size={[2, 2, 3, 4]}>bar</Text>
              </Card>
              <Card>
                <Text size={[2, 2, 3, 4]}>baz</Text>
              </Card>
            </Stack>
          </Card>

          <CodeBlock>{`<Stack space={[3, 3, 4, 5]}>
  <Card>
    <Text size={[2, 2, 3, 4]}>foo</Text>
  </Card>
  <Card>
    <Text size={[2, 2, 3, 4]}>bar</Text>
  </Card>
  <Card>
    <Text size={[2, 2, 3, 4]}>baz</Text>
  </Card>
</Stack>`}</CodeBlock>
        </Stack>
      </AppLayout>
    </>
  )
}

export default StackPage
