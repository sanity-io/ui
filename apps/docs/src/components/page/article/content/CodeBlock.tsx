import {Card, Code} from '@sanity/ui'
import {stegaClean} from 'next-sanity'

import {CodeData} from '@/lib/data'

export function CodeBlock(props: {data: CodeData}) {
  // Code must render (and copy) without stega metadata
  const value = stegaClean(props.data)

  return (
    <Card marginY={5} overflow="auto" padding={3} radius={2} shadow={1}>
      <Code language={value?.language || undefined} size={1}>
        {value?.code}
      </Code>
    </Card>
  )
}
