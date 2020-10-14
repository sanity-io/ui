import {Card, Code} from '@sanity/ui'
import React from 'react'

export function CodeBlock(props: {children: React.ReactNode; language?: string}) {
  return (
    <Card padding={[3, 3, 4, 5]} radius={2} shadow={1} style={{overflow: 'auto'}}>
      <Code language={props.language || 'typescript'} size={[2, 2, 2, 3]}>
        {props.children}
      </Code>
    </Card>
  )
}
