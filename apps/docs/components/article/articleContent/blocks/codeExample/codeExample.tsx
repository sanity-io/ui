import * as icons from '@sanity/icons'
import {LaunchIcon} from '@sanity/icons'
import * as ui from '@sanity/ui'
import {Box, Button, Card, Tab, TabList, TabPanel} from '@sanity/ui'
import Link from 'next/link'
import React, {useEffect, useState} from 'react'
import {
  AsyncCodeEditor,
  Canvas,
  evalJSX,
  JSXEvalResult,
  ready as readyCheck,
  ScopeRenderer,
} from '$lib/ide'
import {getArcadeQuery} from '$screens/arcade'

export function CodeExample(props: {
  code: string
  description?: string
  hookCode?: string
  title?: string
}) {
  const {code: codeProp, description, hookCode: hookCodeProp, title} = props
  const [ready, setReady] = useState(false)
  const [[scope], setScope] = useState<[Record<string, unknown> | null, Error | null]>([null, null])
  const [jsxCode, setJSXCode] = useState(codeProp)
  const [jsxResult, setJSXResult] = useState<JSXEvalResult | null>(null)
  const [jsxCursor, setJSXCursor] = useState({line: 0, column: 0})
  const [hookCode, setScopeCode] = useState(hookCodeProp || '')
  const [hookCursor, setScopeCursor] = useState({line: 0, column: 0})

  useEffect(() => {
    readyCheck().then(() => setReady(true))
  }, [])

  useEffect(() => {
    if (!ready) return
    setJSXResult(evalJSX(jsxCode, {...scope, ...icons, ...ui, React}))
  }, [jsxCode, ready, scope])

  const onCatch = () => {
    // @todo
  }

  const arcadeQuery = getArcadeQuery({description, jsx: jsxCode, hook: hookCode, title})

  const [mode, setMode] = useState<'jsx' | 'hook'>('jsx')

  return (
    <Box marginY={[4, 4, 5]}>
      <Card overflow="hidden" radius={2} shadow={1}>
        <ScopeRenderer code={hookCode} key={hookCode} onChange={setScope} />

        <Card borderBottom>
          <Canvas onCatch={onCatch} padding={[3, 3, 4]} result={jsxResult} />
        </Card>

        <Card borderBottom paddingX={4} paddingY={2}>
          <TabList space={[1, 1, 2]} style={{textAlign: 'center'}}>
            <Tab
              aria-controls="mode-jsx-panel"
              fontSize={1}
              id="mode-jsx-tab"
              onClick={() => setMode('jsx')}
              padding={2}
              selected={mode === 'jsx'}
              style={{verticalAlign: 'top'}}
              label="JSX"
            />
            <Tab
              aria-controls="mode-hook-panel"
              fontSize={1}
              id="mode-hook-tab"
              onClick={() => setMode('hook')}
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
              flex={1}
              onCodeChange={setJSXCode}
              onCursorChange={setJSXCursor}
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
              flex={1}
              onCodeChange={setScopeCode}
              onCursorChange={setScopeCursor}
            />
          )}
        </TabPanel>
      </Card>

      <Box marginTop={2} style={{textAlign: 'right'}}>
        <Link href={{pathname: '/arcade', query: arcadeQuery}} passHref>
          <Button
            as="a"
            fontSize={1}
            iconRight={LaunchIcon}
            mode="bleed"
            padding={2}
            text="Open in Arcade"
          />
        </Link>
      </Box>
    </Box>
  )
}
