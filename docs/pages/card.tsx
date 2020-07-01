import {AppLayout, CodeBlock} from '~/components'
import {Box, Card, Stack, Text} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'

function CardPage() {
  return (
    <>
      <Head>
        <title>Card – Sanity UI</title>
      </Head>

      <AppLayout>
        <Box as="main" padding={4}>
          <h1>Card</h1>

          <Stack space={4}>
            <Card padding={3} radius={2} tone="transparent">
              <Card padding={4}>
                <Text>Text</Text>
              </Card>
            </Card>

            <CodeBlock>{`<Card padding={4}>
  <Text>Text</Text>
</Card>`}</CodeBlock>
          </Stack>
        </Box>
      </AppLayout>
    </>
  )
}

export default CardPage
