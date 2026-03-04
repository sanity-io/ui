'use client'

import {CloseIcon, MenuIcon} from '@sanity/icons'
import {WrappedValue} from '@sanity/react-loader/jsx'
import {Box, Button, Card, Flex} from '@sanity/ui'
import {ReactElement, useState} from 'react'

import {ArticleData} from '@/lib/data'
import {NavNode} from '@/lib/nav'

import {Nav} from './article/Nav'
import {Article} from './article'
import {breadcrumbsNavCard, navCard} from './ArticlePage.css'
import {NavBreadcrumbs} from './article/NavBreadcrumbs'

export function ArticlePage(props: {
  article?: WrappedValue<ArticleData>
  nav?: NavNode
  slug: string[] | undefined
}): ReactElement {
  const {article, nav, slug} = props

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <Card flex={1} style={{minHeight: 'auto'}} shadow={1}>
      {nav && (
        <Box
          className={breadcrumbsNavCard}
          data-ui="BreadcrumbsNavCard"
          paddingX={[2, 2, 3, 4]}
          paddingY={2}
          shadow={1}
        >
          <Flex align="center" gap={1}>
            <Box flex={1} padding={3}>
              <NavBreadcrumbs nav={nav} slug={slug} />
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
              <Nav nav={nav} path={`/${(slug ?? []).join('/')}`} />
            </Box>
          )}
        </Box>
      )}

      <Flex hidden={menuOpen}>
        {nav && (
          <Box className={navCard} flex={1} maxWidth={0} overflow="auto">
            <Box padding={4}>
              <Box padding={1}>
                <Nav nav={nav} path={`/${(slug ?? []).join('/')}`} />
              </Box>
            </Box>
          </Box>
        )}

        <Box flex={3}>{article && <Article nav={nav} slug={slug} article={article} />}</Box>
      </Flex>
    </Card>
  )
}
