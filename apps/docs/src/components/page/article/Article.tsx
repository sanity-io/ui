'use client'

import {sanity, unwrapData, WrappedValue} from '@sanity/react-loader/jsx'
import {Box, Card, Container, Heading, Label, Stack} from '@sanity/ui'
import {ReactElement, useMemo} from 'react'

import {ArticleData} from '@/lib/data'
import {NavNode} from '@/lib/nav'

import {tocBox} from './Article.css'
import {ArticleHeadingsContext} from './ArticleHeadingsContext'
import {ArticleContent} from './content'
import {getHeadings} from './getHeadings'
import {getTOCTree} from './getToc'
import {HeadingsNav} from './HeadingsNav'
import {NavBreadcrumbs} from './NavBreadcrumbs'

export function Article(props: {
  article: WrappedValue<ArticleData>
  nav: NavNode | undefined
  slug: string[] | undefined
}): ReactElement {
  const {article, nav, slug} = props

  const headings = useMemo(
    () => getHeadings(unwrapData(article.content) as ArticleData['content']),
    [article],
  )

  const toc = useMemo(() => getTOCTree(headings), [headings])

  return (
    <Card display="flex" minHeight="full" tone="default" shadow={1}>
      <Box as="aside" className={tocBox} flex={1} maxWidth={0} style={{order: 2}}>
        <Box padding={5}>
          {toc.length > 0 && (
            <Stack gap={4}>
              <Label size={1}>On this page</Label>
              <HeadingsNav headings={toc} />
            </Stack>
          )}
        </Box>
      </Box>

      <Box
        as="article"
        flex={3}
        overflow="hidden"
        // style={{}}
        style={{containerType: 'inline-size', order: 1}}
      >
        {nav && (
          <Box flex={1} padding={4}>
            <Box padding={2}>
              <NavBreadcrumbs nav={nav} slug={slug} />
            </Box>
          </Box>
        )}

        <Container
          paddingX={[4, 5, 6]}
          paddingY={[6, 7, 8]}
          width={article.layout?.wide ? [3, 4] : [2, 3]}
          style={{containerType: 'inline-size'}}
        >
          <Box marginBottom={[5, 6]}>
            <Heading as="h1" size={[4, 5, 6]} weight="medium">
              {article.apiMember?.isComponent ? (
                // <code>
                //   &lt;<sanity.span>{article.title}</sanity.span> /&gt;
                // </code>
                <sanity.span>{article.title}</sanity.span>
              ) : article.apiMember?.isHook ? (
                // <code>
                //   <sanity.span>{article.title}</sanity.span>()
                // </code>
                <sanity.span>{article.title}</sanity.span>
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
    </Card>
  )
}
