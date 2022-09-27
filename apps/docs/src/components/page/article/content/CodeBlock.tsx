import {unwrapData, WrappedValue} from '@sanity/react-loader/jsx'
import {Card, Code} from '@sanity/ui'

import {CodeData} from '@/lib/data'

export function CodeBlock(props: {data: WrappedValue<CodeData>}) {
  const value = unwrapData(props.data)

  return (
    <Card marginY={5} overflow="auto" padding={3} radius={2} shadow={1}>
      <Code language={value?.language || undefined} size={1}>
        {value?.code}
      </Code>
    </Card>
  )
}
