'use client'

import * as icons from '@sanity/icons'
import * as v3 from '@sanity/ui3'
import * as v3_theme from '@sanity/ui3/theme'
import * as v4 from '@sanity/ui'
import * as v4_css from '@sanity/ui'
import * as v4_theme from '@sanity/ui'
import {Box, Card, Code, ErrorBoundary, Text} from '@sanity/ui'
import {useSearchParams} from 'next/navigation'
import React, {ReactElement, startTransition, useCallback, useEffect, useState} from 'react'

import {useApp} from '@/app/useApp'
import {isRecord} from '@/lib/common'
import {evalComponent, EvalComponentResult, ready as readyCheck} from '@/lib/ide'

export default function ArcadeFramePage(): ReactElement {
  const {version: defaultVersion} = useApp()
  const searchParams = useSearchParams()

  // Get the version from the query params
  const version = searchParams.get('version') || defaultVersion

  const [evalResult, setEvalResult] = useState<EvalComponentResult | null>(null)
  const [evalReady, setEvalReady] = useState(false)
  const [hookCode, setHookCode] = useState<string | null>(null)
  const [jsxCode, setJSXCode] = useState<string | null>(null)
  const [renderError, setRenderError] = useState<Error | null>(null)
  const [windowError, setWindowError] = useState<Error | null>(null)

  useEffect(() => {
    parent.postMessage({type: 'arcadeFrame/ready'}, location.origin)

    const handleMessage = (event: MessageEvent) => {
      const msg = event.data

      if (isRecord(msg)) {
        if (msg.type === 'arcadeFrame/input') {
          setJSXCode(msg.jsxCode as string)
          setHookCode(msg.hookCode as string)

          return
        }
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  useEffect(() => {
    if (!evalReady) return
    if (hookCode === null) return
    if (jsxCode === null) return

    startTransition(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const scope: Record<string, any> = {...icons, ...React, React}

      if (version === 'v3') {
        Object.assign(scope, v3_theme)
        Object.assign(scope, v3)
      }

      if (version === 'v4') {
        Object.assign(scope, v4_css)
        Object.assign(scope, v4_theme)
        Object.assign(scope, v4)
      }

      setEvalResult(evalComponent({hookCode, jsxCode, scope}))
    })
  }, [hookCode, jsxCode, evalReady, version])

  useEffect(() => {
    startTransition(() => {
      setRenderError(null)
      setWindowError(null)
    })
  }, [hookCode, jsxCode])

  useEffect(() => {
    readyCheck().then(() => setEvalReady(true))
  }, [])

  const handleCatch = useCallback((params: {error: Error; info: React.ErrorInfo}) => {
    params.error.stack = ''
    setRenderError(params.error)
  }, [])

  const errorMessage = evalResult?.type === 'error' && evalResult.error.message

  const renderErrorMessage = renderError?.message

  useEffect(() => {
    function handleWindowError(event: ErrorEvent) {
      setWindowError(event.error)

      // Attempt to prevent Next.js dev overlay from rendering
      // todo: make this work
      event.error.stack = null
      event.stopImmediatePropagation()
    }

    window.addEventListener('error', handleWindowError, true)

    return () => {
      window.removeEventListener('error', handleWindowError)
    }
  }, [setWindowError])

  return (
    <>
      <script async src="https://unpkg.com/@babel/standalone/babel.min.js" />

      {evalResult?.type === 'success' &&
        !renderError &&
        (version === 'v3' ? (
          <ErrorBoundary onCatch={handleCatch}>
            {version === 'v3' ? <V3Provider>{evalResult.node}</V3Provider> : evalResult.node}
          </ErrorBoundary>
        ) : (
          <Box height="fill" key={`${hookCode};${jsxCode}`}>
            <ErrorBoundary onCatch={handleCatch}>
              {version === 'v3' ? <V3Provider>{evalResult.node}</V3Provider> : evalResult.node}
            </ErrorBoundary>
          </Box>
        ))}

      {errorMessage && (
        <Card
          padding={4}
          overflow="auto"
          sizing="border"
          style={{minHeight: '100%'}}
          tone="critical"
        >
          <Code size={1}>{errorMessage}</Code>
        </Card>
      )}

      {renderErrorMessage && (
        <Card
          padding={4}
          overflow="auto"
          sizing="border"
          style={{minHeight: '100%'}}
          tone="critical"
        >
          {!windowError && <Text size={1}>An error occured while rendering</Text>}
          {windowError && <Text size={1}>{windowError.message}</Text>}
        </Card>
      )}
    </>
  )
}

function V3Provider({children}: {children: React.ReactNode}): ReactElement {
  return (
    <v3.ThemeProvider theme={v3.studioTheme}>
      <v3.ToastProvider>
        <v3.Card tone="default" style={{minHeight: '100%'}}>
          {children}
        </v3.Card>
      </v3.ToastProvider>
    </v3.ThemeProvider>
  )
}
