'use client'

import * as icons from '@sanity/icons'
import * as ui from '@sanity/ui'
import * as css from '@sanity/ui/css'
import * as theme from '@sanity/ui/theme'
import {Card, Code, ErrorBoundary, Text} from '@sanity/ui'
import React, {ReactElement, startTransition, useCallback, useEffect, useState} from 'react'

import {isRecord} from '@/lib/common'
import {evalComponent, EvalComponentResult, ready as readyCheck} from '@/lib/ide'

import {useApp} from '../../useApp'
import {ColorScheme} from '@sanity/ui/theme'

export default function ArcadeFramePage(_props: PageProps<'/arcade/frame'>): ReactElement {
  const {setColorScheme} = useApp()
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

        if (msg.type === 'arcadeFrame/colorScheme') {
          setColorScheme(msg.colorScheme as ColorScheme)
        }
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [setColorScheme])

  useEffect(() => {
    if (!evalReady) return
    if (hookCode === null) return
    if (jsxCode === null) return

    startTransition(() => {
      setEvalResult(
        evalComponent({
          hookCode,
          jsxCode,
          scope: {...css, ...icons, ...theme, ...ui, ...React, React},
        }),
      )
    })
  }, [hookCode, jsxCode, evalReady])

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

      {evalResult?.type === 'success' && !renderError && (
        <Card height="fill" key={`${hookCode};${jsxCode}`} tone="default">
          <ErrorBoundary onCatch={handleCatch}>{evalResult.node}</ErrorBoundary>
        </Card>
      )}

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
