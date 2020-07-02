import {AppLayout, CodeBlock} from '~/components'
import {Card, Container, Heading, Stack, Text} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'

function ContainerPage() {
  return (
    <>
      <Head>
        <title>Container – Sanity UI</title>
      </Head>

      <AppLayout>
        <Stack space={4}>
          <Heading as="h1" size={3}>
            Container
          </Heading>

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
