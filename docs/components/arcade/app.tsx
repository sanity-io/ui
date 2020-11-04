import * as ui from '@sanity/ui'
import {Box, Card, Code, ErrorBoundary, Flex} from '@sanity/ui'
import base64url from 'base64-url'
import isHotkey from 'is-hotkey'
import {useRouter} from 'next/router'
import React, {useCallback, useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import {CodeEditor} from './codeEditor'
import {EvalResult, renderCode} from '~/lib/eval'
import {runPrettier} from '~/lib/prettier'

const isSaveHotkey = isHotkey('mod+s')

const Root = styled(Card)`
  height: 100%;
`

interface Cursor {
  line: number
  column: number
}

const DEFAULT_CODE = `<Card
  padding={6}
  style={{
    boxSizing: 'border-box',
    minHeight: '100%',
  }}
  >
  <Inline space={2}>
    <Button icon="compose" text="Compose" tone="brand" />
    <Button icon="play" mode="ghost" text="Run" />
    <Button icon="robot" mode="ghost" text="Automate" />
  </Inline>
</Card>
`

export default function ArcadeApp() {
  const router = useRouter()
  const [code, setCode] = useState('')
  const [result, setResult] = useState<EvalResult | null>(null)
  const codeRef = useRef(code)
  const [cursor, setCursor] = useState<Cursor>({line: 0, column: 0})

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cachedCode = router.query.code ? base64url.decode(router.query.code) : DEFAULT_CODE
      if (cachedCode) setCode(cachedCode)
    }
  }, [router])

  useEffect(() => {
    if (code !== codeRef.current) {
      codeRef.current = code
      router.replace({pathname: '/arcade', query: {code: base64url.encode(code)}})
      setResult(renderCode(code, {React, ...ui}))
    }
  }, [code, router])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (isSaveHotkey(event.nativeEvent)) {
        event.preventDefault()

        const lines = codeRef.current.split('\n')

        const lenBefore = lines
          .slice(0, cursor.line)
          .map((l) => l.length + 1)
          .reduce((acc, l) => (acc += l), 0)

        const cursorOffset = lenBefore + cursor.column

        const result = runPrettier({code, cursorOffset})

        if (result) {
          let newVal = result.formatted
          let offset = result.cursorOffset

          if (newVal[0] === ';') {
            newVal = newVal.slice(1)
            offset -= 1
          }

          const _lines = newVal.split('\n')

          let line = 0
          let column = 0

          for (let i = 0; i < _lines.length; i += 1) {
            if (offset <= _lines[i].length) {
              line = i
              column = offset
              break
            }

            offset -= _lines[i].length + 1
          }

          setCursor({line, column})
          setCode(newVal)
        }
      }
    },
    [code, cursor]
  )

  const handleCursorChange = useCallback((line: number, column: number) => {
    setCursor({line, column})
  }, [])

  const handleCatch = (params: {error: Error; info: React.ErrorInfo}) => {
    console.log(params)
  }

  return (
    <Root onKeyDown={handleKeyDown}>
      <Flex style={{height: '100%'}}>
        {result && result.type === 'success' && (
          <Card borderRight flex={1} style={{overflow: 'auto'}} tone="transparent">
            <ErrorBoundary onCatch={handleCatch}>{result.node}</ErrorBoundary>
          </Card>
        )}

        {result && result.type === 'error' && (
          <Card borderRight flex={1}>
            <Box padding={4}>
              <Code>{result.error.message}</Code>
            </Box>
          </Card>
        )}

        <Box flex={1}>
          <CodeEditor
            code={code}
            cursor={cursor}
            onCodeChange={setCode}
            onCursorChange={handleCursorChange}
          />
        </Box>
      </Flex>
    </Root>
  )
}
