import {Card, Heading, Stack, TextArea} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'
import {AppLayout} from '~/components'

function TextAreaPage() {
  return (
    <>
      <Head>
        <title>TextArea – Sanity UI</title>
      </Head>

      <AppLayout>
        <Stack space={[4, 4, 5, 6]}>
          <Heading as="h1" size={[2, 2, 3, 4]}>
            TextArea
          </Heading>

          <Card padding={[3, 3, 4, 5]} radius={2} tone="transparent">
            <TextArea value="text area" />
          </Card>
        </Stack>
      </AppLayout>
    </>
  )
}

export default TextAreaPage
