import {AppLayout, CodeBlock} from '~/components'
import {Button, Card, Inline, Stack} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'

function ButtonPage() {
  return (
    <>
      <Head>
        <title>Button – Sanity UI</title>
      </Head>

      <AppLayout>
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
      </AppLayout>
    </>
  )
}

export default ButtonPage
