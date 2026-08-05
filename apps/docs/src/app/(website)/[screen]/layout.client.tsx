'use client'

import {ChevronRightIcon} from '@sanity/icons/ChevronRight'
import {CloseIcon} from '@sanity/icons/Close'
import {MenuIcon} from '@sanity/icons/Menu'
import {Box, Button, Breadcrumbs, Card, Flex, Text} from '@sanity/ui'
import {getTheme_v2} from '@sanity/ui/theme'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {Suspense, useState} from 'react'
import {styled} from 'styled-components'

import type {NavNode} from '#lib/nav/types.ts'

import {Nav} from '../../../components/Nav'

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

const BreadcrumbsNavCard = styled(Card)<{$menuOpen: boolean}>((props) => {
  // const {$menuOpen} = props

  const {media} = getTheme_v2(props.theme)

  return {
    // ...($menuOpen
    //   ? {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    //   }
    // : undefined),

    [`@media (min-width: ${media[1]}px)`]: {
      '&&:not([hidden])': {
        display: 'none',
      },
    },
  }
})

/**
 * Which screen's nav branch to show is URL data, so the two nav regions read
 * the pathname behind their own `<Suspense>` boundaries. `children` and the
 * frame stay outside, in the App Shell every link into the section shares.
 */
export function ArticleLayout({
  children,
  nav: root,
}: {
  children: React.ReactNode
  nav: NavNode | null
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <Card flex={1} style={{minHeight: 'auto'}}>
      <Suspense>
        <BreadcrumbsNav menuOpen={menuOpen} onToggleMenu={setMenuOpen} root={root} />
      </Suspense>

      <Flex hidden={menuOpen}>
        <Suspense>
          <SidebarNav root={root} />
        </Suspense>

        <Box flex={3}>{children}</Box>
      </Flex>
    </Card>
  )
}

/**
 * The nav branch for the screen in the current URL, or `undefined` for screens
 * that have no entries of their own (the arcade) — the same branch this used
 * to take from the screen document's type.
 */
function useSectionNav(root: NavNode | null) {
  // `usePathname` excludes the `/ui` basePath, matching the nav tree hrefs
  const screen = usePathname().split('/').find(Boolean)
  const section = root?.children?.find((item) => item.segment === screen)
  return {
    nav: section?.children?.length ? section : undefined,
    // The nav has only ever highlighted the screen, not the current article
    path: screen ? [screen] : [],
  }
}

function SidebarNav({root}: {root: NavNode | null}) {
  const {nav, path} = useSectionNav(root)
  if (!nav) return null

  return (
    <NavCard data-testid="article-sidebar-nav" flex={1} overflow="auto">
      <Box padding={[2, 2, 3, 4]}>
        <Nav nav={nav} path={`/${path.join('/')}`} />
      </Box>
    </NavCard>
  )
}

function BreadcrumbsNav({
  menuOpen,
  onToggleMenu,
  root,
}: {
  menuOpen: boolean
  onToggleMenu: (update: (open: boolean) => boolean) => void
  root: NavNode | null
}) {
  const {nav, path} = useSectionNav(root)
  if (!nav) return null

  return (
    <BreadcrumbsNavCard
      data-testid="article-breadcrumbs-nav"
      data-ui="BreadcrumbsNavCard"
      $menuOpen={menuOpen}
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
            onClick={() => onToggleMenu((open) => !open)}
            padding={3}
          />
        </Box>
      </Flex>

      {menuOpen && (
        <Box marginTop={2}>
          <Nav nav={nav} path={`/${path.join('/')}`} />
        </Box>
      )}
    </BreadcrumbsNavCard>
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
