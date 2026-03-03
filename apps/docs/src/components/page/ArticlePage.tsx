'use client'

import {ChevronRightIcon, CloseIcon, MenuIcon} from '@sanity/icons'
import {sanity, WrappedValue} from '@sanity/react-loader/jsx'
import {Box, Breadcrumbs, Button, Card, Flex, Text} from '@sanity/ui'
import Link from 'next/link'
import {ReactElement, useState} from 'react'

import {ArticleData} from '@/lib/data'
import {NavNode} from '@/lib/nav'

import {Nav} from '../Nav'
import {Article} from './article'
import {breadcrumbsNavCard, navCard} from './ArticlePage.css'

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
        <Card
          className={breadcrumbsNavCard}
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
              <Nav nav={nav} path={`/${path.join('/')}`} />
            </Box>
          )}
        </Card>
      )}

      <Flex hidden={menuOpen}>
        {nav && (
          <Card className={navCard} flex={1} overflow="auto">
            <Box padding={[2, 2, 3, 4]}>
              <Nav nav={nav} path={`/${path.join('/')}`} />
            </Box>
          </Card>
        )}

        <Box flex={3}>{article && <Article article={article} />}</Box>
      </Flex>
    </Card>
  )
}

function NavBreadcrumbs(props: {nav: NavNode; path: string[]}) {
  const {nav, path} = props

  const breadcrumbItems = _getBreadcrumbItems(nav, path)

  return (
    <Breadcrumbs
      separator={
        <Text muted size={1}>
          <ChevronRightIcon />
        </Text>
      }
      gap={2}
    >
      {breadcrumbItems.map(({node, segment, index}) => (
        <Text key={segment} size={1} weight="medium">
          {index === 0 ? (
            <Link href={`/${node.segment}`} style={{color: 'inherit'}}>
              <sanity.span>{node.title}</sanity.span>
            </Link>
          ) : (
            <sanity.span>{node.title}</sanity.span>
          )}
        </Text>
      ))}
    </Breadcrumbs>
  )
}

function _getBreadcrumbItems(
  nav: NavNode,
  path: string[],
): {node: NavNode; segment: string; index: number}[] {
  const items = []

  const len = path.length

  let node: NavNode | undefined = nav

  for (let index = 0; index < len; index += 1) {
    const segment = path[index]

    if (index > 0) {
      node = node?.children?.find((child) => child.segment === segment)
    }

    if (!node) {
      break
    }

    items.push({
      node,
      segment,
      index,
    })
  }

  return items
}
