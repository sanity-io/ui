import {Card, Container, Heading, Stack, Text} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'
import {AppLayout, CodeBlock} from '~/components'

function ContainerPage() {
  return (
    <>
      <Head>
        <title>Container – Sanity UI</title>
      </Head>

      <AppLayout>
        <Stack space={[4, 4, 5, 6]}>
          <Heading as="h1" size={[2, 2, 3, 4]}>
            Container
          </Heading>

          <Card padding={[3, 3, 4, 5]} radius={2} tone="transparent">
            <Container width={0}>
              <Card padding={[3, 3, 4, 5]}>
                <Text size={[2, 2, 3, 4]}>Contained text</Text>
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
