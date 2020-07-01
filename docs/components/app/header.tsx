import {Box, Code, Container, Stack, Text} from '@sanity/ui'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import pkg from '../../../package.json'

const Root = styled(Box)`
  height: 100%;
`

export function AppHeader() {
  return (
    <Root forwardedAs="header">
      <Container>
        <Box padding={5}>
          <Stack space={5}>
            <Stack as="ul" space={3}>
              <Text as="li">
                <Link href="/">
                  <a>
                    <strong>Sanity UI</strong>
                  </a>
                </Link>
              </Text>

              <Text as="li">
                <Link href="/box">
                  <a>Box</a>
                </Link>
              </Text>

              <Text as="li">
                <Link href="/button">
                  <a>Button</a>
                </Link>
              </Text>

              <Text as="li">
                <Link href="/card">
                  <a>Card</a>
                </Link>
              </Text>

              <Text as="li">
                <Link href="/code">
                  <a>Code</a>
                </Link>
              </Text>

              <Text as="li">
                <Link href="/container">
                  <a>Container</a>
                </Link>
              </Text>

              <Text as="li">
                <Link href="/flex">
                  <a>Flex</a>
                </Link>
              </Text>

              <Text as="li">
                <Link href="/inline">
                  <a>Inline</a>
                </Link>
              </Text>

              <Text as="li">
                <Link href="/stack">
                  <a>Stack</a>
                </Link>
              </Text>

              <Text as="li">
                <Link href="/text">
                  <a>Text</a>
                </Link>
              </Text>
            </Stack>

            <Stack as="ul" space={3}>
              <Code as="li" size={1}>
                <strong>@sanity/ui</strong> v{pkg.version}
              </Code>

              <Text as="li">
                <a href="https://github.com/sanity-io/ui" rel="noreferrer" target="_blank">
                  GitHub &#8599;
                </a>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Root>
  )
}
