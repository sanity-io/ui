import {AppLayout, CodeBlock} from '~/components'
import {Card, Stack, Text} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'

function TextPage() {
  return (
    <>
      <Head>
        <title>Text – Sanity UI</title>
      </Head>

      <AppLayout>
        <h1>Text</h1>

        <Stack space={4}>
          <Card padding={3} radius={2} tone="transparent">
            <Stack space={4}>
              <Card>
                <Text size={0}>Text 0</Text>
              </Card>
              <Card>
                <Text size={1}>Text 1</Text>
              </Card>
              <Card>
                <Text size={2}>Text 2</Text>
              </Card>
              <Card>
                <Text size={3}>Text 3</Text>
              </Card>
              <Card>
                <Text size={4}>Text 4</Text>
              </Card>
            </Stack>
          </Card>

          <CodeBlock>{`<Stack space={4}>
  <Card>
    <Text size={0}>Text 0</Text>
  </Card>
  <Card>
    <Text size={1}>Text 1</Text>
  </Card>
  <Card>
    <Text size={2}>Text 2</Text>
  </Card>
  <Card>
    <Text size={3}>Text 3</Text>
  </Card>
  <Card>
    <Text size={4}>Text 4</Text>
  </Card>
</Stack>`}</CodeBlock>
        </Stack>
      </AppLayout>
    </>
  )
}

export default TextPage
