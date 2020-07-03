import {Card, Code} from '@sanity/ui'
import React from 'react'

export function CodeBlock(props: {children: React.ReactNode}) {
  return (
    <Card padding={3} radius={2} shadow={1} style={{overflow: 'auto'}}>
      <Code language="typescript">{props.children}</Code>
    </Card>
  )
}
