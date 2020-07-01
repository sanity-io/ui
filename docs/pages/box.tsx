import {AppLayout} from '~/components'
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

          <Card as="pre" padding={2} tone="contrast">
            <code>{`<Box padding={4} style={{outline: '1px solid red'}}>
  <Text>Text</Text>
</Box>`}</code>
          </Card>
        </Box>
      </AppLayout>
    </>
  )
}

export default BoxPage
