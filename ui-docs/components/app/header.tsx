import {Box, Heading, Label, Stack, Text} from '@sanity/ui'
import Link from 'next/link'
import {useRouter} from 'next/router'
import React from 'react'
import styled from 'styled-components'

const Root = styled(Box)`
  height: 100%;
  position: sticky;
  top: 0;
`

function NavLink(props: {children: React.ReactNode; href: string}) {
  const router = useRouter()

  if (props.href === router.pathname) {
    return <>{props.children}</>
  }

  return (
    <Link href={props.href}>
      <a>{props.children}</a>
    </Link>
  )
}

export function AppHeader() {
  return (
    <Root forwardedAs="header">
      <Box as="nav" paddingX={[5]} paddingY={[5, 5, 6, 7, 8]}>
        <Stack space={5}>
          <Stack space={3}>
            <Heading size={1}>
              <code>@sanity/ui</code>
            </Heading>

            <a href="https://www.npmjs.com/package/@sanity/ui">
              <img src="https://img.shields.io/npm/v/@sanity/ui.svg?style=flat-square" />
            </a>
          </Stack>

          <Stack space={3}>
            <Stack as="ul" space={3}>
              <Text as="li">
                <NavLink href="/">Introduction</NavLink>
              </Text>
              <Text as="li">Concepts</Text>
              <Text as="li">Theme</Text>
            </Stack>
          </Stack>

          <Stack space={3}>
            <Label as="h2">Atoms</Label>
            <Stack as="ul" space={3}>
              <Text as="li">
                <NavLink href="/box">Box</NavLink>
              </Text>
              <Text as="li">
                <NavLink href="/button">Button</NavLink>
              </Text>
              <Text as="li">
                <NavLink href="/card">Card</NavLink>
              </Text>
              <Text as="li">
                <NavLink href="/checkbox">Checkbox</NavLink>
              </Text>
              <Text as="li">
                <NavLink href="/code">Code</NavLink>
              </Text>
              <Text as="li">
                <NavLink href="/container">Container</NavLink>
              </Text>
              <Text as="li">
                <NavLink href="/flex">Flex</NavLink>
              </Text>
              <Text as="li">
                <NavLink href="/icon">Icon</NavLink>
              </Text>
              <Text as="li">
                <NavLink href="/inline">Inline</NavLink>
              </Text>
              <Text as="li">
                <NavLink href="/popover">Popover</NavLink>
              </Text>
              <Text as="li">
                <NavLink href="/radio">Radio</NavLink>
              </Text>
              <Text as="li">
                <NavLink href="/stack">Stack</NavLink>
              </Text>
              <Text as="li">
                <NavLink href="/switch">Switch</NavLink>
              </Text>
              <Text as="li">
                <NavLink href="/text">Text</NavLink>
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Root>
  )
}
