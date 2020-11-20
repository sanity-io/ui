import {Box, Label, Stack} from '@sanity/ui'
// import Link from 'next/link'
// import {useRouter} from 'next/router'
import React from 'react'
import styled from 'styled-components'
import {NavLink} from '$components'
import {atomRoutes, componentRoutes, hookRoutes, utilRoutes} from '$routes'

const Root = styled(Box).attrs({forwardedAs: 'header'})`
  height: 100vh;
  top: 0;
  position: sticky;
`

export function UIPageHeader() {
  return (
    <Root data-name="UIPageHeader" overflow="auto">
      <Box as="nav" padding={[3, 4, 5]}>
        <Stack space={[5, 5, 6]}>
          <Stack space={[2, 3, 4]}>
            <NavLink href="/ui" size={[2, 2, 2, 3]}>
              Introduction
            </NavLink>
            <NavLink href="/ui/concepts" size={[2, 2, 2, 3]}>
              Concepts
            </NavLink>
            <NavLink href="/ui/theme" size={[2, 2, 2, 3]}>
              Theme
            </NavLink>
          </Stack>

          <Stack space={[2, 3, 4]}>
            <Label as="h2" size={[2, 2, 3]}>
              Atoms
            </Label>

            {atomRoutes.map((route) => (
              <NavLink href={`/ui/atom/${route.slug}`} key={route.slug} size={[2, 2, 2, 3]}>
                {route.title}
              </NavLink>
            ))}
          </Stack>

          <Stack space={[2, 3, 4]}>
            <Label as="h2" size={[2, 2, 3]}>
              Components
            </Label>

            {componentRoutes.map((route) => (
              <NavLink href={`/ui/component/${route.slug}`} key={route.slug} size={[2, 2, 2, 3]}>
                {route.title}
              </NavLink>
            ))}
          </Stack>

          <Stack space={[2, 3, 4]}>
            <Label as="h2" size={[2, 2, 3]}>
              Hooks
            </Label>

            {hookRoutes.map((route) => (
              <NavLink href={`/ui/hook/${route.slug}`} key={route.slug} size={[2, 2, 2, 3]}>
                {route.title}
              </NavLink>
            ))}
          </Stack>

          <Stack space={[2, 3, 4]}>
            <Label as="h2" size={[2, 2, 3]}>
              Utils
            </Label>

            {utilRoutes.map((route) => (
              <NavLink href={`/ui/util/${route.slug}`} key={route.slug} size={[2, 2, 2, 3]}>
                {route.title}
              </NavLink>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Root>
  )
}
