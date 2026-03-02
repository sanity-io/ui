'use client'

import {sanity, unwrapData, WrappedValue} from '@sanity/react-loader/jsx'
import {Box, Container, Flex, Heading, Stack, Text} from '@sanity/ui'
import {ReactElement, useMemo} from 'react'

import {ArticleData} from '@/lib/data'

import {ArticleHeadingsContext} from './ArticleHeadingsContext'
import {ArticleContent} from './content'
import {getHeadings} from './getHeadings'
import {getTOCTree} from './getToc'
import {HeadingsNav} from './HeadingsNav'
import {tocBox} from './Article.css'

export function Article(props: {article: WrappedValue<ArticleData>}): ReactElement {
  const {article} = props

  const headings = useMemo(
    () => getHeadings(unwrapData(article.content) as ArticleData['content']),
    [article],
  )

  const toc = useMemo(() => getTOCTree(headings), [headings])

  return (
    <Flex>
      <Box as="aside" className={tocBox} flex={1} style={{order: 2, maxWidth: 300}}>
        <Box padding={[3, 3, 3, 4]}>
          {toc.length > 0 && (
            <Stack gap={4} padding={2}>
              <Text size={1}>On this page</Text>
              <HeadingsNav headings={toc} />
            </Stack>
          )}
        </Box>
      </Box>

      <Box as="article" flex={3} paddingX={[4, 5, 6]} paddingY={[5, 6]} style={{order: 1}}>
        <Container width={article.layout?.wide ? 2 : 1}>
          <Box marginBottom={[5, 5, 5, 6]}>
            <Heading as="h1" size={[2, 2, 3, 4, 5]}>
              {article.apiMember?.isComponent ? (
                <code>
                  &lt;<sanity.span>{article.title}</sanity.span> /&gt;
                </code>
              ) : article.apiMember?.isHook ? (
                <code>
                  <sanity.span>{article.title}</sanity.span>()
                </code>
              ) : (
                <sanity.span>{article.title}</sanity.span>
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
