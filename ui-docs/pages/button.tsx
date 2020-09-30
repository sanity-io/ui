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
        <Stack space={[4, 4, 5, 6]}>
          <Heading as="h1" size={[2, 2, 3, 4]}>
            Button
          </Heading>

          <Card padding={[3, 3, 4, 5]} radius={2} tone="transparent">
            <Inline space={[3, 3, 4, 5]}>
              <Button icon="publish" padding={[3, 3, 4]} size={[2, 2, 3, 4]}>
                Label
              </Button>
              <Button icon="publish" padding={[3, 3, 4]} size={[2, 2, 3, 4]} tone="brand">
                Label
              </Button>
            </Inline>
          </Card>

          <CodeBlock>{`<Inline space={[3, 3, 4, 5]}>
  <Button icon="publish" padding={[3, 3, 4]} size={[2, 2, 3, 4]}>
    Label
  </Button>
  <Button icon="publish" padding={[3, 3, 4]} size={[2, 2, 3, 4]} tone="brand">
    Label
  </Button>
</Inline>`}</CodeBlock>

          <Stack space={[3, 3, 4, 5]}>
            <Inline space={[3, 3, 4, 5]}>
              <Button icon="publish" padding={[3, 3, 4]} size={[2, 2, 3, 4]}>
                Label
              </Button>
              <Button icon="publish" padding={[3, 3, 4]} size={[2, 2, 3, 4]} tone="brand">
                Label
              </Button>
              <Button icon="publish" padding={[3, 3, 4]} size={[2, 2, 3, 4]} tone="positive">
                Label
              </Button>
              <Button icon="publish" padding={[3, 3, 4]} size={[2, 2, 3, 4]} tone="caution">
                Label
              </Button>
              <Button icon="publish" padding={[3, 3, 4]} size={[2, 2, 3, 4]} tone="critical">
                Label
              </Button>
            </Inline>

            <Inline space={[3, 3, 4, 5]}>
              <Button icon="publish" mode="ghost" padding={[3, 3, 4]} size={[2, 2, 3, 4]}>
                Label
              </Button>
              <Button
                icon="publish"
                mode="ghost"
                padding={[3, 3, 4]}
                size={[2, 2, 3, 4]}
                tone="brand"
              >
                Label
              </Button>
              <Button
                icon="publish"
                mode="ghost"
                padding={[3, 3, 4]}
                size={[2, 2, 3, 4]}
                tone="positive"
              >
                Label
              </Button>
              <Button
                icon="publish"
                mode="ghost"
                padding={[3, 3, 4]}
                size={[2, 2, 3, 4]}
                tone="caution"
              >
                Label
              </Button>
              <Button
                icon="publish"
                mode="ghost"
                padding={[3, 3, 4]}
                size={[2, 2, 3, 4]}
                tone="critical"
              >
                Label
              </Button>
            </Inline>

            <Inline space={[3, 3, 4, 5]}>
              <Button icon="publish" mode="bleed" padding={[3, 3, 4]} size={[2, 2, 3, 4]}>
                Label
              </Button>
              <Button
                icon="publish"
                mode="bleed"
                padding={[3, 3, 4]}
                size={[2, 2, 3, 4]}
                tone="brand"
              >
                Label
              </Button>
              <Button
                icon="publish"
                mode="bleed"
                padding={[3, 3, 4]}
                size={[2, 2, 3, 4]}
                tone="positive"
              >
                Label
              </Button>
              <Button
                icon="publish"
                mode="bleed"
                padding={[3, 3, 4]}
                size={[2, 2, 3, 4]}
                tone="caution"
              >
                Label
              </Button>
              <Button
                icon="publish"
                mode="bleed"
                padding={[3, 3, 4]}
                size={[2, 2, 3, 4]}
                tone="critical"
              >
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
