import {Card, Heading, Stack, Tooltip} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'
import {AppLayout} from '~/components'

function TooltipPage() {
  return (
    <>
      <Head>
        <title>Tooltip – Sanity UI</title>
      </Head>

      <AppLayout>
        <Stack space={[4, 4, 5, 6]}>
          <Heading as="h1" size={[2, 2, 3, 4]}>
            Tooltip
          </Heading>

          <Card padding={[3, 3, 4, 5]} radius={2} tone="transparent">
            <Tooltip content={<>content</>}>
              <div>hover me</div>
            </Tooltip>
          </Card>
        </Stack>
      </AppLayout>
    </>
  )
}

export default TooltipPage
