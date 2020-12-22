import * as icons from '@sanity/icons'
import * as ui from '@sanity/ui'
import {Card, Code} from '@sanity/ui'
import React, {useEffect, useState} from 'react'
import {useApp} from '$components'
import {evalJSX, JSXEvalResult, ready as readyCheck, ScopeRenderer} from '$lib/ide'
import {isRecord} from '$lib/types'

export default function ArcadeFrame() {
  const {setColorScheme} = useApp()
  const [[hook, hookError], setHook] = useState<[Record<string, unknown> | null, Error | null]>([
    null,
    null,
  ])
  const [jsxResult, setJSXResult] = useState<JSXEvalResult | null>(null)
  const [evalReady, setEvalReady] = useState(false)
  const [hookCode, setHookCode] = useState('')
  const [jsxCode, setJSXCode] = useState('')

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

  // Evaluate JSX
  useEffect(() => {
    if (!evalReady) return
    setJSXResult(evalJSX(jsxCode, {...hook, ...icons, ...ui, React}))
  }, [jsxCode, hook, evalReady])

  useEffect(() => {
    readyCheck().then(() => setEvalReady(true))
  }, [])

  const errorMessage =
    (jsxResult?.type === 'error' && jsxResult.error.message) || hookError?.message

  return (
    <>
      <ScopeRenderer code={hookCode} key={hookCode} onChange={setHook} />

      {!errorMessage && jsxResult?.type === 'success' && (
        <Card style={{minHeight: '100%'}} tone="transparent">
          {jsxResult.node}
        </Card>
      )}

      {errorMessage && (
        <Card padding={4} sizing="border" style={{minHeight: '100%'}} tone="critical">
          <Code>{errorMessage}</Code>
        </Card>
      )}
    </>
  )
}
