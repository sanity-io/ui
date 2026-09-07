import {Box} from '@sanity/ui'
import {ReactElement} from 'react'

import {CodeExample} from './CodeExample'

export function CodeExampleBlock(props: {
  code: string
  description?: string
  hookCode?: string
  title?: string
}): ReactElement {
  const {code, description, hookCode, title} = props

  return (
    <Box marginY={4}>
      <CodeExample code={code} description={description} hookCode={hookCode} title={title} />
    </Box>
  )
}
