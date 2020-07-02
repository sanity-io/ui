import {AppLayout, CodeBlock} from '~/components'
import {Button, Card, Heading, Inline, Stack} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'

function ButtonPage() {
  return (
    <>
      <Head>
        <title>Button – Sanity UI</title>
      </Head>

      <AppLayout>
        <Stack space={[4, 5, 6]}>
          <Heading as="h1" size={3}>
            Button
          </Heading>

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
      </AppLayout>
    </>
  )
}

export default ButtonPage
