import BlockContent from '@sanity/block-content-to-react'
import {Icon, LinkIcon} from '@sanity/icons'
import {Box, Card, Code, Flex, Heading, Stack, Text} from '@sanity/ui'
import React, {useMemo} from 'react'
import styled from 'styled-components'
import {sanity} from '../../../../config'
import {blocksToText, HeadingType, PlainBlockContent} from '../../../../lib/portable-text'
import {imageUrlBuilder} from '../../../../sanity'

export function ReleaseContent({
  blocks = [],
  headings = [],
}: {
  blocks?: unknown[]
  headings?: HeadingType[]
}) {
  const serializers = useMemo(() => buildSerializers(headings), [headings])

  return <BlockContent {...sanity} blocks={blocks || []} serializers={serializers} />
}

const CODE_LANGUAGES = {
  sh: 'bash',
}

const UList = styled(Stack).attrs({forwardedAs: 'ul'})`
  & > li {
    position: relative;

    & > span:first-child {
      display: block;
      left: -1em;
      width: 1em;
      top: -0.66em;
      display: block;
      position: absolute;

      &:before {
        content: '•';
        font-weight: 700;
      }
    }
  }
`

function buildSerializers(headings: HeadingType[]) {
  function CodeSerializer(props: any) {
    const language: 'sh' = props.node.language

    return (
      <Card marginY={[4, 4, 5]} overflow="auto" padding={4} radius={2} shadow={1}>
        <Code language={CODE_LANGUAGES[language] || language} muted>
          {props.node.code}
        </Code>
      </Card>
    )
  }

  const headingProps: any = {
    h2: {
      box: {
        marginTop: [5, 5, 6],
        marginBottom: [4, 4, 5],
      },
      heading: {size: [1, 1, 2, 3]},
    },
    h3: {
      box: {
        marginTop: [5, 5, 6],
        marginBottom: [4, 4, 5],
      },
      heading: {size: [0, 0, 1, 2]},
    },
    h4: {
      box: {
        marginTop: [5, 5, 6],
        marginBottom: [4, 4, 5],
      },
      heading: {size: [0, 0, 0, 1]},
    },
  }

  const HEADER_RE = /^h\d/

  function BlockSerializer(props: any) {
    const {style = 'normal'} = props.node

    if (HEADER_RE.test(style)) {
      const text = blocksToText([props.node])
      const heading = headings.find((t: any) => t.text === text)

      return (
        <Box {...headingProps[style].box} id={heading && heading.slug}>
          <Heading as={style} {...headingProps[style].heading}>
            {props.children}
            {heading && (
              <>
                &nbsp;&nbsp;
                <a href={`#${heading.slug}`}>
                  <LinkIcon />
                </a>
              </>
            )}
          </Heading>
        </Box>
      )
    }

    if (style === 'blockquote') {
      return (
        <Box as="blockquote" marginY={[4, 4, 5]}>
          <Text as="p" muted size={[2, 2, 3]}>
            {props.children}
          </Text>
        </Box>
      )
    }

    return (
      <Box marginY={[4, 4, 5]}>
        <Text as="p" muted size={[2, 2, 3]}>
          {props.children}
        </Text>
      </Box>
    )
  }

  function ListSerializer(props: any) {
    return (
      <Box marginY={[4, 4, 5]} paddingLeft={[4, 4, 5]}>
        <UList space={[3, 3, 4]}>{props.children}</UList>
      </Box>
    )
  }

  function ListItemSerializer(props: any) {
    return (
      <Text as="li" muted size={[2, 2, 3]}>
        <span />
        {props.children}
      </Text>
    )
  }

  function ImageSerializer(props: any) {
    if (!props.node) return null

    const src = imageUrlBuilder.image(props.node).url()

    if (!src) return null

    return (
      <Box as="figure" marginY={[4, 4, 5]}>
        <img alt={props.node.alt} src={src} style={{verticalAlign: 'top', width: '100%'}} />
        <Box marginTop={2}>
          <Text as="figcaption" muted size={1}>
            {props.node.caption}
          </Text>
        </Box>
      </Box>
    )
  }

  function CalloutSerializer(props: any) {
    if (!props.node) return null

    return (
      <Card marginY={[4, 4, 5]} padding={2} radius={2} tone={props.node.tone || 'transparent'}>
        <Flex>
          {props.node.icon && (
            <Box padding={3}>
              <Text muted>
                <Icon symbol={props.node.icon} />
              </Text>
            </Box>
          )}

          <Box flex={1} padding={3} paddingLeft={2}>
            <PlainBlockContent blocks={props.node.content || []} />
          </Box>
        </Flex>
      </Card>
    )
  }

  return {
    list: ListSerializer,
    listItem: ListItemSerializer,
    types: {
      block: BlockSerializer,
      callout: CalloutSerializer,
      code: CodeSerializer,
      image: ImageSerializer,
    },
  }
}
