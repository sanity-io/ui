import {
  PortableText,
  PortableTextBlockComponent,
  PortableTextReactComponents,
  PortableTextTypeComponent,
} from '@portabletext/react'
import {sanity, unwrapData, WrappedValue} from '@sanity/react-loader/jsx'
import {Box, Heading, Text} from '@sanity/ui'
import React from 'react'
import styled from 'styled-components'

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
  const block = value as unknown as WrappedValue<SanityBlockValue>
  const style = unwrapData<string>(block.style)

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

const Span: PortableTextTypeComponent = (props) => {
  const marks = unwrapData(props.value.marks) as string[]

  let node = <sanity.span>{props.value.text}</sanity.span>

  if (marks.includes('italic')) {
    node = <em>{node}</em>
  }

  if (marks.includes('strong')) {
    node = <strong>{node}</strong>
  }

  if (marks.includes('code')) {
    node = <code>{node}</code>
  }

  return node
}

const components: Partial<PortableTextReactComponents> = {
  block: Block,
  types: {
    span: Span,
  },
}

export function PlainContent({blocks}: {blocks: any[]}) {
  return (
    <Root data-ui="PlainContent">
      <PortableText components={components} value={blocks} />
    </Root>
  )
}
