import {Box, Card, Code, ErrorBoundary} from '@sanity/ui'
import React from 'react'
import styled from 'styled-components'
import {JSXEvalResult} from './eval'

const Root = styled(Card)`
  height: 100%;
  overflow: auto;
`

export function Canvas({
  onCatch,
  padding,
  result,
}: {
  onCatch: (params: {error: Error; info: React.ErrorInfo}) => void
  padding?: number | number[]
  result: JSXEvalResult | null
}) {
  if (result && result.type === 'success') {
    return (
      <Root height="fill" padding={padding} sizing="border" tone="transparent">
        <ErrorBoundary onCatch={onCatch}>{result.node}</ErrorBoundary>
      </Root>
    )
  }

  if (result && result.type === 'error') {
    return (
      <Card height="fill" sizing="border" tone="critical">
        <Box padding={padding}>
          <Code>
            {result.error.name}: {result.error.message}
          </Code>
        </Box>
      </Card>
    )
  }

  return null
}
