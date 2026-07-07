import {unwrapData, WrappedValue} from '@sanity/react-loader/jsx'
import {Box} from '@sanity/ui'

import {CodeExampleData} from '@/lib/data'

import {CodeExample} from './CodeExample'

export function CodeExampleBlock(props: {data: WrappedValue<CodeExampleData>}) {
  const data = unwrapData(props.data)

  if (!data.code?.code) {
    return null
  }

  return (
    <Box marginY={4}>
      <CodeExample
        code={data.code.code}
        description={data.description || undefined}
        hookCode={data.hook?.code}
        title={data.title || undefined}
      />
    </Box>
  )
}
