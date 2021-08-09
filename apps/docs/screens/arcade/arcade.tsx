import {Card, Flex} from '@sanity/ui'
import {debounce, DebouncedFunc} from 'lodash'
import Head from 'next/head'
import {useRouter} from 'next/router'
import qs from 'qs'
import React, {useCallback, useEffect, useReducer, useRef} from 'react'
import {arcadeReducer} from './arcadeReducer'
import {CanvasPane} from './canvasPane'
import {CodePane} from './codePane'
import {DEFAULT_CODE, INITIAL_STATE} from './constants'
import {getArcadeQuery, tryDecode} from './helpers'
import {ArcadeCodeMode, ArcadeMeta, ArcadeQueryParams, CanvasWidth} from './types'
import {Cursor} from '$lib/ide'

type SaveFn = (params: ArcadeQueryParams) => void

export function ArcadeScreen(props: {title: string; description: string}) {
  const {replace: replaceState} = useRouter()
  const [state, dispatch] = useReducer(arcadeReducer, {
    ...INITIAL_STATE,
    meta: {title: props.title || '', description: props.description || ''},
  })
  const saveFnRef = useRef<DebouncedFunc<SaveFn> | null>(null)

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
        mode: state.codeMode,
        jsx: state.jsxCode,
        hook: state.hookCode,
        title: state.meta.title,
        description: state.meta.description,
        width: state.canvasWidth,
      })
    }
  }, [state])

  // Load saved state from URL
  useEffect(() => {
    const query = qs.parse(window.location.search.slice(1))

    dispatch({
      type: 'init',
      codeMode: (query.mode as any) || 'jsx',
      hookCode: tryDecode(query.hook) || '',
      jsxCode: tryDecode(query.jsx) || DEFAULT_CODE,
      canvasWidth: typeof query.width === 'string' ? (Number(query.width) as any) : null,
      meta: {title: String(query.title || ''), description: String(query.description || '')},
    })
  }, [])

  const setCodeMode = useCallback(
    (value: ArcadeCodeMode) => dispatch({type: 'setCodeMode', value}),
    []
  )

  const setMeta = useCallback((value: ArcadeMeta) => dispatch({type: 'setMeta', value}), [])

  const setJSXCode = useCallback((value: string) => dispatch({type: 'setJSXCode', value}), [])

  const setJSXCursor = useCallback((value: Cursor) => dispatch({type: 'setJSXCursor', value}), [])

  const setHookCode = useCallback((value: string) => dispatch({type: 'setHookCode', value}), [])

  const setHookCursor = useCallback((value: Cursor) => dispatch({type: 'setHookCursor', value}), [])

  const setCanvasWidth = useCallback(
    (value: CanvasWidth | null) => dispatch({type: 'setCanvasWidth', value}),
    []
  )

  return (
    <>
      <Head>
        <title>{state.meta.title || 'Untitled'} – Arcade – Sanity UI</title>
        {/* Twitter */}
        <meta name="twitter:card" content={'summary_large_image'} />

        {/* OpenGraph */}
        <meta property="og:type" content={'website'} />
        <meta property="og:title" content={state.meta.title || 'Untitled'} />
        <meta
          property="og:description"
          content={state.meta.description || 'An interactive JSX playground for Sanity UI.'}
        />
      </Head>

      <Card flex={1} tone="transparent">
        <Flex direction={['column', 'column', 'row']} height="fill">
          <Card flex={1}>
            <CanvasPane
              hookCode={state.hookCode}
              jsxCode={state.jsxCode}
              meta={state.meta}
              onMetaChange={setMeta}
              onWidthChange={setCanvasWidth}
              width={state.canvasWidth}
            />
          </Card>

          <Card
            borderLeft={[false, false, true]}
            borderTop={[true, true, false]}
            flex={1}
            style={{maxWidth: 634}}
          >
            <CodePane
              jsxCode={state.jsxCode}
              jsxCursor={state.jsxCursor}
              mode={state.codeMode}
              onJSXCodeChange={setJSXCode}
              onJSXCursorChange={setJSXCursor}
              onModeChange={setCodeMode}
              onHookCodeChange={setHookCode}
              onHookCursorChange={setHookCursor}
              hookCode={state.hookCode}
              hookCursor={state.hookCursor}
            />
          </Card>
        </Flex>
      </Card>
    </>
  )
}
