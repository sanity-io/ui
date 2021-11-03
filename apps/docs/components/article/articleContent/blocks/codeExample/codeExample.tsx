import * as icons from '@sanity/icons'
import {LaunchIcon} from '@sanity/icons'
import * as ui from '@sanity/ui'
import {Box, Button, Card, Flex, Spinner, Tab, TabList, TabPanel, Text} from '@sanity/ui'
import Link from 'next/link'
import React, {useCallback, useEffect, useState} from 'react'
import styled, {keyframes} from 'styled-components'
import {
  AsyncCodeEditor,
  Canvas,
  evalComponent,
  EvalComponentResult,
  ready as readyCheck,
} from '$lib/ide'
import {getArcadeQuery} from '$screens/arcade'

export function CodeExample(props: {
  code: string
  description?: string
  hookCode?: string
  title?: string
}) {
  const {code: codeProp = '', description, hookCode: hookCodeProp = '', title} = props
  const [ready, setReady] = useState(false)
  const [jsxCode, setJSXCode] = useState<string>(codeProp)
  const [evalResult, setEvalResult] = useState<EvalComponentResult | null>(null)
  const [jsxCursor, setJSXCursor] = useState({line: 0, column: 0})
  const [hookCode, setScopeCode] = useState<string>(hookCodeProp)
  const [hookCursor, setScopeCursor] = useState({line: 0, column: 0})
  const [renderError, setRenderError] = useState<Error | null>(null)

  useEffect(() => {
    readyCheck().then(() => setReady(true))
  }, [])

  useEffect(() => {
    if (!ready) return

    setEvalResult(
      evalComponent({
        hookCode,
        jsxCode,
        scope: {...icons, ...ui, ...React, React, styled, keyframes},
      })
    )
  }, [hookCode, jsxCode, ready])

  useEffect(() => {
    setRenderError(null)
  }, [hookCode, jsxCode])

  const onCatch = useCallback((params: {error: Error; info: React.ErrorInfo}) => {
    setRenderError(params.error)
  }, [])

  const arcadeQuery = getArcadeQuery({description, jsx: jsxCode, hook: hookCode, title})

  const [mode, setMode] = useState<'jsx' | 'hook'>('jsx')

  return (
    <Box marginY={[4, 4, 5]}>
      <Card overflow="hidden" radius={2} shadow={1}>
        {ready && !renderError && (
          <Card style={{minHeight: 51}} tone="transparent">
            <Canvas
              key={`${hookCode};${jsxCode}`}
              onCatch={onCatch}
              padding={4}
              result={evalResult}
            />
          </Card>
        )}

        {renderError && (
          <Card padding={4} tone="critical">
            <Text>An error occured while rendering</Text>
          </Card>
        )}

        {!ready && (
          <Card padding={4} tone="transparent">
            <Flex justify="center">
              <Spinner muted />
            </Flex>
          </Card>
        )}

        <Card borderTop borderBottom paddingX={4} paddingY={2}>
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
          style={{outline: 'none', minHeight: 100}}
        >
          {mode === 'jsx' && (
            <AsyncCodeEditor
              code={jsxCode || ''}
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
          style={{outline: 'none', minHeight: 100}}
        >
          {mode === 'hook' && (
            <AsyncCodeEditor
              code={hookCode || ''}
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
