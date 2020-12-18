import * as icons from '@sanity/icons'
import * as ui from '@sanity/ui'
import {
  Button,
  Card,
  Code,
  Container,
  Flex,
  Inline,
  PortalProvider,
  Tab,
  TabList,
  TabPanel,
  useTheme,
} from '@sanity/ui'
import {debounce, DebouncedFunc} from 'lodash'
import {useRouter} from 'next/router'
import qs from 'qs'
import React, {useEffect, useRef, useState} from 'react'
import {
  AsyncCodeEditor,
  Canvas,
  Cursor,
  evalJSX,
  JSXEvalResult,
  ready as readyCheck,
  ScopeRenderer,
} from '$lib/ide'
import {decode, encode} from '$lib/zlib'

type ContainerWidth = number | 'auto'

export const DEFAULT_CODE = `<Card padding={6} sizing="border">
  <Inline space={2}>
    <Button
      icon={ComposeIcon}
      text="Compose"
      tone="primary"
    />
    <Button icon={PlayIcon} mode="ghost" text="Run" />
  </Inline>
</Card>
`

function tryDecode(encoded: unknown) {
  if (typeof encoded === 'string') {
    try {
      return decode(encoded)
    } catch (err) {
      console.error(err)
    }
  }

  return null
}

interface ArcadeQueryParams {
  mode?: 'jsx' | 'hook'
  jsx: string
  hook?: string
  width?: ContainerWidth
}

export function getArcadeQuery(params: ArcadeQueryParams) {
  const query: Record<string, string> = {mode: params.mode || 'jsx'}

  if (params.width !== undefined && params.width !== 'auto') query.width = String(params.width)
  if (params.jsx) query.jsx = encode(params.jsx)
  if (params.hook) query.hook = encode(params.hook)

  return query
}

type SaveFn = (params: ArcadeQueryParams) => void

export function ArcadeScreen() {
  const [[hook, hookError], setHook] = useState<[Record<string, unknown> | null, Error | null]>([
    null,
    null,
  ])
  const [ready, setReady] = useState(false)
  const {replace: replaceState} = useRouter()
  const [jsxCode, setJSXCode] = useState('')
  const [jsxResult, setJSXResult] = useState<JSXEvalResult | null>(null)
  const [jsxCursor, setJSXCursor] = useState({line: 0, column: 0})
  const [hookCode, setHookCode] = useState('')
  const [hookCursor, setHookCursor] = useState({line: 0, column: 0})
  const [canvasWidth, setCanvasWidth] = useState<ContainerWidth>('auto')
  const [codeMode, setCodeMode] = useState<'jsx' | 'hook'>('jsx')
  const saveFnRef = useRef<DebouncedFunc<SaveFn> | null>(null)

  useEffect(() => {
    readyCheck().then(() => {
      setReady(true)
    })
  }, [])

  // Create `saveFn` callback
  useEffect(() => {
    const saveFn = debounce((params: ArcadeQueryParams) => {
      replaceState({
        pathname: '/arcade',
        query: getArcadeQuery(params),
      })
    }, 100)

    saveFnRef.current = saveFn

    return () => saveFn.cancel()
  }, [replaceState])

  // Evaluate JSX
  useEffect(() => {
    if (!ready) return
    setJSXResult(evalJSX(jsxCode, {...hook, ...icons, ...ui, React}))
  }, [jsxCode, hook, ready])

  // Trigger save callback
  useEffect(() => {
    const saveFn = saveFnRef.current

    if (saveFn) {
      saveFn({mode: codeMode, jsx: jsxCode, hook: hookCode, width: canvasWidth})
    }
  }, [codeMode, jsxCode, hookCode, canvasWidth])

  // Load saved state from URL
  useEffect(() => {
    const query = qs.parse(window.location.search.slice(1))

    setCodeMode((query.mode as any) || 'jsx')
    setHookCode(tryDecode(query.hook) || 'return {}\n')
    setJSXCode(tryDecode(query.jsx) || DEFAULT_CODE)
    setCanvasWidth(query.width === undefined ? 'auto' : (Number(query.width) as any))
  }, [])

  return (
    <Flex height="fill">
      <ScopeRenderer code={hookCode} key={hookCode} onChange={setHook} />

      <Card flex={1} tone={jsxResult && jsxResult.type === 'error' ? 'critical' : 'default'}>
        <CanvasPane
          onCatch={() => undefined}
          onWidthChange={setCanvasWidth}
          result={jsxResult}
          width={canvasWidth}
        />
      </Card>

      <Card borderLeft flex={1}>
        <CodePane
          jsxCode={jsxCode}
          jsxCursor={jsxCursor}
          jsxResult={jsxResult}
          mode={codeMode}
          onJSXCodeChange={setJSXCode}
          onJSXCursorChange={setJSXCursor}
          onModeChange={setCodeMode}
          onHookCodeChange={setHookCode}
          onHookCursorChange={setHookCursor}
          hookCode={hookCode}
          hookCursor={hookCursor}
          hookError={hookError}
        />
      </Card>
    </Flex>
  )
}

