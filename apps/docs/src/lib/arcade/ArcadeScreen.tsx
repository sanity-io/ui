import {Card, Flex} from '@sanity/ui'
import {debounce, DebouncedFunc} from 'lodash-es'
import {useRouter} from 'next/navigation'
import qs from 'qs'
import {ReactElement, useCallback, useEffect, useReducer, useRef} from 'react'

import {CodeEditorSelection} from '@/lib/codeEditor'

import {arcadeReducer} from './arcadeReducer'
import {CanvasPane} from './CanvasPane'
import {CodePane} from './CodePane'
import {DEFAULT_CODE, INITIAL_STATE} from './constants'
import {getArcadeQuery, tryDecode} from './helpers'
import {ArcadeCodeMode, ArcadeMeta, ArcadeQueryParams, CanvasWidth} from './types'
import {basePath} from '@/env'

type SaveFn = (params: ArcadeQueryParams) => void

function compileSearch(params: Record<string, string>): string {
  return qs.stringify(params)
}

export function ArcadeScreen(props: {title: string; description: string}): ReactElement {
  const router = useRouter()
  const routerRef = useRef(router)
  const [state, dispatch] = useReducer(arcadeReducer, {
    ...INITIAL_STATE,
    meta: {title: props.title || '', description: props.description || ''},
  })

  const saveFnRef = useRef<DebouncedFunc<SaveFn> | null>(null)

  routerRef.current = router

  // Create `saveFn` callback
  useEffect(() => {
    const saveFn = debounce((params: ArcadeQueryParams) => {
      const href = `${basePath}/arcade?${compileSearch(getArcadeQuery(params))}`
      document.title = `${params.title ?? 'Arcade'} | Sanity UI`
      routerRef.current.replace(href, {scroll: false})
    }, 100)

    saveFnRef.current = saveFn

    return () => saveFn.cancel()
  }, [])

  // Trigger save callback
  useEffect(() => {
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

  // Load saved state from URL
  useEffect(() => {
    const query = qs.parse(window.location.search.slice(1))

    dispatch({
      type: 'init',
      codeMode: (query.mode as any) || 'jsx',
      hookCode: tryDecode(query.hook) || '',
      jsxCode: tryDecode(query.jsx) || DEFAULT_CODE,
      canvasWidth: typeof query.width === 'string' ? (Number(query.width) as any) : null,
      meta: {
        title: String(query.title || ''),
        description: String(query.description || ''),
      },
    })
  }, [])

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
    <Card flex={1} overflow="hidden" shadow={1} style={{minHeight: 'auto'}}>
      <Flex direction={['column', 'column', 'row']} height="fill">
        <Card
          flex={1}
          overflow="hidden"
          tone="transparent"
          style={{position: 'relative', zIndex: 1}}
        >
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
