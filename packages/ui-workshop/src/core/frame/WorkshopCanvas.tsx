import {Box, Button, Card, Code, ErrorBoundary, Heading, Spinner, SrOnly, Stack} from '@sanity/ui'
import {createElement, Suspense, useCallback, useState} from 'react'

import type {WorkshopStory} from '../config/types'
import {useWorkshop} from '../useWorkshop'
import {formatStack} from './formatStack'

/** @internal */
export function WorkshopCanvas() {
  const {story} = useWorkshop()
  const [state, setState] = useState<{error: Error | null; errorInfo: React.ErrorInfo | null}>({
    error: null,
    errorInfo: null,
  })

  const catchError = useCallback(
    ({error, info: errorInfo}: {error: Error; info: React.ErrorInfo}) => {
      setState({error, errorInfo})
    },
    [],
  )

  const handleRetry = useCallback(() => {
    setState({error: null, errorInfo: null})
  }, [])

  if (!story) {
    return <></>
  }

  if (state.error) {
    return (
      <Card as="main" height="fill" overflow="auto" tone="critical">
        <ErrorScreen error={state.error} errorInfo={state.errorInfo} onRetry={handleRetry} />
      </Card>
    )
  }

  return (
    <>
      <title>{story.title}</title>

      <Suspense fallback={<LoadingScreen story={story} />}>
        <Box as="main" height="fill">
          <SrOnly>
            <h1>{story.title}</h1>
          </SrOnly>

          <ErrorBoundary onCatch={catchError}>{createElement(story.component)}</ErrorBoundary>
        </Box>
      </Suspense>
    </>
  )
}

function LoadingScreen(props: {story: WorkshopStory}) {
  const {story} = props

  return (
    <Box alignItems="center" as="main" display="flex" height="fill" justifyContent="center">
      <SrOnly>
        <h1>
          Loading <em>{story.title}</em>…
        </h1>
      </SrOnly>

      <Spinner />
    </Box>
  )
}

function ErrorScreen(props: {
  error: Error
  errorInfo: React.ErrorInfo | null
  onRetry: () => void
}) {
  const {error, errorInfo, onRetry} = props

  return (
    <Box as="main" padding={4}>
      <Stack gap={4}>
        <Heading as="h1" size={[1, 1, 2]}>
          {error.message}
        </Heading>
        <Box>
          <Button text="Retry" onClick={onRetry} />
        </Box>
        {error.stack && <Code size={1}>{formatStack(error.stack)}</Code>}
        {errorInfo?.componentStack && (
          <Code size={1}>{'Component stack:' + formatStack(errorInfo.componentStack)}</Code>
        )}
      </Stack>
    </Box>
  )
}
