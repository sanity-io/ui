import * as icons from '@sanity/icons'
import * as ui from '@sanity/ui'
import {Card, Code, ErrorBoundary, Text} from '@sanity/ui'
import React, {useCallback, useEffect, useState} from 'react'
import styled, {keyframes} from 'styled-components'
import {useApp} from '$components/app'
import {evalComponent, EvalComponentResult, ready as readyCheck} from '$lib/ide'
import {isRecord} from '$lib/types'

export default function ArcadeFrame() {
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
          setJSXCode(msg.jsxCode as any)
          setHookCode(msg.hookCode as any)

          return
        }

        if (msg.type === 'arcadeFrame/colorScheme') {
          setColorScheme(msg.colorScheme as any)
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

    setEvalResult(
      evalComponent({
        hookCode,
        jsxCode,
        scope: {...icons, ...ui, ...React, React, styled, keyframes},
      })
    )
  }, [hookCode, jsxCode, evalReady])

  useEffect(() => {
    setRenderError(null)
    setWindowError(null)
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
      // @todo: make this work
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
      {evalResult?.type === 'success' && !renderError && (
        <Card height="fill" key={`${hookCode};${jsxCode}`} tone="transparent">
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
          <Code>{errorMessage}</Code>
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
          {!windowError && <Text>An error occured while rendering</Text>}
          {windowError && <Text>{windowError.message}</Text>}
        </Card>
      )}
    </>
  )
}
