import {Box} from '@sanity/ui'
import {stegaClean} from 'next-sanity'

import type {PortableTextValue} from '@/types'

import {CodeExample} from './CodeExample'

export function CodeExampleBlock(props: {
  data: Extract<PortableTextValue[number], {_type: 'codeExample'}>
}) {
  // Code must render (and copy) without stega metadata
  const data = stegaClean(props.data)

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
