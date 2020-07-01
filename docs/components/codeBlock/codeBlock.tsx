import {Card, Code} from '@sanity/ui'
import React from 'react'

export function CodeBlock(props: {children: React.ReactNode}) {
  return (
    <Card padding={3} radius={2} tone="contrast" style={{overflow: 'auto'}}>
      <Code>{props.children}</Code>
    </Card>
  )
}
