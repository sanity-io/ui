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
              <Button icon="publish" padding={4}>
                Label
              </Button>
              <Button icon="publish" padding={4} tone="brand">
                Label
              </Button>
            </Inline>
          </Card>

          <CodeBlock>{`<Inline space={2}>
  <Button icon="publish" padding={4}>
    Label
  </Button>
  <Button icon="publish" padding={4} tone="brand">
  Label
  </Button>
</Inline>`}</CodeBlock>

          <Stack space={2}>
            <Inline space={2}>
              <Button icon="publish">Label</Button>
              <Button icon="publish" tone="brand">
                Label
              </Button>
              <Button icon="publish" tone="positive">
                Label
              </Button>
              <Button icon="publish" tone="caution">
                Label
              </Button>
              <Button icon="publish" tone="critical">
                Label
              </Button>
            </Inline>

            <Inline space={2}>
              <Button icon="publish" mode="ghost">
                Label
              </Button>
              <Button icon="publish" mode="ghost" tone="brand">
                Label
              </Button>
              <Button icon="publish" mode="ghost" tone="positive">
                Label
              </Button>
              <Button icon="publish" mode="ghost" tone="caution">
                Label
              </Button>
              <Button icon="publish" mode="ghost" tone="critical">
                Label
              </Button>
            </Inline>

            <Inline space={2}>
              <Button icon="publish" mode="bleed">
                Label
              </Button>
              <Button icon="publish" mode="bleed" tone="brand">
                Label
              </Button>
              <Button icon="publish" mode="bleed" tone="positive">
                Label
              </Button>
              <Button icon="publish" mode="bleed" tone="caution">
                Label
              </Button>
              <Button icon="publish" mode="bleed" tone="critical">
                Label
              </Button>
            </Inline>
          </Stack>
        </Stack>
      </AppLayout>
    </>
  )
}

export default ButtonPage
