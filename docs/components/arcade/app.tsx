import * as ui from '@sanity/ui'
import {Box, Card, Code, ErrorBoundary, Flex} from '@sanity/ui'
import isHotkey from 'is-hotkey'
import {debounce} from 'lodash'
import {useRouter} from 'next/router'
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import styled from 'styled-components'
import {CodeEditor} from './codeEditor'
import {DEFAULT_CODE} from './constants'
import {encodeCode, decodeCode, getCursor, getCursorOffset} from './helpers'
import {Cursor} from './types'
import {EvalResult, renderCode} from '$lib/eval'
import {runPrettier} from '$lib/prettier'

const isSaveHotkey = isHotkey('mod+s')

const Root = styled(Card)`
  height: 100%;
`

export default function ArcadeApp() {
  const router = useRouter()
  const [code, setCode] = useState('')
  const [result, setResult] = useState<EvalResult | null>(null)
  const codeRef = useRef<string | null>(null)
  const [cursor, setCursor] = useState<Cursor>({line: 0, column: 0})

  const saveCode = useMemo(
    () =>
      debounce((code: string) => {
        router.replace({
          pathname: '/arcade',
          query: {code: encodeCode(code)},
        })
      }, 200),
    [router]
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (isSaveHotkey(event.nativeEvent)) {
        event.preventDefault()

        const cursorOffset = getCursorOffset(codeRef.current || '', cursor)
        const result = runPrettier({code, cursorOffset})

        if (result) {
          let newVal = result.formatted
          let offset = result.cursorOffset

          if (newVal[0] === ';') {
            newVal = newVal.slice(1)
            offset -= 1
          }

          setCursor(getCursor(newVal, offset))
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cachedCode =
        typeof router.query.code === 'string' ? decodeCode(router.query.code) : DEFAULT_CODE
      if (cachedCode) setCode(cachedCode)
    }
  }, [router])

  useEffect(() => {
    if (code !== codeRef.current) {
      codeRef.current = code
      saveCode(code)
      setResult(renderCode(code, {React, ...ui}))
    }
  }, [code, router, saveCode])

  return (
    <Root onKeyDown={handleKeyDown}>
      <Flex style={{height: '100%'}}>
        {result && result.type === 'success' && (
          <Card flex={1} style={{overflow: 'auto'}} tone="transparent">
            <ErrorBoundary onCatch={handleCatch}>{result.node}</ErrorBoundary>
          </Card>
        )}

        {result && result.type === 'error' && (
          <Card flex={1} style={{overflow: 'auto'}} tone="critical">
            <Box padding={4}>
              <Code>{result.error.message}</Code>
            </Box>
          </Card>
        )}

        <Card borderLeft flex={1}>
          <CodeEditor
            code={code}
            cursor={cursor}
            onCodeChange={setCode}
            onCursorChange={handleCursorChange}
          />
        </Card>
      </Flex>
    </Root>
  )
}
