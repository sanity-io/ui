import {Box, Code, Container, Stack, Text} from '@sanity/ui'
import Link from 'next/link'
import {useRouter} from 'next/router'
import React from 'react'
import styled from 'styled-components'
import pkg from '../../../package.json'

const Root = styled(Box)`
  height: 100%;
`

function NavListItemLink(props: {children: React.ReactNode; href: string}) {
  const router = useRouter()

  if (props.href === router.pathname) {
    return <Text as="li">{props.children}</Text>
  }

  return (
    <Text as="li">
      <Link href={props.href}>
        <a>{props.children}</a>
      </Link>
    </Text>
  )
}

export function AppHeader() {
  return (
    <Root forwardedAs="header">
      <Container>
        <Box paddingX={5} paddingY={[4, 5, 6, 7, 8]}>
          <Stack space={5}>
            <Stack as="ul" space={3}>
              <NavListItemLink href="/">
                <strong>Sanity UI</strong>
              </NavListItemLink>
              <NavListItemLink href="/box">Box</NavListItemLink>
              <NavListItemLink href="/button">Button</NavListItemLink>
              <NavListItemLink href="/card">Card</NavListItemLink>
              <NavListItemLink href="/code">Code</NavListItemLink>
              <NavListItemLink href="/container">Container</NavListItemLink>
              <NavListItemLink href="/flex">Flex</NavListItemLink>
              <NavListItemLink href="/inline">Inline</NavListItemLink>
              <NavListItemLink href="/popover">Popover</NavListItemLink>
              <NavListItemLink href="/stack">Stack</NavListItemLink>
              <NavListItemLink href="/text">Text</NavListItemLink>
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
