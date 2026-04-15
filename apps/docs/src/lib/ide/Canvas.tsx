import {Card, Code, ErrorBoundary} from '@sanity/ui'
import {ResponsiveProp} from '@sanity/ui'
import {Shadow, Space} from '@sanity/ui'
import React, {ReactNode} from 'react'

import {EvalComponentResult} from './evalComponent'

export function Canvas({
  onCatch,
  padding,
  result,
  shadow,
}: {
  onCatch: (params: {error: Error; info: React.ErrorInfo}) => void
  padding?: ResponsiveProp<Space>
  result: EvalComponentResult | null
  shadow?: ResponsiveProp<Shadow>
}): ReactNode {
  if (result && result.type === 'success') {
    return (
      <Card height="fill" overflow="auto" shadow={shadow} sizing="border">
        <ErrorBoundary onCatch={onCatch}>{result.node}</ErrorBoundary>
      </Card>
    )
  }

  if (result && result.type === 'error') {
    return (
      <Card
        height="fill"
        overflow="auto"
        padding={padding}
        shadow={shadow}
        sizing="border"
        tone="critical"
      >
        <Code size={1}>
          {result.error.name}: {result.error.message}
        </Code>
      </Card>
    )
  }

  return null
}
