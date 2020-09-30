import {AppLayout, CodeBlock} from '~/components'
import {Card, Flex, Heading, Stack, Text} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'

function FlexPage() {
  return (
    <>
      <Head>
        <title>Flex – Sanity UI</title>
      </Head>

      <AppLayout>
        <Stack space={[4, 4, 5, 6]}>
          <Heading as="h1" size={[2, 2, 3, 4]}>
            Flex
          </Heading>

          <Card padding={[3, 3, 4, 5]} radius={2} tone="transparent">
            <Flex>
              <Card flex={1}>
                <Text size={[2, 2, 3, 4]}>hello</Text>
              </Card>
              <Card flex={[1, 2, 3]}>
                <Text size={[2, 2, 3, 4]}>world</Text>
              </Card>
            </Flex>
          </Card>

          <CodeBlock>{`<Flex>
  <Card flex={1}>
    <Text size={[2, 2, 3, 4]}>hello</Text>
  </Card>
  <Card flex={[1, 2, 3]}>
    <Text size={[2, 2, 3, 4]}>world</Text>
  </Card>
</Flex>`}</CodeBlock>

          <Card padding={3} radius={2} tone="transparent">
            <Flex direction="column">
              <Card flex={1}>
                <Text size={[2, 2, 3, 4]}>hello</Text>
              </Card>
              <Card flex={1}>
                <Text size={[2, 2, 3, 4]}>world</Text>
              </Card>
            </Flex>
          </Card>

          <CodeBlock>{`<Flex direction="column">
  <Card flex={1}>
    <Text size={[2, 2, 3, 4]}>hello</Text>
  </Card>
  <Card flex={1}>
    <Text size={[2, 2, 3, 4]}>world</Text>
  </Card>
</Flex>`}</CodeBlock>
        </Stack>
      </AppLayout>
    </>
  )
}

export default FlexPage
