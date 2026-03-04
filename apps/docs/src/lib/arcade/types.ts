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

export interface ArcadeSetCanvasWidthMsg {
  type: 'setCanvasWidth'
  value: CanvasWidth | null
}

export interface ArcadeSetCodeModeMsg {
  type: 'setCodeMode'
  value: ArcadeCodeMode
}

export interface ArcadeSetHookCodeMsg {
  type: 'setHookCode'
  value: string
}

export interface ArcadeSetHookCursorMsg {
  type: 'setHookCursor'
  value: CodeEditorSelection
}

export interface ArcadeSetJSXCodeMsg {
  type: 'setJSXCode'
  value: string
}

export interface ArcadeSetJSXCursorMsg {
  type: 'setJSXCursor'
  value: CodeEditorSelection
}

export interface ArcadeSetMetaCodeMsg {
  type: 'setMeta'
  value: ArcadeMeta
}

export type ArcadeMsg =
  | ArcadeSetCanvasWidthMsg
  | ArcadeSetCodeModeMsg
  | ArcadeSetHookCodeMsg
  | ArcadeSetHookCursorMsg
  | ArcadeSetJSXCodeMsg
  | ArcadeSetJSXCursorMsg
  | ArcadeSetMetaCodeMsg
