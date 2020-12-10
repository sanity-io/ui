import {Box, Card, Container, Grid, Heading, Stack, Text} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'
import {AppLayout} from '$components'
import {PREVIEW} from '$features'
import {loadPageData} from '$lib/page'

export async function getStaticProps(opts: {params?: {path?: string[]}; preview?: boolean}) {
  const {params = {}, preview = PREVIEW} = opts
  const data = await loadPageData({params: params, preview})

  return {props: {...data, params, preview}}
}

function IndexPage() {
  return (
    <>
      <Head>
        <title>Sanity UI</title>
      </Head>

      <AppLayout>
        <Card flex={1} paddingX={[3, 4, 5]} paddingY={[6, 7, 8, 9]}>
          <Stack space={[3, 4, 5]} style={{textAlign: 'center'}}>
            <Heading size={[2, 3, 4, 5]}>Quickly build React apps with Sanity UI</Heading>
            <Text muted size={[2, 3, 4]} weight="medium">
              Sanity UI provides a complete, ergonomic toolkit for quickly building React apps.
            </Text>
          </Stack>

          <Box marginTop={[5, 6, 7, 8]} style={{textAlign: 'center'}}>
            <Heading accent size={[1, 1, 2]}>
              Why Sanity UI?
            </Heading>
          </Box>

          <Container width={2}>
            <Box marginTop={[4, 5, 6]}>
              <Grid columns={[1, 2, 3]} gap={[3, 4, 5]}>
                <Card border padding={4} radius={2}>
                  <Stack space={3}>
                    <Heading size={1}>Themeable with JS</Heading>
                    <Text muted size={2}>
                      Uses `styled-components` to ...
                    </Text>
                  </Stack>
                </Card>
                <Card border padding={4} radius={2}>
                  <Stack space={3}>
                    <Heading size={1}>Layout primitives</Heading>
                    <Text muted size={2}>
                      Uses `styled-components` to ...
                    </Text>
                  </Stack>
                </Card>
                <Card border padding={4} radius={2}>
                  <Stack space={3}>
                    <Heading size={1}>Accessible form elements</Heading>
                    <Text muted size={2}>
                      Uses `styled-components` to ...
                    </Text>
                  </Stack>
                </Card>
                <Card border padding={4} radius={2}>
                  <Stack space={3}>
                    <Heading size={1}>Typescript support</Heading>
                    <Text muted size={2}>
                      Uses `styled-components` to ...
                    </Text>
                  </Stack>
                </Card>
                <Card border padding={4} radius={2}>
                  <Stack space={3}>
                    <Heading size={1}>Tree-shakeable</Heading>
                    <Text muted size={2}>
                      Uses `styled-components` to ...
                    </Text>
                  </Stack>
                </Card>
                <Card border padding={4} radius={2}>
                  <Stack space={3}>
                    <Heading size={1}>Highly composable</Heading>
                    <Text muted size={2}>
                      Uses `styled-components` to ...
                    </Text>
                  </Stack>
                </Card>
              </Grid>
            </Box>
          </Container>
        </Card>
      </AppLayout>
    </>
  )
}

export default IndexPage
