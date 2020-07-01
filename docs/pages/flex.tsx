import {AppLayout, CodeBlock} from '~/components'
import {Box, Card, Flex, Stack, Text} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'

function FlexPage() {
  return (
    <>
      <Head>
        <title>Flex – Sanity UI</title>
      </Head>

      <AppLayout>
        <Box as="main" padding={4}>
          <h1>Flex</h1>

          <Stack space={4}>
            <Card padding={3} radius={2} tone="transparent">
              <Flex>
                <Card flex={1}>
                  <Text>hello</Text>
                </Card>
                <Card flex={[1, 2, 3]}>
                  <Text>world</Text>
                </Card>
              </Flex>
            </Card>

            <CodeBlock>{`<Flex>
  <Card flex={1}>
    <Text>hello</Text>
  </Card>
  <Card flex={[1, 2, 3]}>
    <Text>world</Text>
  </Card>
</Flex>`}</CodeBlock>

            <Card padding={3} radius={2} tone="transparent">
              <Flex direction="column">
                <Card flex={1}>
                  <Text>hello</Text>
                </Card>
                <Card flex={1}>
                  <Text>world</Text>
                </Card>
              </Flex>
            </Card>

            <CodeBlock>{`<Flex direction="column">
  <Card flex={1}>
    <Text>hello</Text>
  </Card>
  <Card flex={1}>
    <Text>world</Text>
  </Card>
</Flex>`}</CodeBlock>
          </Stack>
        </Box>
      </AppLayout>
    </>
  )
}

export default FlexPage
