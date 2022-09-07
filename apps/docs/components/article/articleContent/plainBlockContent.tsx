import BlockContent from '@sanity/block-content-to-react'
import {Box, Text} from '@sanity/ui'
import styled from 'styled-components'

function BlockSerializer(props: any) {
  // const {style = 'normal'} = props.node

  // if (style === 'blockquote') {
  //   return (
  //     <Box as="blockquote" marginY={[4, 4, 5]}>
  //       <Text as="p" muted size={[2, 2, 3]}>
  //         {props.children}
  //       </Text>
  //     </Box>
  //   )
  // }

  return (
    <Box marginY={[3, 3, 4]}>
      <Text as="p" muted size={[1, 1, 2]}>
        {props.children}
      </Text>
    </Box>
  )
}

const serializers = {
  block: BlockSerializer,
}

const Root = styled.div`
  & > .plain-block-content > *:first-child {
    margin-top: 0;
  }

  & > .plain-block-content > *:last-child {
    margin-bottom: 0;
  }
`

export function PlainBlockContent({blocks}: {blocks: any[]}) {
  return (
    <Root>
      <BlockContent
        blocks={blocks}
        className="plain-block-content"
        renderContainerOnSingleChild
        serializers={serializers}
      />
    </Root>
  )
}
