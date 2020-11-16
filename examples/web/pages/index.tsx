import {Box, Button, Card, Container, Heading, Inline, Label, Stack, Text} from '@sanity/ui'
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
            <Button size={[2, 2, 3]} text="Get started" tone="brand" />
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
            <Container width={0}>
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
