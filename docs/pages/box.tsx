import {AppLayout, CodeBlock} from '~/components'
import {Box, Card, Heading, Stack, Text} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'

function BoxPage() {
  return (
    <>
      <Head>
        <title>Box – Sanity UI</title>
      </Head>

      <AppLayout>
        <Stack space={4}>
          <Heading as="h1" size={3}>
            Box
          </Heading>

          <Card padding={3} radius={2} tone="transparent">
            <Box padding={4} style={{outline: '1px solid red'}}>
              <Text>Text</Text>
            </Box>
          </Card>

          <CodeBlock>{`<Box padding={4} style={{outline: '1px solid red'}}>
  <Text>Text</Text>
</Box>`}</CodeBlock>
        </Stack>
      </AppLayout>
    </>
  )
}

export default BoxPage