function CanvasPane(props: {
  onCatch: (params: {error: Error; info: React.ErrorInfo}) => void
  onWidthChange: (v: ContainerWidth) => void
  result: JSXEvalResult | null
  width: ContainerWidth
}) {
  const theme = useTheme()
  const {onCatch, onWidthChange, result, width} = props
  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null)

  return (
    <Flex direction="column" height="fill">
      <Card borderBottom paddingX={4} paddingY={2} style={{textAlign: 'center', minHeight: 'auto'}}>
        <Inline space={[1, 1, 2]}>
          <Button
            fontSize={1}
            mode="bleed"
            onClick={() => onWidthChange('auto')}
            padding={2}
            selected={width === 'auto'}
            style={{verticalAlign: 'top'}}
            text="Auto"
          />
          <Button
            fontSize={1}
            mode="bleed"
            onClick={() => onWidthChange(2)}
            padding={2}
            selected={width === 2}
            style={{verticalAlign: 'top'}}
            text={`${theme.sanity.container[2]}px`}
          />
          <Button
            fontSize={1}
            mode="bleed"
            onClick={() => onWidthChange(1)}
            padding={2}
            selected={width === 1}
            style={{verticalAlign: 'top'}}
            text={`${theme.sanity.container[1]}px`}
          />
          <Button
            fontSize={1}
            mode="bleed"
            onClick={() => onWidthChange(0)}
            padding={2}
            selected={width === 0}
            style={{verticalAlign: 'top'}}
            text={`${theme.sanity.container[0]}px`}
          />
        </Inline>
      </Card>

      <Card flex={1} overflow="auto" tone="transparent">
        <Container height="fill" style={{position: 'relative'}} width={width}>
          <PortalProvider element={portalElement}>
            <Canvas onCatch={onCatch} padding={[3, 3, 4]} result={result} />
          </PortalProvider>
          <div data-portal ref={setPortalElement} />
        </Container>
      </Card>
    </Flex>
  )
}

function CodePane(props: {
  jsxCode: string
  jsxCursor: Cursor
  jsxResult: JSXEvalResult | null
  mode: 'jsx' | 'hook'
  onJSXCodeChange: (newCode: string) => void
  onJSXCursorChange: (cursor: Cursor) => void
  onModeChange: (mode: 'jsx' | 'hook') => void
  onHookCodeChange: (newCode: string) => void
  onHookCursorChange: (cursor: Cursor) => void
  hookCode: string
  hookCursor: Cursor
  hookError: Error | null
}) {
  const {
    jsxCode,
    jsxCursor,
    jsxResult,
    mode,
    onJSXCodeChange,
    onJSXCursorChange,
    onModeChange,
    onHookCodeChange,
    onHookCursorChange,
    hookCode,
    hookCursor,
    hookError,
  } = props

  return (
    <Flex direction="column" height="fill">
      <Card borderBottom paddingX={4} paddingY={2} style={{textAlign: 'center', minHeight: 'auto'}}>
        <TabList space={[1, 1, 2]}>
          <Tab
            aria-controls="mode-jsx-panel"
            fontSize={1}
            id="mode-jsx-tab"
            onClick={() => onModeChange('jsx')}
            padding={2}
            selected={mode === 'jsx'}
            style={{verticalAlign: 'top'}}
            label="JSX"
          />
          <Tab
            aria-controls="mode-hook-panel"
            fontSize={1}
            id="mode-hook-tab"
            onClick={() => onModeChange('hook')}
            padding={2}
            selected={mode === 'hook'}
            style={{verticalAlign: 'top'}}
            label="Hook"
          />
        </TabList>
      </Card>

      <TabPanel
        aria-labelledby="mode-jsx-tab"
        flex={1}
        id="mode-jsx-panel"
        hidden={mode !== 'jsx'}
        style={{outline: 'none'}}
      >
        {mode === 'jsx' && (
          <AsyncCodeEditor
            code={jsxCode}
            cursor={jsxCursor}
            key="jsx"
            language="jsx"
            onCodeChange={onJSXCodeChange}
            onCursorChange={onJSXCursorChange}
          />
        )}
      </TabPanel>

      <TabPanel
        aria-labelledby="mode-hook-tab"
        flex={1}
        id="mode-hook-panel"
        hidden={mode !== 'hook'}
        style={{outline: 'none'}}
      >
        {mode === 'hook' && (
          <AsyncCodeEditor
            code={hookCode}
            cursor={hookCursor}
            key="hook"
            language="javascript"
            onCodeChange={onHookCodeChange}
            onCursorChange={onHookCursorChange}
          />
        )}
      </TabPanel>

      {jsxResult && jsxResult.type === 'error' && (
        <Card borderTop padding={4} style={{minHeight: 'auto'}} tone="critical">
          <Code>JSX error: {jsxResult.error.message}</Code>
        </Card>
      )}

      {hookError && (
        <Card borderTop padding={4} style={{minHeight: 'auto'}} tone="critical">
          <Code>Hook error: {hookError.message}</Code>
        </Card>
      )}
    </Flex>
  )
}
