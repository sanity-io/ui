'use client'

import {Icon, icons, type IconSymbol} from '@sanity/icons'
import * as ui from '@sanity/ui'
import {Card, ErrorBoundary, Text} from '@sanity/ui'
import * as uiAutocomplete from '@sanity/ui/autocomplete'
import * as uiBreadcrumbs from '@sanity/ui/breadcrumbs'
import * as uiCode from '@sanity/ui/code'
import {Code} from '@sanity/ui/code'
import * as uiMenu from '@sanity/ui/menu'
import * as uiPopover from '@sanity/ui/popover'
import * as uiToast from '@sanity/ui/toast'
import * as uiTooltip from '@sanity/ui/tooltip'
import React, {ReactElement, Suspense, useCallback, useEffect, useMemo, useState} from 'react'
import {keyframes, styled} from 'styled-components'

import {isRecord} from '@/lib/common'
import {Babel, evalComponent, EvalComponentResult, loadBabel} from '@/lib/ide'

// @sanity/icons v5 removed the per-icon barrel exports that
// `import * as icons` used to provide here. Rebuild the legacy `XxxIcon`
// names (e.g. `AddIcon`) for the eval scope so existing arcade snippets keep
// working. Each name renders the dynamic `Icon` component, which lazy-loads
// the icon inside its own `Suspense` boundary (with an svg-shell fallback).
const iconScope: Record<string, React.ComponentType> = Object.fromEntries(
  Object.keys(icons).map((symbol) => [
    `${symbol.replace(/(?:^|-)(\w)/g, (_, letter: string) => letter.toUpperCase())}Icon`,
    function ScopedIcon(props: Omit<React.ComponentProps<typeof Icon>, 'symbol'>) {
      return <Icon {...props} symbol={symbol as IconSymbol} />
    },
  ]),
)

export default function ArcadeFrameRoute(): ReactElement {
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
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  const evalResult = useMemo<EvalComponentResult | null>(() => {
    if (babel === null) return null
    if (hookCode === null) return null
    if (jsxCode === null) return null

    // The root barrel no longer exports the components that live on their own
    // entry points (so that it never references their heavy dependencies), but
    // arcade snippets should still have the full component set in scope.
    return evalComponent({
      babel,
      hookCode,
      jsxCode,
      scope: {
        Icon,
        icons,
        ...iconScope,
        ...ui,
        ...uiAutocomplete,
        ...uiBreadcrumbs,
        ...uiCode,
        ...uiMenu,
        ...uiPopover,
        ...uiToast,
        ...uiTooltip,
        ...React,
        React,
        styled,
        keyframes,
      },
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

  return (
    <>
      {evalResult?.type === 'success' && !renderError && (
        <Card height="fill" key={`${hookCode};${jsxCode}`}>
          <ErrorBoundary onCatch={handleCatch}>
            {/* Safety net for snippets that render the lazy `icons` map entries directly */}
            <Suspense fallback={null}>{evalResult.node}</Suspense>
          </ErrorBoundary>
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
