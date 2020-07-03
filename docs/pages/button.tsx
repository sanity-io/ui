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

          <Stack space={2}>
            <Inline space={2}>
              <Button>Button</Button>
              <Button tone="brand">Button</Button>
              <Button tone="positive">Button</Button>
              <Button tone="caution">Button</Button>
              <Button tone="critical">Button</Button>
            </Inline>

            <Inline space={2}>
              <Button mode="ghost">Button</Button>
              <Button mode="ghost" tone="brand">
                Button
              </Button>
              <Button mode="ghost" tone="positive">
                Button
              </Button>
              <Button mode="ghost" tone="caution">
                Button
              </Button>
              <Button mode="ghost" tone="critical">
                Button
              </Button>
            </Inline>

            <Inline space={2}>
              <Button mode="bleed">Button</Button>
              <Button mode="bleed" tone="brand">
                Button
              </Button>
              <Button mode="bleed" tone="positive">
                Button
              </Button>
              <Button mode="bleed" tone="caution">
                Button
              </Button>
              <Button mode="bleed" tone="critical">
                Button
              </Button>
            </Inline>
          </Stack>
        </Stack>
      </AppLayout>
    </>
  )
}

export default ButtonPage
