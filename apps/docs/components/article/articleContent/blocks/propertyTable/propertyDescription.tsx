import BlockContent from '@sanity/block-content-to-react'
import {Box, BoxProps, Heading, HeadingProps, Text} from '@sanity/ui'
import {isRecord, isString} from '$lib/types'

const headingProps: {
  [key: string]: {box: Omit<BoxProps, 'as'>; heading: Omit<HeadingProps, 'as'>} | undefined
} = {
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

function BlockSerializer(props: Record<string, unknown>) {
  const node: Record<string, unknown> = isRecord(props.node) ? props.node : {}
  const style = isString(node.style) ? node.style : 'normal'

  if (/^h\d/.test(style)) {
    // const level = style.replace(/[^\d]/g, '')
    const styleProps = headingProps[style] || {box: {}, heading: {}}

    return (
      <Box {...styleProps.box}>
        <Heading as={style as any} {...styleProps.heading}>
          {props.children as any}
        </Heading>
      </Box>
    )
  }

  if (style === 'blockquote') {
    return (
      <Box as="blockquote" paddingY={4}>
        <Text muted size={[2, 2, 3, 4]}>
          {props.children as any}
        </Text>
      </Box>
    )
  }

  return (
    <Box paddingY={4}>
      <Text muted size={[2, 2, 3, 4]}>
        {props.children as any}
      </Text>
    </Box>
  )
}

const serializers = {
  types: {
    block: BlockSerializer,
  },
}

export function PropertyDescription({blocks}: {blocks: unknown[]}) {
  return <BlockContent blocks={blocks} serializers={serializers} />
}
