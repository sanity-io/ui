'use client'

import {ChevronRightIcon} from '@sanity/icons/ChevronRight'
import {CloseIcon} from '@sanity/icons/Close'
import {MenuIcon} from '@sanity/icons/Menu'
import {Box, Button, Card, Flex, Text} from '@sanity/ui'
import {Breadcrumbs} from '@sanity/ui/breadcrumbs'
import {getTheme_v2} from '@sanity/ui/theme'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useState} from 'react'
import {styled} from 'styled-components'

import type {NavNode} from '#lib/nav/types.ts'

import {Nav} from './Nav'

const NavCard = styled(Card)((props) => {
  const {media} = getTheme_v2(props.theme)

  return {
    maxWidth: 260,
    height: '100vh',
    position: 'sticky',
    top: 0,

    [`@media (max-width: ${media[1] - 1}px)`]: {
      '&&:not([hidden])': {
        display: 'none',
      },
    },
  }
})

const BreadcrumbsNavCard = styled(Card)((props) => {
  const {media} = getTheme_v2(props.theme)

  return {
    position: 'sticky',
    top: 0,
    zIndex: 100,

    [`@media (min-width: ${media[1]}px)`]: {
      '&&:not([hidden])': {
        display: 'none',
      },
    },
  }
})

export function ArticleLayout({children, nav}: {children: React.ReactNode; nav?: NavNode}) {
  const [menuOpen, setMenuOpen] = useState(false)

  // `usePathname` excludes the `/ui` basePath, matching the nav tree hrefs
  const pathname = usePathname()
  const path = pathname.split('/').filter(Boolean)

  return (
    <Card flex={1} style={{minHeight: 'auto'}}>
      {nav && (
        <BreadcrumbsNavCard
          data-ui="BreadcrumbsNavCard"
          paddingX={[2, 2, 3, 4]}
          paddingY={2}
          shadow={1}
        >
          <Flex align="center" gap={1}>
            <Box flex={1} padding={3}>
              <NavBreadcrumbs nav={nav} path={path} />
            </Box>
            <Box flex="none">
              <Button
                fontSize={1}
                icon={menuOpen ? CloseIcon : MenuIcon}
                mode="bleed"
                onClick={() => setMenuOpen((o) => !o)}
                padding={3}
              />
            </Box>
          </Flex>

          {menuOpen && (
            <Box marginTop={2}>
              <Nav nav={nav} path={pathname} />
            </Box>
          )}
        </BreadcrumbsNavCard>
      )}

      <Flex hidden={menuOpen}>
        {nav && (
          <NavCard flex={1} overflow="auto">
            <Box padding={[2, 2, 3, 4]}>
              <Nav nav={nav} path={pathname} />
            </Box>
          </NavCard>
        )}

        <Box flex={3}>{children}</Box>
      </Flex>
    </Card>
  )
}

function NavBreadcrumbs(props: {nav: NavNode; path: string[]}) {
  const {nav, path} = props

  // Resolve the nav node for each path segment up front, so that no variable
  // is reassigned from within the JSX below (the React Compiler cannot prove
  // that a callback which reassigns an outer variable runs during render)
  const crumbs: {node: NavNode; segment: string}[] = []

  let node: NavNode | undefined = nav

  for (const [index, segment] of path.entries()) {
    if (index > 0) {
      node = node?.children?.find((child) => child.segment === segment)
    }

    if (!node) break

    crumbs.push({node, segment})
  }

  return (
    <Breadcrumbs
      separator={
        <Text muted size={1}>
          <ChevronRightIcon />
        </Text>
      }
      gap={2}
    >
      {crumbs.map(({node: crumbNode, segment}, index) => (
        <Text key={segment} size={1} weight="medium">
          {index === 0 ? (
            <Link href={`/${crumbNode.segment}`} prefetch={true} style={{color: 'inherit'}}>
              {crumbNode.title}
            </Link>
          ) : (
            crumbNode.title
          )}
        </Text>
      ))}
    </Breadcrumbs>
  )
}
