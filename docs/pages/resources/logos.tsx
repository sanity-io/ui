import {GroqLogo, GroqMonogram, SanityLogo, SanityMonogram} from '@sanity/logos'
import {Box, Card, Code, Grid, Heading, Stack} from '@sanity/ui'
import React, {createElement} from 'react'
import {AppLayout, useApp} from '$components'
import {ResourcesPageLayout} from '$components/_resourcesPage/layout'

const sanity = [
  {
    component: SanityLogo,
    name: 'SanityLogo',
  },
  {
    component: SanityMonogram,
    name: 'SanityMonogram',
  },
]

const groq = [
  {
    component: GroqLogo,
    name: 'GroqLogo',
  },
  {
    component: GroqMonogram,
    name: 'GroqMonogram',
  },
]

function LogosPage() {
  const app = useApp()

  return (
    <AppLayout>
      <ResourcesPageLayout>
        <Box as="main" padding={[4, 5, 6, 7]}>
          <Stack space={[4, 4, 5, 6]}>
            <Heading as="h1" size={[2, 2, 3, 4]}>
              Logos
            </Heading>

            <Stack space={[3, 3, 4]}>
              <Heading>Sanity</Heading>
              <Grid columns={[1, 1, 2]} gap={2}>
                {sanity.map((logo) => (
                  <Card
                    border
                    key={logo.name}
                    overflow="hidden"
                    radius={2}
                    style={{textAlign: 'center'}}
                  >
                    <Card borderBottom padding={5}>
                      <Heading as="span" size={[3, 3, 4, 5]}>
                        {createElement(logo.component, {dark: app.colorScheme === 'dark'})}
                      </Heading>
                    </Card>
                    <Box padding={4}>
                      <Code muted size={[1, 1, 2]}>
                        {logo.name}
                      </Code>
                    </Box>
                  </Card>
                ))}
              </Grid>
            </Stack>

            <Stack space={[3, 3, 4]}>
              <Heading>GROQ</Heading>
              <Grid columns={[1, 1, 2]} gap={2}>
                {groq.map((logo) => (
                  <Card
                    border
                    key={logo.name}
                    overflow="hidden"
                    radius={2}
                    style={{textAlign: 'center'}}
                  >
                    <Card borderBottom padding={5}>
                      <Heading as="span" size={[3, 3, 4, 5]}>
                        {createElement(logo.component)}
                      </Heading>
                    </Card>
                    <Box padding={4}>
                      <Code muted size={[1, 1, 2]}>
                        {logo.name}
                      </Code>
                    </Box>
                  </Card>
                ))}
              </Grid>
            </Stack>
          </Stack>
        </Box>
      </ResourcesPageLayout>
    </AppLayout>
  )
}

export default LogosPage
