import {AppLayout, CodeBlock} from '~/components'
import {Box, Card, Stack, Text} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'

function BoxPage() {
  return (
    <>
      <Head>
        <title>Box – Sanity UI</title>
      </Head>

      <AppLayout>
        <Box as="main" padding={4}>
          <h1>Box</h1>

          <Stack space={4}>
            <Card padding={3} radius={2} tone="transparent">
              <Box padding={4} style={{outline: '1px solid red'}}>
                <Text>Text</Text>
              </Box>
            </Card>

            <CodeBlock>{`<Box padding={4} style={{outline: '1px solid red'}}>
  <Text>Text</Text>
</Box>`}</CodeBlock>
          </Stack>
        </Box>
      </AppLayout>
    </>
  )
}

export default BoxPage
