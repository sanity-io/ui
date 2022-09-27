'use client'

import {ArrowRightIcon} from '@sanity/icons'
import {Box, Button, Card, Tab, TabList, TabPanel, Text} from '@sanity/ui'
import Link from 'next/link'
import {ReactElement, useEffect, useState} from 'react'
import {styled} from 'styled-components'

import {getArcadeQuery} from '@/lib/arcade'
import {ArcadeFrame} from '@/lib/arcade/ArcadeFrame'
import {CodeEditor} from '@/lib/codeEditor'

const FrameCard = styled(Card)`
  height: 200px;
`

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
    setRenderError(null)
  }, [hookCode, jsxCode])

  const arcadeQuery = getArcadeQuery({
    description,
    jsx: jsxCode,
    hook: hookCode,
    title,
  })

  const [mode, setMode] = useState<'jsx' | 'hook'>('jsx')

  return (
    <div>
      <Card overflow="hidden" radius={2} shadow={1}>
        <FrameCard tone="transparent">
          <ArcadeFrame hookCode={hookCode} jsxCode={jsxCode} />
        </FrameCard>

        {renderError && (
          <Card padding={4} tone="critical">
            <Text>An error occured while rendering</Text>
          </Card>
        )}

        <Card borderTop borderBottom paddingX={4} paddingY={2}>
          <TabList space={1} style={{textAlign: 'center'}}>
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
            <CodeEditor
              border={false}
              selection={jsxCursor}
              flex={1}
              focusRing={false}
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

      <Box marginTop={2} style={{textAlign: 'right'}}>
        <Button
          as={Link}
          fontSize={1}
          href={`/arcade${encodeQueryParams(arcadeQuery)}`}
          iconRight={ArrowRightIcon}
          mode="bleed"
          padding={2}
          space={2}
          text="Open in Arcade"
        />
      </Box>
    </div>
  )
}

function encodeQueryParams(params: Record<string, unknown>) {
  const keys = Object.keys(params)

  if (keys.length === 0) return ''

  return `?${keys
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key] as string)}`)
    .join('&')}`
}
