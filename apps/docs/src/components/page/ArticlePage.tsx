'use client'

import {ChevronRightIcon, CloseIcon, MenuIcon} from '@sanity/icons'
import {sanity, WrappedValue} from '@sanity/react-loader/jsx'
import {Box, Breadcrumbs, Button, Card, Flex, Text} from '@sanity/ui'
import {getTheme_v2} from '@sanity/ui/theme'
import Link from 'next/link'
import {ReactElement, useState} from 'react'
import {styled} from 'styled-components'

import {ArticleData} from '@/lib/data'
import {NavNode} from '@/lib/nav'

import {Nav} from '../Nav'
import {Article} from './article'

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

export function ArticlePage(props: {
  article?: WrappedValue<ArticleData>
  nav?: NavNode
  path: string[]
}): ReactElement {
  const {article, nav, path} = props

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <Card flex={1} style={{minHeight: 'auto'}}>
      {nav && (
        <BreadcrumbsNavCard
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
                onClick={() => setMenuOpen((o) => !o)}
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
      )}

      <Flex hidden={menuOpen}>
        {nav && (
          <NavCard flex={1} overflow="auto">
            <Box padding={[2, 2, 3, 4]}>
              <Nav nav={nav} path={`/${path.join('/')}`} />
            </Box>
          </NavCard>
        )}

        <Box flex={3}>{article && <Article article={article} />}</Box>
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
      space={2}
    >
      {crumbs.map(({node: crumbNode, segment}, index) => (
        <Text key={segment} size={1} weight="medium">
          {index === 0 ? (
            <Link href={`/${crumbNode.segment}`} style={{color: 'inherit'}}>
              <sanity.span>{crumbNode.title}</sanity.span>
            </Link>
          ) : (
            <sanity.span>{crumbNode.title}</sanity.span>
          )}
        </Text>
      ))}
    </Breadcrumbs>
  )
}
