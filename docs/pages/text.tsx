import {AppLayout} from '~/components'
import {Box, Card, Stack, Text} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'

function TextPage() {
  return (
    <>
      <Head>
        <title>Text – Sanity UI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <Box as="main" padding={4}>
          <h1>Text</h1>

          <Card padding={2} tone="transparent">
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

          <Card as="pre" padding={2} tone="contrast">
            <code>{`<Stack space={4}>
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
</Stack>`}</code>
          </Card>
        </Box>
      </AppLayout>
    </>
  )
}

export default TextPage
