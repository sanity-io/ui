import icons from '@sanity/icons'
import {Box, Card, Code, Grid, Heading, Stack, Text} from '@sanity/ui'
import Head from 'next/head'
import React, {createElement} from 'react'
import {AppLayout} from '$components'
import {ResourcesPageLayout} from '$components/_resourcesPage/layout'

function IconsPage() {
  return (
    <>
      <Head>
        <title>Icons – Resources – Sanity Design</title>
      </Head>

      <AppLayout>
        <ResourcesPageLayout>
          <Box as="main" padding={[4, 5, 6, 7]}>
            <Stack space={[4, 4, 5, 6]}>
              <Heading as="h1" size={[2, 2, 3, 4]}>
                Icons
              </Heading>

              <Grid columns={[1, 1, 2, 3, 4]} gap={2}>
                {Object.keys(icons).map((iconSymbol) => (
                  <Card
                    key={iconSymbol}
                    padding={[3, 3, 4]}
                    tone="transparent"
                    style={{textAlign: 'center'}}
                  >
                    <Stack space={[3, 3, 4]}>
                      <Text size={[3, 3, 4]}>{createElement((icons as any)[iconSymbol])}</Text>
                      <Code size={1}>{iconSymbol}</Code>
                    </Stack>
                  </Card>
                ))}
              </Grid>
            </Stack>
          </Box>
        </ResourcesPageLayout>
      </AppLayout>
    </>
  )
}

export default IconsPage
