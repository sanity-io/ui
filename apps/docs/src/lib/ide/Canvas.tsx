import {Card, Code, ErrorBoundary} from '@sanity/ui'
import React, {ReactNode} from 'react'
import {styled} from 'styled-components'

import {EvalComponentResult} from './evalComponent'

const Root = styled(Card)`
  height: 100%;
  overflow: auto;
`

export function Canvas({
  onCatch,
  padding,
  result,
  shadow,
}: {
  onCatch: (params: {error: Error; info: React.ErrorInfo}) => void
  padding?: number | number[]
  result: EvalComponentResult | null
  shadow?: number | number[]
}): ReactNode {
  if (result && result.type === 'success') {
    return (
      <Root height="fill" shadow={shadow} sizing="border" tone="transparent">
        <ErrorBoundary onCatch={onCatch}>{result.node}</ErrorBoundary>
      </Root>
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
