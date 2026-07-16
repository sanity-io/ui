'use client'

import {Box, Container, Flex, Heading, Stack, Text} from '@sanity/ui'
import {getTheme_v2} from '@sanity/ui/theme'
import {stegaClean} from 'next-sanity'
import {ReactElement, useMemo} from 'react'
import {styled} from 'styled-components'

import type {TargetByPathQueryResult} from '#sanity.types'

import {ArticleHeadingsContext} from './ArticleHeadingsContext'
import {ArticleContent} from './content'
import {getHeadings} from './getHeadings'
import {getTOCTree} from './getToc'
import {HeadingsNav} from './HeadingsNav'

const TocBox = styled(Box)((props) => {
  const {media} = getTheme_v2(props.theme)

  return {
    maxWidth: 260,
    height: '100vh',
    position: 'sticky',
    top: 0,

    [`@media (max-width: ${media[3] - 1}px)`]: {
      '&&:not([hidden])': {
        display: 'none',
      },
    },
  }
})

// @TODO pick the type with `article'` from union of TargetByPathQueryResult, without a ternary just pick in TS or something
// do not use extends
export function Article(props: {
  article: Extract<NonNullable<TargetByPathQueryResult>, {_type: 'article'}>
}): ReactElement {
  const {article} = props

  // Heading slugs are derived from the text, so strip stega metadata first
  const headings = useMemo(() => getHeadings(stegaClean(article.content)), [article])

  const toc = useMemo(() => getTOCTree(headings), [headings])

  return (
    <Flex>
      <TocBox forwardedAs="aside" flex={1} style={{order: 2, maxWidth: 300}}>
        <Box padding={[3, 3, 3, 4]}>
          {toc.length > 0 && (
            <Stack padding={2} gap={4}>
              <Text size={1}>On this page</Text>
              <HeadingsNav headings={toc} />
            </Stack>
          )}
        </Box>
      </TocBox>

      <Box as="article" flex={3} paddingX={[4, 5, 6]} paddingY={[5, 6]} style={{order: 1}}>
        <Container width={article.layout?.wide ? 2 : 1}>
          <Box marginBottom={[5, 5, 5, 6]}>
            <Heading as="h1" size={[2, 2, 3, 4, 5]}>
              {article.apiMember?.isComponent ? (
                <code>&lt;{article.title} /&gt;</code>
              ) : article.apiMember?.isHook ? (
                <code>{article.title}()</code>
              ) : (
                article.title
              )}
            </Heading>
          </Box>

          <ArticleHeadingsContext.Provider value={headings}>
            {article.content && <ArticleContent content={article.content} headings={headings} />}
          </ArticleHeadingsContext.Provider>
        </Container>
      </Box>
    </Flex>
  )
}
