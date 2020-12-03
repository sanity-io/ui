import {Box, Card, Container, Flex, Heading, Label, Stack, Text} from '@sanity/ui'
import React from 'react'
import styled from 'styled-components'
import {ArticleContent} from './articleContent'
import {getTOC} from './helpers'
import {TimeAgo} from '$components'

const HeroContainer = styled(Container)`
  @media (min-width: 800px) {
  }
`

export function Article({article}: {article?: any}) {
  const toc = article.content ? getTOC(article.content) : []
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
                  {article.content && <ArticleContent blocks={article.content} toc={toc} />}
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
                <Stack space={[2, 3, 4]}>
                  <Label>On this page</Label>
                  {toc.map((heading) => (
                    <Box key={heading.slug}>
                      <Text>
                        <a href={`#${heading.slug}`}>{heading.text}</a>
                      </Text>
                    </Box>
                  ))}
                </Stack>
              </Box>
            )}
          </Box>
        </Flex>
      )}
    </article>
  )
}
