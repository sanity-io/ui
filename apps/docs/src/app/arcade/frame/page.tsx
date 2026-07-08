'use client'

import * as icons from '@sanity/icons'
import * as ui from '@sanity/ui'
import {Card, Code, ErrorBoundary, Text} from '@sanity/ui'
import React, {ReactElement, useCallback, useEffect, useMemo, useState} from 'react'
import {keyframes, styled} from 'styled-components'

import {isRecord} from '@/lib/common'
import {Babel, evalComponent, EvalComponentResult, loadBabel} from '@/lib/ide'

import {useApp} from '../../useApp'

export default function ArcadeFrameRoute(): ReactElement {
  const {setColorScheme} = useApp()
  const [babel, setBabel] = useState<Babel | null>(null)
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

          // New input: clear errors from the previous code
          setRenderError(null)
          setWindowError(null)

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

  const evalResult = useMemo<EvalComponentResult | null>(() => {
    if (babel === null) return null
    if (hookCode === null) return null
    if (jsxCode === null) return null

    return evalComponent({
      babel,
      hookCode,
      jsxCode,
      scope: {...icons, ...ui, ...React, React, styled, keyframes},
    })
  }, [babel, hookCode, jsxCode])

  useEffect(() => {
    void loadBabel().then(setBabel)
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
      {evalResult?.type === 'success' && !renderError && (
        <Card height="fill" key={`${hookCode};${jsxCode}`}>
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
