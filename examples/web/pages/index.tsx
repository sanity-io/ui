import {CodeBlockIcon, ImageIcon, MasterDetailIcon} from '@sanity/icons'
import {
  Box,
  Button,
  Card,
  Code,
  Container,
  Flex,
  Grid,
  Heading,
  Inline,
  Label,
  Stack,
  Text,
} from '@sanity/ui'
import React from 'react'
import {AppLayout} from '$components'

function IndexPage() {
  return (
    <AppLayout>
      <Card flex={1} paddingX={[3, 4, 5]} paddingY={[5, 6, 7]}>
        <Stack space={[3, 4, 5]}>
          <Heading align="center" size={[2, 3, 4, 5]}>
            Content is Data
          </Heading>
          <Container width={0}>
            <Text align="center" muted size={[2, 3, 4]}>
              Sanity.io is the unified content platform that powers better digital experiences
            </Text>
          </Container>

          <Inline space={2} style={{textAlign: 'center'}}>
            <Button fontSize={[2, 2, 3]} text="Get started" tone="primary" />
            <Text muted size={[2, 2, 3]}>
              or
            </Text>
            <Button mode="ghost" fontSize={[2, 2, 3]} text="Contact us" />
          </Inline>
        </Stack>

        <Box marginTop={[4, 5, 6]}>
          <Label muted size={[2, 2, 3]} style={{textAlign: 'center'}}>
            POWERING EXCEPTIONAL DIGITAL EXPERIENCES EVERYWHERE
          </Label>

          <Box marginTop={[3, 4, 5]}>
            <Container width={1}>
              <Inline space={[3, 3, 4]} style={{textAlign: 'center'}}>
                <Card style={{width: 136, height: 40}} tone="transparent" />
                <Card style={{width: 156, height: 40}} tone="transparent" />
                <Card style={{width: 116, height: 40}} tone="transparent" />
                <Card style={{width: 126, height: 40}} tone="transparent" />
                <Card style={{width: 136, height: 40}} tone="transparent" />
                <Card style={{width: 166, height: 40}} tone="transparent" />
                <Card style={{width: 106, height: 40}} tone="transparent" />
                <Card style={{width: 96, height: 40}} tone="transparent" />
                <Card style={{width: 126, height: 40}} tone="transparent" />
                <Card style={{width: 116, height: 40}} tone="transparent" />
                <Card style={{width: 120, height: 40}} tone="transparent" />
              </Inline>
            </Container>
          </Box>
        </Box>
      </Card>

      <Card borderTop flex={1} paddingX={[3, 4, 5]} paddingY={[5, 6, 7]}>
        <Container width={1}>
          <Card overflow="hidden" radius={2} shadow={5}>
            <video
              autoPlay
              poster="https://cdn.sanity.io/images/3do82whm/next/4b79fa8cecfcb0271b70c094760ee5eb18b41801-1920x1080.png?auto=format"
              playsInline
              height=""
              width="100%"
              src="https://www.sanity.io/6175e860-1c82-458f-897f-46f773218235"
              style={{display: 'block'}}
            />
          </Card>
          {/* <Card radius={2} shadow={5} style={{paddingBottom: 'calc(9 / 16 * 100%)'}} /> */}
        </Container>
      </Card>

      <Card borderTop flex={1}>
        <Container width={2}>
          <Box paddingX={[3, 4, 5]} paddingY={[5, 6, 7]}>
            <Grid columns={[1, 1, 12, 12]} gap={[3, 4, 5]}>
              <Box column={[1, 1, 6, 5]}>
                <Stack space={[3, 4, 5]}>
                  <Heading size={[2, 2, 3, 4]}>Built to be built on</Heading>
                  <Text muted size={[2, 3, 4]}>
                    Sanity is the most flexible platform for building data driven content solutions.
                  </Text>
                  <Card padding={[3, 4]} radius={2} tone="transparent">
                    <Code size={[1, 2, 3]}>{`npm install -g @sanity/cli\nsanity init`}</Code>
                  </Card>
                </Stack>
              </Box>
              <Box column={[1, 1, 6, 7]}>
                <div style={{position: 'relative', paddingBottom: 'calc(2 / 3 * 100%)'}}>
                  <img
                    src="https://cdn.sanity.io/images/3do82whm/next/55236b64b6509be5d1723a5f44a53fc4edcefd37-554x473.svg?h=473&fit=max&auto=format"
                    style={{
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      objectFit: 'contain',
                    }}
                  />
                </div>
              </Box>
            </Grid>
          </Box>

          <Box paddingX={[3, 4, 5]} paddingBottom={[5, 6, 7]}>
            <Grid columns={[1, 1, 1, 3]} gap={[3, 4, 5]}>
              <Flex align="flex-start">
                <Box marginRight={3}>
                  <Heading accent size={[0, 0, 1]}>
                    <CodeBlockIcon />
                  </Heading>
                </Box>
                <Box flex={1}>
                  <Heading size={[0, 0, 1]}>Content Lake</Heading>
                  <Box marginTop={[2, 2, 3]} marginBottom={[3, 3, 4]}>
                    <Text muted size={[2, 2, 3]}>
                      Use structured content to integrate across organizations and disciplines,
                      assembling your infrastructure from the best components.
                    </Text>
                  </Box>
                  <Text muted size={[2, 2, 3]}>
                    <a href="#">Explore the Content Lake &rarr;</a>
                  </Text>
                </Box>
              </Flex>

              <Flex align="flex-start">
                <Box marginRight={3}>
                  <Heading accent size={[0, 0, 1]}>
                    <MasterDetailIcon />
                  </Heading>
                </Box>
                <Box flex={1}>
                  <Heading size={[0, 0, 1]}>Sanity Studio</Heading>
                  <Box marginTop={[2, 2, 3]} marginBottom={[3, 3, 4]}>
                    <Text muted size={[2, 2, 3]}>
                      <strong>Collaborate and customize.</strong> Sanity Studio is a real-time
                      toolkit for creating efficient data-driven content applications.
                    </Text>
                  </Box>
                  <Text muted size={[2, 2, 3]}>
                    <a href="#">Setup the Studio &rarr;</a>
                  </Text>
                </Box>
              </Flex>

              <Flex align="flex-start">
                <Box marginRight={3}>
                  <Heading accent size={[0, 0, 1]}>
                    <ImageIcon />
                  </Heading>
                </Box>
                <Box flex={1}>
                  <Heading size={[0, 0, 1]}>Developer Experience</Heading>
                  <Box marginTop={[2, 2, 3]} marginBottom={[3, 3, 4]}>
                    <Text muted size={[2, 2, 3]}>
                      <strong>By developers, for developers.</strong> Our open and flexible platform
                      uses tooling you already know so you feel right at home, right away.
                    </Text>
                  </Box>
                  <Text muted size={[2, 2, 3]}>
                    <a href="#">Discover Structured Content &rarr;</a>
                  </Text>
                </Box>
              </Flex>
            </Grid>
          </Box>
        </Container>
      </Card>

      <Card flex={1} paddingX={[3, 4, 5]} paddingY={[5, 6, 7]} scheme="dark">
        <Stack space={[3, 4, 5]}>
          <Heading size={[2, 3, 4, 5]} style={{textAlign: 'center'}}>
            Everyone on the same page. For&nbsp;real.
          </Heading>
          <Container width={0}>
            <Text muted size={[2, 3, 4]} style={{textAlign: 'center'}}>
              Sanity is the first content platform to empower teams of all sizes with real-time
              collaboration, advanced version control and more.
            </Text>
          </Container>
        </Stack>
      </Card>
    </AppLayout>
  )
}

export default IndexPage
