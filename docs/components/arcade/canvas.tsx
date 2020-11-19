import {Box, Card, Code, ErrorBoundary} from '@sanity/ui'
import React, {useEffect, useRef} from 'react'
import styled from 'styled-components'
import {EvalResult} from '$lib/eval'

const Root = styled(Card)`
  height: 100%;
  overflow: auto;

  /* [data-ui]:hover {
    outline: 1px solid #ccc;
  } */
`

export function Canvas({
  onCatch,
  result,
}: {
  onCatch: (params: {error: Error; info: React.ErrorInfo}) => void
  result: EvalResult | null
}) {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = rootRef.current

    const handleMouseOver = () => undefined

    // function handleMouseOver(event: MouseEvent) {
    //   console.log('mouseover', event)
    // }

    if (el) {
      el.addEventListener('mouseover', handleMouseOver)
    }

    return () => {
      if (el) {
        el.removeEventListener('mouseover', handleMouseOver)
      }
    }
  })

  if (result && result.type === 'success') {
    return (
      <Root ref={rootRef} tone="transparent">
        <ErrorBoundary onCatch={onCatch}>{result.node}</ErrorBoundary>
      </Root>
    )
  }

  if (result && result.type === 'error') {
    return (
      <Card height="fill" overflow="auto" tone="critical">
        <Box padding={4}>
          <Code>{result.error.message}</Code>
        </Box>
      </Card>
    )
  }

  return null
}
