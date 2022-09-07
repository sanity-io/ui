import BlockContent from '@sanity/block-content-to-react'
import {Box, Card, Code, Heading, Text} from '@sanity/ui'
import {useMemo} from 'react'
import {sanity} from '$config'

const CODE_LANGUAGES = {
  sh: 'bash',
  tsx: 'typescript',
  ts: 'typescript',
}

export function CommentContent({blocks}: {blocks: unknown[]}) {
  const serializers = useMemo(() => buildSerializers(), [])

  return <BlockContent {...sanity} blocks={blocks} serializers={serializers} />
}

function buildSerializers() {
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
      return (
        <Box {...headingProps[style].box}>
          <Heading as={style} {...headingProps[style].heading}>
            {props.children}
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

  return {
    types: {
      block: BlockSerializer,
      code: CodeSerializer,
    },
  }
}
