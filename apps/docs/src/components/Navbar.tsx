'use client'
import {SanityMonogram} from '@sanity/logos'
import {Box, Button, Card, Flex, Text} from '@sanity/ui'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {ReactElement} from 'react'

import type {NavNode} from '#lib/nav/types.ts'

import {GitHubMark} from './assets'

/**
 * Which top-level entry is highlighted is URL data, so it cannot be part of
 * the App Shell every link shares. Reading it in a wrapper keeps the shell
 * with the whole navbar in it and lets only the highlight resolve per URL —
 * synchronously on a client navigation, streamed on a page load.
 */
export function NavbarWithActiveSegment({nav}: {nav: NavNode | null}): ReactElement {
  // `usePathname` excludes the `/ui` basePath, matching the nav tree hrefs
  return <Navbar nav={nav} activeSegment={usePathname().split('/').find(Boolean)} />
}

export function Navbar({
  nav,
  activeSegment,
}: {
  nav: NavNode | null
  activeSegment?: string
}): ReactElement {
  return (
    <Card flex="none" padding={[2, 2, 3, 4]} style={{lineHeight: 0}}>
      <Flex gap={1}>
        <Box flex="none">
          <Button as={Link} data-as="a" href="/" mode="bleed" padding={3} radius={2}>
            <Flex align="center" gap={[3, 3, 4]}>
              <Box flex="none">
                <Text size={[1, 1, 2]}>
                  <SanityMonogram style={{borderRadius: 3}} />
                </Text>
              </Box>

              <Box flex="none">
                <Text size={[1, 1, 2]} weight="bold" style={{color: 'var(--card-fg-color)'}}>
                  Sanity UI
                </Text>
              </Box>
            </Flex>
          </Button>
        </Box>

        {nav && (
          <Flex align="center" flex={1} gap={1}>
            {nav.children?.map((node) => {
              if (node.hidden) {
                return null
              }

              if (!node.href) {
                return null
              }

              return (
                <Button
                  as={Link}
                  data-as="a"
                  fontSize={[1, 1, 2]}
                  href={node.href}
                  key={node.href}
                  mode="bleed"
                  padding={3}
                  prefetch={true}
                  radius={2}
                  selected={node.segment === activeSegment}
                  style={{opacity: node.hidden ? 0.25 : undefined}}
                  text={node.title}
                />
              )
            })}
          </Flex>
        )}

        <Box flex="none" marginLeft={[1, 1, 2]}>
          <Button
            as="a"
            fontSize={[1, 1, 2]}
            href="https://github.com/sanity-io/ui/blob/main/MIGRATION.md"
            mode="bleed"
            padding={3}
            radius={2}
            rel="noopener noreferrer"
            target="_blank"
            text="Migrate to v4"
          />
        </Box>

        <Box marginLeft={[1, 1, 2]}>
          <Button
            aria-label="Open GitHub repository"
            as="a"
            fontSize={[1, 1, 2]}
            href="https://github.com/sanity-io/ui"
            icon={GitHubMark}
            mode="bleed"
            padding={3}
            radius={2}
            rel="noopener noreferrer"
            target="_blank"
          />
        </Box>
      </Flex>
    </Card>
  )
}
