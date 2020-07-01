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
          <Stack space={2}>
            <Text>
              <Link href="/" passHref>
                <a>Sanity UI</a>
              </Link>
            </Text>

            <Text>
              <Link href="/box" passHref>
                <a>Box</a>
              </Link>
            </Text>

            <Text>
              <Link href="/button" passHref>
                <a>Button</a>
              </Link>
            </Text>

            <Text>
              <Link href="/card" passHref>
                <a>Card</a>
              </Link>
            </Text>

            <Text>
              <Link href="/container" passHref>
                <a>Container</a>
              </Link>
            </Text>

            <Text>
              <Link href="/flex" passHref>
                <a>Flex</a>
              </Link>
            </Text>

            <Text>
              <Link href="/inline" passHref>
                <a>Inline</a>
              </Link>
            </Text>

            <Text>
              <Link href="/stack" passHref>
                <a>Stack</a>
              </Link>
            </Text>

            <Text>
              <Link href="/text" passHref>
                <a>Text</a>
              </Link>
            </Text>
          </Stack>
        </Box>
      </Container>
    </Root>
  )
}
