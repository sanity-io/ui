import {AppLayout} from '~/components'
import {Box, Card, Flex, Text} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'

function FlexPage() {
  return (
    <>
      <Head>
        <title>Flex – Sanity UI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <Box as="main" padding={4}>
          <h1>Flex</h1>

          <Card padding={2} tone="transparent">
            <Flex>
              <Card flex={1}>
                <Text>hello</Text>
              </Card>
              <Card flex={[1, 2, 3]}>
                <Text>world</Text>
              </Card>
            </Flex>
          </Card>

          <Card as="pre" padding={2} tone="contrast">
            <code>{`<Flex>
  <Card flex={1}>
    <Text>hello</Text>
  </Card>
  <Card flex={[1, 2, 3]}>
    <Text>world</Text>
  </Card>
</Flex>`}</code>
          </Card>

          <Card padding={2} tone="transparent">
            <Flex direction="column">
              <Card flex={1}>
                <Text>hello</Text>
              </Card>
              <Card flex={1}>
                <Text>world</Text>
              </Card>
            </Flex>
          </Card>

          <Card as="pre" padding={2} tone="contrast">
            <code>{`<Flex direction="column">
  <Card flex={1}>
    <Text>hello</Text>
  </Card>
  <Card flex={1}>
    <Text>world</Text>
  </Card>
</Flex>`}</code>
          </Card>
        </Box>
      </AppLayout>
    </>
  )
}

export default FlexPage
