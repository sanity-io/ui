'use client'

import {ArrowRightIcon} from '@sanity/icons'
import {Box, Button, Card, Flex, Stack, Tab, TabList, TabPanel, Text} from '@sanity/ui'
import Link from 'next/link'
import {ReactElement, startTransition, useEffect, useState} from 'react'

import {getArcadeQuery} from '@/lib/arcade'
import {ArcadeFrame} from '@/lib/arcade/ArcadeFrame'
import {CodeEditor} from '@/lib/codeEditor'

export function CodeExample(props: {
  code: string
  description?: string
  hookCode?: string
  title?: string
}): ReactElement {
  const {code: codeProp = '', description, hookCode: hookCodeProp = '', title} = props
  const [jsxCode, setJSXCode] = useState<string>(codeProp)
  const [jsxCursor, setJSXCursor] = useState({anchor: 0, focus: 0})
  const [hookCode, setScopeCode] = useState<string>(hookCodeProp)
  const [hookCursor, setScopeCursor] = useState({anchor: 0, focus: 0})
  const [renderError, setRenderError] = useState<Error | null>(null)

  useEffect(() => {
    startTransition(() => {
      setRenderError(null)
    })
  }, [hookCode, jsxCode])

  const arcadeQuery = getArcadeQuery({
    description,
    jsx: jsxCode,
    hook: hookCode,
    title,
  })

  const [mode, setMode] = useState<'jsx' | 'hook'>('jsx')

  return (
    <Stack gap={2}>
      <Card radius={3} shadow={1}>
        <Card overflow="hidden" radius={3} style={{height: 200}} tone="transparent">
          <ArcadeFrame hookCode={hookCode} jsxCode={jsxCode} />
        </Card>

        {renderError && (
          <Card padding={4} tone="critical">
            <Text>An error occured while rendering</Text>
          </Card>
        )}

        <Box borderTop borderBottom paddingX={4} paddingY={2}>
          <TabList gap={1} justify="center">
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
        </Box>

        <TabPanel
          aria-labelledby="mode-jsx-tab"
          flex={1}
          id="mode-jsx-panel"
          hidden={mode !== 'jsx'}
          style={{outline: 'none', minHeight: 100}}
        >
          {mode === 'jsx' && (
            <CodeEditor
              focusRing
              border={false}
              selection={jsxCursor}
              flex={1}
              height="fill"
              onChange={setJSXCode}
              onSelectionChange={setJSXCursor}
              value={jsxCode || ''}
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
            <CodeEditor
              border={false}
              selection={hookCursor}
              flex={1}
              focusRing={false}
              height="fill"
              onChange={setScopeCode}
              onSelectionChange={setScopeCursor}
              value={hookCode || ''}
            />
          )}
        </TabPanel>
      </Card>

      <Flex justify="flex-end">
        <Button
          as={Link}
          fontSize={1}
          gap={2}
          href={`/arcade${encodeQueryParams(arcadeQuery)}`}
          iconRight={ArrowRightIcon}
          mode="bleed"
          padding={2}
          text="Open in Arcade"
        />
      </Flex>
    </Stack>
  )
}

function encodeQueryParams(params: Record<string, unknown>) {
  const keys = Object.keys(params)

  if (keys.length === 0) return ''

  return `?${keys
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key] as string)}`)
    .join('&')}`
}
