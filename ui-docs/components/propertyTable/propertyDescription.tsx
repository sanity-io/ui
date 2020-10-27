import BlockContent from '@sanity/block-content-to-react'
import {Box, Heading, Text} from '@sanity/ui'
import React from 'react'

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

function BlockSerializer(props: any) {
  const {style = 'normal'} = props.node

  if (/^h\d/.test(style)) {
    // const level = style.replace(/[^\d]/g, '')
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

const serializers = {
  types: {
    block: BlockSerializer,
  },
}

export function PropertyDescription({blocks}: {blocks: any[]}) {
  return <BlockContent blocks={blocks} serializers={serializers} />
}
