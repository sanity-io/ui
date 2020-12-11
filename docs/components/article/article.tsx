import {Box, Card, Container, Flex, Heading, Label, Stack, Text} from '@sanity/ui'
import React, {useMemo} from 'react'
import styled from 'styled-components'
import {ArticleContent} from './articleContent'
import {getHeadings, getTOCTree} from './helpers'
import {HeadingNode} from './types'
import {TimeAgo} from '$components'

const HeroContainer = styled(Container)`
  @media (min-width: 800px) {
  }
`

export function Article({article}: {article?: any}) {
  const headings = useMemo(() => (article.content ? getHeadings(article.content) : []), [
    article.content,
  ])

  const toc = useMemo(() => getTOCTree(headings), [headings])

  const layout = article.layout || {}

  return (
    <article>
      {article && (
        <Flex>
          <Box flex={3}>
            <Box padding={[3, 4, 5]}>
              <Box marginBottom={[2, 3, 4]}>
                <HeroContainer width={2}>
                  <Heading as="h1" size={[2, 2, 3, 4]}>
                    {article.title}
                  </Heading>
                </HeroContainer>
              </Box>

              <Container width={2}>
                <Stack space={[4, 4, 5, 6]}>
                  {article.content && (
                    <ArticleContent blocks={article.content} headings={headings} />
                  )}
                </Stack>

                <Card borderTop marginTop={[3, 4, 5, 6]} paddingTop={[2, 3, 4]}>
                  {article._updatedAt && (
                    <Text muted size={[0, 1, 2]}>
                      Updated <TimeAgo date={article._updatedAt} />
                    </Text>
                  )}
                </Card>
              </Container>
            </Box>
          </Box>

          <Box display={['none', 'none', 'none', 'block']} flex={1} style={{maxWidth: '20rem'}}>
            {!layout.wide && toc.length > 0 && (
              <Box padding={[3, 4, 5]} style={{position: 'sticky', top: 0}}>
                <Label>On this page</Label>

                <Box marginTop={[2, 3, 4]}>
                  <HeadingList headings={toc} />
                </Box>
              </Box>
            )}
          </Box>
        </Flex>
      )}
    </article>
  )
}

function HeadingList({headings}: {headings: HeadingNode[]}) {
  return (
    <Stack space={4}>
      {headings.map((heading) => (
        <Box key={heading.slug}>
          <Text size={2 - (heading.level - 2)}>
            <a href={`#${heading.slug}`}>{heading.text}</a>
          </Text>

          {heading.level < 3 && heading.children.length > 0 && (
            <Box marginTop={4} paddingLeft={2}>
              <HeadingList headings={heading.children} />
            </Box>
          )}
        </Box>
      ))}
    </Stack>
  )
}
