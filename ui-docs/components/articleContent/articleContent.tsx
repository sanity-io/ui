import BlockContent from '@sanity/block-content-to-react'
import {Box, Card, Code, Heading, Text} from '@sanity/ui'
import React, {useMemo} from 'react'
import {CodeExample, PropertyTable} from '..'
import {blocksToText} from '../article/helpers'
import {LinkIcon} from '~/../icons/src'

export function ArticleContent({blocks, toc}: {blocks: any[]; toc: any}) {
  const serializers = useMemo(() => buildSerializers(toc), [toc])

  return <BlockContent blocks={blocks} serializers={serializers} />
}

function buildSerializers(toc: any) {
  function CodeSerializer(props: any) {
    return (
      <Card
        marginY={[2, 2, 3, 4]}
        padding={[3, 3, 4, 5]}
        radius={2}
        shadow={1}
        style={{overflow: 'auto'}}
      >
        <Code language={props.node.language} muted size={[2, 2, 3, 4]}>
          {props.node.code}
        </Code>
      </Card>
    )
  }

  function CodeExampleSerializer(props: any) {
    if (!props.node || !props.node.code) return null

    return (
      <CodeExample
        code={props.node.code.code}
        hookCode={props.node.hook?.code}
        language={props.node.code.language}
      />
    )
  }

  function PropertyTableSerializer(props: any) {
    const {node} = props

    if (!node) return null

    return <PropertyTable caption={node.caption} properties={node.properties || []} />
  }

  const headingProps = {
    h2: {
      box: {
        paddingTop: [4, 4, 5, 6],
        paddingBottom: [2, 2, 3, 4],
      },
      heading: {size: [1, 1, 2, 3]},
    },
    h3: {
      box: {
        paddingTop: [3, 3, 4, 5],
        paddingBottom: [2, 2, 3, 4],
      },
      heading: {size: [0, 0, 1, 2]},
    },
    h4: {
      box: {
        paddingTop: [2, 2, 3, 4],
        paddingBottom: [2, 2, 3, 4],
      },
      heading: {size: [0, 0, 0, 1]},
    },
  }

  const HEADER_RE = /^h\d/

  function BlockSerializer(props: any) {
    const {style = 'normal'} = props.node

    if (HEADER_RE.test(style)) {
      const text = blocksToText([props.node])
      const heading = toc && toc.find((t) => t.text === text)

      // const level = style.replace(/[^\d]/g, '')
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
        <Box as="blockquote" paddingY={4}>
          <Text muted size={[2, 2, 3, 4]}>
            {props.children}
          </Text>
        </Box>
      )
    }

    return (
      <Box paddingY={4}>
        <Text muted size={[2, 2, 3, 4]}>
          {props.children}
        </Text>
      </Box>
    )
  }

  return {
    types: {
      block: BlockSerializer,
      code: CodeSerializer,
      codeExample: CodeExampleSerializer,
      propertyTable: PropertyTableSerializer,
    },
  }
}
