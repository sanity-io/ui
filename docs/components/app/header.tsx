import {Box, Container, Stack, Text} from '@sanity/ui'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

const Root = styled(Box)`
  height: 100%;
`

export function AppHeader() {
  return (
    <Root forwardedAs="header">
      <Container>
        <Box padding={4}>
          <Stack space={3}>
            <Text>
              <Link href="/">
                <a>
                  <strong>Sanity UI</strong>
                </a>
              </Link>
            </Text>

            <Text>
              <Link href="/box">
                <a>Box</a>
              </Link>
            </Text>

            <Text>
              <Link href="/button">
                <a>Button</a>
              </Link>
            </Text>

            <Text>
              <Link href="/card">
                <a>Card</a>
              </Link>
            </Text>

            <Text>
              <Link href="/code">
                <a>Code</a>
              </Link>
            </Text>

            <Text>
              <Link href="/container">
                <a>Container</a>
              </Link>
            </Text>

            <Text>
              <Link href="/flex">
                <a>Flex</a>
              </Link>
            </Text>

            <Text>
              <Link href="/inline">
                <a>Inline</a>
              </Link>
            </Text>

            <Text>
              <Link href="/stack">
                <a>Stack</a>
              </Link>
            </Text>

            <Text>
              <Link href="/text">
                <a>Text</a>
              </Link>
            </Text>
          </Stack>
        </Box>
      </Container>
    </Root>
  )
}
