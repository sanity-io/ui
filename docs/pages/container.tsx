import {AppLayout, CodeBlock} from '~/components'
import {Card, Container, Stack, Text} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'

function ContainerPage() {
  return (
    <>
      <Head>
        <title>Container – Sanity UI</title>
      </Head>

      <AppLayout>
        <h1>Container</h1>

        <Stack space={4}>
          <Card padding={3} radius={2} tone="transparent">
            <Container width={0}>
              <Card padding={4}>
                <Text>Contained text</Text>
              </Card>
            </Container>
          </Card>

          <CodeBlock>{`<Container width={0}>
  <Card padding={4}>
    <Text>Contained text</Text>
  </Card>
</Container>`}</CodeBlock>
        </Stack>
      </AppLayout>
    </>
  )
}

export default ContainerPage
