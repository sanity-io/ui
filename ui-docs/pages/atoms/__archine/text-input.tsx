import {TextInput, Card, Heading, Stack} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'
import {AppLayout} from '~/components'

function TextInputPage() {
  return (
    <>
      <Head>
        <title>TextInput – Sanity UI</title>
      </Head>

      <AppLayout>
        <Stack space={[4, 4, 5, 6]}>
          <Heading as="h1" size={[2, 2, 3, 4]}>
            TextInput
          </Heading>

          <Card padding={[3, 3, 4, 5]} radius={2} tone="transparent">
            <TextInput value="text" />
          </Card>
        </Stack>
      </AppLayout>
    </>
  )
}

export default TextInputPage
