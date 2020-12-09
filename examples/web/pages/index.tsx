import {Icon} from '@sanity/icons'
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
      <Card flex={1} paddingX={[3, 4, 5]} paddingY={[5, 6, 7, 8]}>
        <Stack space={[3, 4, 5]}>
          <Heading size={[2, 3, 4, 5]} style={{textAlign: 'center'}}>
            Build beyond your expectations
          </Heading>
          <Container width={0}>
            <Text muted size={[2, 3, 4]} style={{textAlign: 'center'}}>
              Sanity is the ultimate content platform that helps teams dream big and deliver
              quickly.
            </Text>
          </Container>

          <Inline space={2} style={{textAlign: 'center'}}>
            <Button size={[2, 2, 3]} text="Get started" tone="primary" />
            <Text muted size={[2, 2, 3]}>
              or
            </Text>
            <Button mode="ghost" size={[2, 2, 3]} text="Contact us" />
          </Inline>
        </Stack>

        <Box marginTop={[4, 5, 6]}>
          <Container width={1}>
            <Card radius={2} shadow={5} style={{paddingBottom: 'calc(9 / 16 * 100%)'}} />
          </Container>
        </Box>

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

      <Card borderTop flex={1}>
        <Container width={2}>
          <Box paddingX={[3, 4, 5]} paddingY={[5, 6, 7, 8]}>
            <Grid columns={[1, 1, 12, 12]} gap={[3, 4, 5]}>
              <Box column={[1, 1, 6, 5]}>
                <Stack space={[3, 4, 5]}>
                  <Heading size={[2, 2, 3, 4]}>Built to be built on</Heading>
                  <Text muted size={[2, 3, 4]}>
                    Developers love Sanity because it exceeds expectations from flexibility to
                    functionality and beyond.
                  </Text>
                  <Card padding={[3, 4]} radius={2} tone="transparent">
                    <Code size={[1, 2, 3]}>{`npm install -g @sanity/cli\nsanity init`}</Code>
                  </Card>
                </Stack>
              </Box>
              <Box column={[1, 1, 6, 7]}>
                <Card radius={2} style={{paddingBottom: 'calc(2 / 3 * 100%)'}} tone="transparent" />
              </Box>
            </Grid>
          </Box>

          <Box paddingX={[3, 4, 5]} paddingBottom={[5, 6, 7, 8]}>
            <Grid columns={[1, 1, 1, 3]} gap={[3, 4, 5]}>
              <Flex align="flex-start">
                <Box marginRight={3}>
                  <Heading>
                    <Icon symbol="cog" />
                  </Heading>
                </Box>
                <Box flex={1}>
                  <Heading size={[0, 0, 1]}>Modern platform</Heading>
                  <Box marginTop={[2, 2, 3]} marginBottom={[3, 3, 4]}>
                    <Text muted size={[2, 2, 3]}>
                      Quickly build on a hosted content infrastructure with great APIs &
                      technologies like GraphQL and JavaScript.
                    </Text>
                  </Box>
                  <Text muted size={[2, 2, 3]}>
                    <a href="#">Join the community &rarr;</a>
                  </Text>
                </Box>
              </Flex>

              <Flex align="flex-start">
                <Box marginRight={3}>
                  <Heading>
                    <Icon symbol="code-block" />
                  </Heading>
                </Box>
                <Box flex={1}>
                  <Heading size={[0, 0, 1]}>Programmable</Heading>
                  <Box marginTop={[2, 2, 3]} marginBottom={[3, 3, 4]}>
                    <Text muted size={[2, 2, 3]}>
                      Building blocks that don’t box you in. Jumpstart your own collaborative
                      workspace with an open source editing environment that empower everyone on
                      your team.
                    </Text>
                  </Box>
                  <Text muted size={[2, 2, 3]}>
                    <a href="#">Explore Sanity Studio &rarr;</a>
                  </Text>
                </Box>
              </Flex>

              <Flex align="flex-start">
                <Box marginRight={3}>
                  <Heading>
                    <Icon symbol="binary-document" />
                  </Heading>
                </Box>
                <Box flex={1}>
                  <Heading size={[0, 0, 1]}>Structured content</Heading>
                  <Box marginTop={[2, 2, 3]} marginBottom={[3, 3, 4]}>
                    <Text muted size={[2, 2, 3]}>
                      Sanity lets you treat content as data so you can flow it across APIs to power
                      experiences wherever you might need them.
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

      <Card flex={1} paddingX={[3, 4, 5]} paddingY={[5, 6, 7, 8]} scheme="dark">
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
