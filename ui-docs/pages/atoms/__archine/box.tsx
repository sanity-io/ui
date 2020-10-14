import {Box, Card, Heading, Stack, Text} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'
import {AppLayout, CodeBlock} from '~/components'

function BoxPage() {
  return (
    <>
      <Head>
        <title>Box – Sanity UI</title>
      </Head>

      <AppLayout>
        <Stack space={[4, 4, 5, 6]}>
          <Heading as="h1" size={[2, 2, 3, 4]}>
            Box
          </Heading>

          <Card padding={[3, 3, 4, 5]} radius={2} tone="transparent">
            <Box padding={[3, 3, 4, 5]} style={{outline: '1px solid red'}}>
              <Text size={[2, 2, 3, 4]}>Text</Text>
            </Box>
          </Card>

          <CodeBlock>{`<Box padding={[3, 3, 4, 5]} style={{outline: '1px solid red'}}>
  <Text size={[2, 2, 3, 4]}>Text</Text>
</Box>`}</CodeBlock>
        </Stack>
      </AppLayout>
    </>
  )
}

export default BoxPage
