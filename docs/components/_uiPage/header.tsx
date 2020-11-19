import {Box, Button, Label, Stack} from '@sanity/ui'
import Link from 'next/link'
import {useRouter} from 'next/router'
import React from 'react'
import styled from 'styled-components'
import {atomRoutes, componentRoutes, hookRoutes, utilRoutes} from '$routes'

const Root = styled(Box).attrs({forwardedAs: 'header'})`
  height: 100vh;
  top: 0;
  position: sticky;
`

function NavLink(props: {children: React.ReactNode; href: string}) {
  const router = useRouter()

  return (
    <Link href={props.href}>
      <Button
        as="a"
        justify="flex-start"
        mode="bleed"
        padding={[1, 2, 3]}
        text={props.children}
        selected={props.href === router.asPath}
        size={[2, 2, 2, 3]}
      />
    </Link>
  )
}

export function UIPageHeader() {
  return (
    <Root data-name="UIPageHeader" overflow="auto">
      <Box as="nav" padding={[2, 3, 4]}>
        <Stack space={[5, 5, 6]}>
          <Stack space={1}>
            <NavLink href="/ui">Introduction</NavLink>
            <NavLink href="/ui/concepts">Concepts</NavLink>
            <NavLink href="/ui/theme">Theme</NavLink>
          </Stack>

          <Stack space={1}>
            <Box padding={[1, 2, 3]}>
              <Label as="h2" muted size={[2, 2, 3]}>
                Atoms
              </Label>
            </Box>

            {atomRoutes.map((route) => (
              <NavLink href={`/ui/atom/${route.slug}`} key={route.slug}>
                {route.title}
              </NavLink>
            ))}
          </Stack>

          <Stack space={1}>
            <Box padding={[1, 2, 3]}>
              <Label as="h2" muted size={[2, 2, 3]}>
                Components
              </Label>
            </Box>

            {componentRoutes.map((route) => (
              <NavLink href={`/ui/component/${route.slug}`} key={route.slug}>
                {route.title}
              </NavLink>
            ))}
          </Stack>

          <Stack space={1}>
            <Box padding={[1, 2, 3]}>
              <Label as="h2" muted size={[2, 2, 3]}>
                Hooks
              </Label>
            </Box>

            {hookRoutes.map((route) => (
              <NavLink href={`/ui/hook/${route.slug}`} key={route.slug}>
                {route.title}
              </NavLink>
            ))}
          </Stack>

          <Stack space={1}>
            <Box padding={[1, 2, 3]}>
              <Label as="h2" muted size={[2, 2, 3]}>
                Utils
              </Label>
            </Box>

            {utilRoutes.map((route) => (
              <NavLink href={`/ui/util/${route.slug}`} key={route.slug}>
                {route.title}
              </NavLink>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Root>
  )
}
