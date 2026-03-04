'use client'

import {Card, Flex} from '@sanity/ui'
import {debounce, DebouncedFunc, isEqual} from 'lodash-es'
import {useRouter} from 'next/navigation'
import qs from 'qs'
import {ReactElement, useCallback, useEffect, useReducer, useRef, useState} from 'react'

import {CodeEditorSelection} from '@/lib/codeEditor'

import {arcadeReducer} from './arcadeReducer'
import {CanvasPane} from './CanvasPane'
import {CodePane} from './CodePane'
import {DEFAULT_CODE, DEFAULT_V4_CODE} from './constants'
import {getArcadeQuery, tryDecode} from './helpers'
import {ArcadeCodeMode, ArcadeMeta, ArcadeQueryParams, ArcadeState, CanvasWidth} from './types'
import {useApp} from '../../app/useApp'

type SaveFn = (params: ArcadeQueryParams) => void

function compileSearch(params: Record<string, string>): string {
  return qs.stringify(params)
}

export function ArcadeScreen(props: {title: string; description: string}): ReactElement {
  const {title = '', description = ''} = props

  const {defaultVersion, version} = useApp()
  const versionPrefix = version === defaultVersion ? '' : `/${version}`
  const router = useRouter()
  const routerRef = useRef(router)

  const [initialState] = useState(() => {
    const query = qs.parse(window.location.search.slice(1))

    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      canvasWidth: typeof query.width === 'string' ? (Number(query.width) as any) : null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      codeMode: (query.mode as any) || 'jsx',
      hookCode: tryDecode(query.hook) || '',
      hookCursor: {anchor: 0, focus: 0},
      jsxCode: tryDecode(query.jsx) || (version === 'v4' ? DEFAULT_V4_CODE : DEFAULT_CODE),
      jsxCursor: {anchor: 0, focus: 0},
      meta: {title, description},
    } satisfies ArcadeState
  })

  const [state, dispatch] = useReducer(arcadeReducer, initialState)

  const stateRef = useRef(state)

  const saveFnRef = useRef<DebouncedFunc<SaveFn> | null>(null)

  useEffect(() => {
    routerRef.current = router
  }, [router])

  // Create `saveFn` callback
  useEffect(() => {
    const saveFn = debounce((params: ArcadeQueryParams) => {
      const href = `${versionPrefix}/arcade?${compileSearch(getArcadeQuery(params))}`
      document.title = `${params.title ?? 'Arcade'} | Sanity UI`
      routerRef.current.replace(href, {scroll: false})
    }, 100)

    saveFnRef.current = saveFn

    return () => saveFn.cancel()
  }, [versionPrefix])

  // Trigger save callback
  useEffect(() => {
    const prev = {
      mode: stateRef.current.codeMode,
      jsx: stateRef.current.jsxCode,
      hook: stateRef.current.hookCode,
      title: stateRef.current.meta.title,
      description: stateRef.current.meta.description,
      width: stateRef.current.canvasWidth,
    }

    const current = {
      mode: state.codeMode,
      jsx: state.jsxCode,
      hook: state.hookCode,
      title: state.meta.title,
      description: state.meta.description,
      width: state.canvasWidth,
    }

    if (isEqual(prev, current)) return

    console.log('state changed', {
      previous: stateRef.current,
      current: state,
    })

    stateRef.current = state

    const saveFn = saveFnRef.current

    if (saveFn) {
      saveFn({
        mode: state.codeMode || undefined,
        jsx: state.jsxCode || undefined,
        hook: state.hookCode || undefined,
        title: state.meta.title || undefined,
        description: state.meta.description || undefined,
        width: state.canvasWidth || undefined,
      })
    }
  }, [state])

  const setCodeMode = useCallback(
    (value: ArcadeCodeMode) => dispatch({type: 'setCodeMode', value}),
    [],
  )

  const setMeta = useCallback((value: ArcadeMeta) => dispatch({type: 'setMeta', value}), [])

  const setJSXCode = useCallback((value: string) => dispatch({type: 'setJSXCode', value}), [])

  const setJSXCursor = useCallback(
    (value: CodeEditorSelection) => dispatch({type: 'setJSXCursor', value}),
    [],
  )

  const setHookCode = useCallback((value: string) => dispatch({type: 'setHookCode', value}), [])

  const setHookCursor = useCallback(
    (value: CodeEditorSelection) => dispatch({type: 'setHookCursor', value}),
    [],
  )

  const setCanvasWidth = useCallback(
    (value: CanvasWidth | null) => dispatch({type: 'setCanvasWidth', value}),
    [],
  )

  return (
    <Card flex={1} overflow="hidden" shadow={1} style={{minHeight: 'auto'}} tone="default">
      <Flex direction={['column', 'column', 'row']} height="fill">
        <Card flex={1} overflow="hidden" style={{position: 'relative', zIndex: 1}}>
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
          flex={1}
          overflow="hidden"
          shadow={1}
          style={{position: 'relative', maxWidth: 634, zIndex: 2}}
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
  )
}
