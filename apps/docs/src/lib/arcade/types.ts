import {CodeEditorSelection} from '@/lib/codeEditor'

export type CanvasWidth = 0 | 1 | 2 | 3

export interface ArcadeQueryParams {
  mode?: 'jsx' | 'hook'
  jsx?: string
  hook?: string
  title?: string
  description?: string
  width?: CanvasWidth
}

export interface ArcadeMeta {
  title: string
  description: string
}

export type ArcadeCodeMode = 'jsx' | 'hook'

export interface ArcadeState {
  jsxCode: string
  jsxCursor: CodeEditorSelection
  hookCode: string
  hookCursor: CodeEditorSelection
  canvasWidth: CanvasWidth | null
  meta: ArcadeMeta
  codeMode: ArcadeCodeMode
}

interface ArcadeInitMsg {
  type: 'init'
  canvasWidth: CanvasWidth | null
  codeMode: ArcadeCodeMode
  hookCode: string
  jsxCode: string
  meta: ArcadeMeta
}

interface ArcadeSetCanvasWidthMsg {
  type: 'setCanvasWidth'
  value: CanvasWidth | null
}

interface ArcadeSetCodeModeMsg {
  type: 'setCodeMode'
  value: ArcadeCodeMode
}

interface ArcadeSetHookCodeMsg {
  type: 'setHookCode'
  value: string
}

interface ArcadeSetHookCursorMsg {
  type: 'setHookCursor'
  value: CodeEditorSelection
}

interface ArcadeSetJSXCodeMsg {
  type: 'setJSXCode'
  value: string
}

interface ArcadeSetJSXCursorMsg {
  type: 'setJSXCursor'
  value: CodeEditorSelection
}

interface ArcadeSetMetaCodeMsg {
  type: 'setMeta'
  value: ArcadeMeta
}

export type ArcadeMsg =
  | ArcadeInitMsg
  | ArcadeSetCanvasWidthMsg
  | ArcadeSetCodeModeMsg
  | ArcadeSetHookCodeMsg
  | ArcadeSetHookCursorMsg
  | ArcadeSetJSXCodeMsg
  | ArcadeSetJSXCursorMsg
  | ArcadeSetMetaCodeMsg
