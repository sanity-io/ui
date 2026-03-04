import {
  PortableText,
  PortableTextBlockComponent,
  PortableTextReactComponents,
  PortableTextTypeComponent,
} from '@portabletext/react'
import {sanity, unwrapData, WrappedValue} from '@sanity/react-loader/jsx'
import {Box, Heading, Text} from '@sanity/ui'
import React from 'react'

import {SanityBlockValue} from '@/lib/sanity/types'

import {root} from './PlainContent.css'
import {vars} from '@sanity/ui/css'

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

  return (
    <Text muted size={1}>
      {children}
    </Text>
  )
}

const Span: PortableTextTypeComponent = (props) => {
  const marks = unwrapData(props.value.marks) as string[]

  let node = <sanity.span>{props.value.text}</sanity.span>

  if (marks.includes('italic')) {
    node = <em>{node}</em>
  }

  if (marks.includes('strong')) {
    node = <strong style={{fontWeight: vars.font.text.weight.semibold}}>{node}</strong>
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PlainContent({blocks}: {blocks: any[]}) {
  return (
    <div className={root} data-ui="PlainContent">
      <PortableText components={components} value={blocks} />
    </div>
  )
}
