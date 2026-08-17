'use client'

import {Box, Container, Flex, Heading, Stack, Text} from '@sanity/ui'
import {getTheme_v2} from '@sanity/ui/theme'
import {ReactElement, ReactNode} from 'react'
import {styled} from 'styled-components'

import {getTOCTree, type HeadingType} from './getToc'
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

const Content = styled.div`
  & > *:first-child {
    margin-top: 0;
  }

  & > *:last-child {
    margin-bottom: 0;
  }
`

export function Article(props: {
  children?: ReactNode
  headings?: HeadingType[]
  isComponent?: boolean
  isHook?: boolean
  title: string
  wide?: boolean
}): ReactElement {
  const {children, headings = [], isComponent, isHook, title, wide} = props

  const toc = getTOCTree(headings)

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
        <Container width={wide ? 2 : 1}>
          <Box marginBottom={[5, 5, 5, 6]}>
            <Heading as="h1" size={[2, 2, 3, 4, 5]}>
              {isComponent ? (
                <code>&lt;{title} /&gt;</code>
              ) : isHook ? (
                <code>{title}()</code>
              ) : (
                title
              )}
            </Heading>
          </Box>

          <Content>{children}</Content>
        </Container>
      </Box>
    </Flex>
  )
}
