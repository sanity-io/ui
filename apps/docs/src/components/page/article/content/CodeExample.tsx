'use client'

import {ArrowRightIcon} from '@sanity/icons/ArrowRight'
import {Box, Button, Card, Tab, TabList, TabPanel} from '@sanity/ui'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import {ReactElement, useState} from 'react'
import {styled} from 'styled-components'

import {ArcadeFrame} from '@/lib/arcade/ArcadeFrame'
import {getArcadeQuery} from '@/lib/arcade/helpers'
import {CodeEditor} from '@/lib/codeEditor/CodeEditor'

const FrameCard = styled(Card)`
  height: 200px;
`

export function CodeExample(props: {
  code: string
  description?: string
  hookCode?: string
  title?: string
}): ReactElement {
  const {code: codeProp, description, hookCode: hookCodeProp = '', title} = props
  const router = useRouter()
  const [jsxCode, setJSXCode] = useState<string>(codeProp)
  const [jsxCursor, setJSXCursor] = useState({anchor: 0, focus: 0})
  const [hookCode, setScopeCode] = useState<string>(hookCodeProp)
  const [hookCursor, setScopeCursor] = useState({anchor: 0, focus: 0})

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

        <Card borderTop borderBottom paddingX={4} paddingY={2}>
          <TabList gap={1} style={{textAlign: 'center'}}>
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
          // href embeds live editor state; Link prefetch would refetch on every
          // keystroke. Warm the stable /arcade shell on hover instead.
          onMouseEnter={() => router.prefetch('/arcade')}
          padding={2}
          gap={2}
          prefetch={false}
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
