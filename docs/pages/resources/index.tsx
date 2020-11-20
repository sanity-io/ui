import {Box, Container, Heading, Stack} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'
import {AppLayout} from '$components'
import {ResourcesPageLayout} from '$components/_resourcesPage/layout'

function ResourcesPage() {
  return (
    <>
      <Head>
        <title>Resources – Sanity Design</title>
      </Head>

      <AppLayout>
        <ResourcesPageLayout>
          <Stack space={[4, 4, 5, 6]}>
            <Container as="main" height="fill" width={2}>
              <Box as="main" paddingX={[4, 5, 6, 7]} paddingY={[5, 6, 7, 8]}>
                <Heading as="h1" size={[2, 2, 3, 4]}>
                  Resources
                </Heading>
              </Box>
            </Container>
          </Stack>
        </ResourcesPageLayout>
      </AppLayout>
    </>
  )
}

export default ResourcesPage
