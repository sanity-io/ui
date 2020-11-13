import {Box, Container, Heading, Stack} from '@sanity/ui'
import React from 'react'
import {AppLayout} from '$components'
import {ResourcesPageLayout} from '$components/_resourcesPage/layout'

function IconsPage() {
  return (
    <AppLayout>
      <ResourcesPageLayout>
        <Stack space={[4, 4, 5, 6]}>
          <Container as="main" width={2} style={{height: '100%'}}>
            <Box as="main" paddingX={[4, 5, 6, 7]} paddingY={[5, 6, 7, 8]}>
              <Heading as="h1" size={[2, 2, 3, 4]}>
                Icons
              </Heading>
            </Box>
          </Container>
        </Stack>
      </ResourcesPageLayout>
    </AppLayout>
  )
}

export default IconsPage
