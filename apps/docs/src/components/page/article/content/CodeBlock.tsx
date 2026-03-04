import {unwrapData, WrappedValue} from '@sanity/react-loader/jsx'
import {Box, Code} from '@sanity/ui'

import {CodeData} from '@/lib/data'

export function CodeBlock(props: {data: WrappedValue<CodeData>}) {
  const value = unwrapData(props.data)

  return (
    <Box muted marginY={5} overflow="auto" padding={4} radius={4}>
      <Code language={value?.language || undefined} size={1}>
        {value?.code}
      </Code>
    </Box>
  )
}
