import {Box, Heading, Text} from '@sanity/ui'
import {PortableText, PortableTextBlockComponent, PortableTextReactComponents} from 'next-sanity'
import {stegaClean} from 'next-sanity'
import {styled} from 'styled-components'

import {SanityBlockValue} from '@/lib/sanity/types'

const Root = styled.div`
  & > *:first-child {
    margin-top: 0;
  }

  & > *:last-child {
    margin-bottom: 0;
  }
`

const Block: PortableTextBlockComponent = (props) => {
  const {children, value} = props
  const block = value as unknown as SanityBlockValue
  const style = stegaClean(block.style)

  if (style === 'h1') {
    return (
      <Box marginTop={6} marginBottom={4}>
        <Heading as="h1" size={2}>
          {children}
        </Heading>
      </Box>
    )
  }

  if (style === 'h2') {
    return (
      <Box marginTop={6} marginBottom={4}>
        <Heading as="h2" size={1}>
          {children}
        </Heading>
      </Box>
    )
  }

  if (style === 'h3') {
    return (
      <Box marginTop={6} marginBottom={4}>
        <Heading as="h3" size={0}>
          {children}
        </Heading>
      </Box>
    )
  }

  return <Text muted>{children}</Text>
}

const components: Partial<PortableTextReactComponents> = {
  block: Block,
}

export function PlainContent({blocks}: {blocks: any[]}) {
  return (
    <Root data-ui="PlainContent">
      <PortableText components={components} value={blocks} />
    </Root>
  )
}
