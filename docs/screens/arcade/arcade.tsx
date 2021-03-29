import {Card, Flex} from '@sanity/ui'
import {debounce, DebouncedFunc} from 'lodash'
import Head from 'next/head'
import {useRouter} from 'next/router'
import qs from 'qs'
import React, {useEffect, useRef, useState} from 'react'
import {CanvasPane} from './canvasPane'
import {CodePane} from './codePane'
import {DEFAULT_CODE} from './constants'
import {getArcadeQuery, tryDecode} from './helpers'
import {ArcadeQueryParams, CanvasWidth} from './types'

type SaveFn = (params: ArcadeQueryParams) => void

export function ArcadeScreen(props: {title: string; description: string}) {
  const {replace: replaceState} = useRouter()
  const [jsxCode, setJSXCode] = useState('')
  const [jsxCursor, setJSXCursor] = useState({line: 0, column: 0})
  const [hookCode, setHookCode] = useState('')
  const [hookCursor, setHookCursor] = useState({line: 0, column: 0})
  const [canvasWidth, setCanvasWidth] = useState<CanvasWidth | null>(null)
  const [codeMode, setCodeMode] = useState<'jsx' | 'hook'>('jsx')
  const saveFnRef = useRef<DebouncedFunc<SaveFn> | null>(null)
  const [meta, setMeta] = useState({title: props.title || '', description: props.description || ''})

  // Create `saveFn` callback
  useEffect(() => {
    const saveFn = debounce((params: ArcadeQueryParams) => {
      replaceState(
        {
          pathname: '/arcade',
          query: getArcadeQuery(params),
        },
        undefined,
        {shallow: true}
      )
    }, 100)

    saveFnRef.current = saveFn

    return () => saveFn.cancel()
  }, [replaceState])

  // Trigger save callback
  useEffect(() => {
    const saveFn = saveFnRef.current

    if (saveFn) {
      saveFn({
        mode: codeMode,
        jsx: jsxCode,
        hook: hookCode,
        title: meta.title,
        description: meta.description,
        width: canvasWidth,
      })
    }
  }, [canvasWidth, codeMode, jsxCode, hookCode, meta])

  // Load saved state from URL
  useEffect(() => {
    const query = qs.parse(window.location.search.slice(1))

    setCodeMode((query.mode as any) || 'jsx')
    setHookCode(tryDecode(query.hook) || 'return {}\n')
    setJSXCode(tryDecode(query.jsx) || DEFAULT_CODE)
    setCanvasWidth(typeof query.width === 'string' ? (Number(query.width) as any) : null)
    setMeta({title: String(query.title || ''), description: String(query.description || '')})
  }, [])

  return (
    <>
      <Head>
        <title>{meta.title || 'Untitled'} – Arcade – Sanity UI</title>
        {/* Twitter */}
        <meta name="twitter:card" content={'summary_large_image'} />

        {/* OpenGraph */}
        <meta property="og:type" content={'website'} />
        <meta property="og:title" content={meta.title || 'Untitled'} />
        <meta
          property="og:description"
          content={meta.description || 'An interactive JSX playground for Sanity UI.'}
        />
      </Head>

      <Flex direction={['column', 'column', 'row']} height="fill">
        <Card flex={1}>
          <CanvasPane
            hookCode={hookCode}
            jsxCode={jsxCode}
            meta={meta}
            onMetaChange={setMeta}
            onWidthChange={setCanvasWidth}
            width={canvasWidth}
          />
        </Card>

        <Card
          borderLeft={[false, false, true]}
          borderTop={[true, true, false]}
          flex={1}
          style={{maxWidth: 634}}
        >
          <CodePane
            jsxCode={jsxCode}
            jsxCursor={jsxCursor}
            mode={codeMode}
            onJSXCodeChange={setJSXCode}
            onJSXCursorChange={setJSXCursor}
            onModeChange={setCodeMode}
            onHookCodeChange={setHookCode}
            onHookCursorChange={setHookCursor}
            hookCode={hookCode}
            hookCursor={hookCursor}
          />
        </Card>
      </Flex>
    </>
  )
}
