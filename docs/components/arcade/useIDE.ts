import * as icons from '@sanity/icons'
import * as ui from '@sanity/ui'
import isHotkey from 'is-hotkey'
import {debounce} from 'lodash'
import {useRouter} from 'next/router'
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {DEFAULT_CODE} from './constants'
import {encode, decode, getCursor, getCursorOffset} from './helpers'
import {Cursor} from './types'
import {EvalResult, renderCode} from '$lib/eval'
import {runPrettier} from '$lib/prettier'

const isSaveHotkey = isHotkey('mod+s')

export function useIDE() {
  const router = useRouter()
  const [code, setCode] = useState('')
  const [result, setResult] = useState<EvalResult | null>(null)
  const codeRef = useRef<string | null>(null)
  const [cursor, setCursor] = useState<Cursor>({line: 0, column: 0})
  const codeParamRef = useRef(String(router.query.code || '') || null)

  const saveCode = useMemo(
    () =>
      debounce((code: string) => {
        router.replace({pathname: '/arcade', query: {code: encode(code)}})
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

  const write = (newCode: string) => {
    setCode(newCode)
    saveCode(newCode)
    setResult(renderCode(newCode, {React, ...icons, ...ui}))
  }

  // load saved code
  useEffect(() => {
    if (codeParamRef.current) {
      const cachedCode = decode(codeParamRef.current)

      setCode(cachedCode)
      setResult(renderCode(cachedCode, {React, ...icons, ...ui}))
    } else {
      setCode(DEFAULT_CODE)
      setResult(renderCode(DEFAULT_CODE, {React, ...icons, ...ui}))
    }
  }, [])

  useEffect(() => {
    codeRef.current = code
  }, [code])

  return {code, cursor, handleCatch, handleCursorChange, handleKeyDown, result, write}
}
