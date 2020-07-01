import {AppLayout, CodeBlock} from '~/components'
import {Box, Card, Text} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'

function BoxPage() {
  return (
    <>
      <Head>
        <title>Box – Sanity UI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <Box as="main" padding={4}>
          <h1>Box</h1>

          <Card padding={2} tone="transparent">
            <Box padding={4} style={{outline: '1px solid red'}}>
              <Text>Text</Text>
            </Box>
          </Card>

          <CodeBlock>{`<Box padding={4} style={{outline: '1px solid red'}}>
  <Text>Text</Text>
</Box>`}</CodeBlock>
        </Box>
      </AppLayout>
    </>
  )
}

export default BoxPage
