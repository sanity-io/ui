import {Box, Label, Stack, Text} from '@sanity/ui'
import Link from 'next/link'
import {useRouter} from 'next/router'
import React from 'react'
import styled from 'styled-components'
import {atomRoutes, componentRoutes, hookRoutes, utilRoutes} from '~/routes'

const Root = styled(Box)`
  overflow: auto;
  height: 100vh;
  position: sticky;
  top: 0;
`

function NavLink(props: {children: React.ReactNode; href: string}) {
  const router = useRouter()

  if (props.href === router.asPath) {
    return <>{props.children}</>
  }

  return (
    <Link href={props.href}>
      <a>{props.children}</a>
    </Link>
  )
}

function UIPageHeaderLink({children, href}: {children: React.ReactNode; href: string}) {
  return (
    <Text as="li" size={[2, 2, 3]}>
      <NavLink href={href}>{children}</NavLink>
    </Text>
  )
}

export function UIPageHeader() {
  return (
    <Root data-name="UIPageHeader" forwardedAs="header">
      <Box as="nav" padding={[3, 4, 5]}>
        <Stack space={[5, 5, 6]}>
          <Stack space={[3, 3, 4]}>
            <Stack as="ul" space={[3, 3, 4]}>
              <UIPageHeaderLink href="/ui">Introduction</UIPageHeaderLink>
              <UIPageHeaderLink href="/ui/concepts">Concepts</UIPageHeaderLink>
              <UIPageHeaderLink href="/ui/theme">Theme</UIPageHeaderLink>
            </Stack>
          </Stack>

          <Stack space={[3, 3, 4]}>
            <Label as="h2" muted size={[2, 2, 3]}>
              Atoms
            </Label>
            <Stack as="ul" space={[3, 3, 4]}>
              {atomRoutes.map((route) => (
                <UIPageHeaderLink href={`/ui/atom/${route.slug}`} key={route.slug}>
                  {route.title}
                </UIPageHeaderLink>
              ))}
            </Stack>
          </Stack>

          <Stack space={[3, 3, 4]}>
            <Label as="h2" muted size={[2, 2, 3]}>
              Components
            </Label>
            <Stack as="ul" space={[3, 3, 4]}>
              {componentRoutes.map((route) => (
                <UIPageHeaderLink href={`/ui/component/${route.slug}`} key={route.slug}>
                  {route.title}
                </UIPageHeaderLink>
              ))}
            </Stack>
          </Stack>

          <Stack space={[3, 3, 4]}>
            <Label as="h2" muted size={[2, 2, 3]}>
              Hooks
            </Label>
            <Stack as="ul" space={[3, 3, 4]}>
              {hookRoutes.map((route) => (
                <UIPageHeaderLink href={`/ui/hook/${route.slug}`} key={route.slug}>
                  {route.title}
                </UIPageHeaderLink>
              ))}
            </Stack>
          </Stack>

          <Stack space={[3, 3, 4]}>
            <Label as="h2" muted size={[2, 2, 3]}>
              Utils
            </Label>
            <Stack as="ul" space={[3, 3, 4]}>
              {utilRoutes.map((route) => (
                <UIPageHeaderLink href={`/ui/util/${route.slug}`} key={route.slug}>
                  {route.title}
                </UIPageHeaderLink>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Root>
  )
}
