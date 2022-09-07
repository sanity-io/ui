import {Box, Container, Flex, Label} from '@sanity/ui'
import {useMemo} from 'react'
import styled from 'styled-components'
import {ReferenceArticleContent} from './content/resolveContent'
import {getHeadings} from './content/resolveHeadings'
import {HeadingList} from '$components/article'
import {getTOCTree} from '$lib/portable-text'

const TOCNavBox = styled(Box)`
  min-width: 12em;
  max-width: 22rem;
`

export function ReferenceArticle(props: any) {
  const {data} = props
  const headings = useMemo(() => getHeadings(data), [data])
  const toc = useMemo(() => getTOCTree(headings), [headings])

  return (
    <article>
      <Flex>
        <Box flex={3}>
          <Box paddingX={[3, 4, 5]} paddingY={[4, 5, 5, 5, 6, 7]}>
            <Container width={1}>
              <ReferenceArticleContent data={data} />
            </Container>
          </Box>
        </Box>

        <TOCNavBox display={['none', 'none', 'none', 'block']} flex={1}>
          {toc.length > 0 && (
            <Box padding={[3, 4, 5]} style={{position: 'sticky', top: 0}}>
              <Label>On this page</Label>

              <Box marginTop={[2, 3, 4]}>
                <HeadingList headings={toc} />
              </Box>
            </Box>
          )}
        </TOCNavBox>
      </Flex>
    </article>
  )
}
