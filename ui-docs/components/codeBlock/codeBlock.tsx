import {Card, Code} from '@sanity/ui'
import React from 'react'

export function CodeBlock(props: {children: React.ReactNode}) {
  return (
    <Card padding={[3, 3, 4, 5]} radius={2} shadow={1} style={{overflow: 'auto'}}>
      <Code language="typescript" size={[2, 2, 2, 3]}>
        {props.children}
      </Code>
    </Card>
  )
}
