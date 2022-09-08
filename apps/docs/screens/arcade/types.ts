import {Cursor} from '../../lib/ide'

export type CanvasWidth = 0 | 1 | 2 | 3

export interface ArcadeQueryParams {
  mode?: 'jsx' | 'hook'
  jsx: string | null
  hook: string | null
  title?: string
  description?: string
  width?: CanvasWidth | null
}

export interface ArcadeMeta {
  title: string
  description: string
}

export type ArcadeCodeMode = 'jsx' | 'hook'

export interface ArcadeState {
  jsxCode: string
  jsxCursor: Cursor
  hookCode: string
  hookCursor: Cursor
  canvasWidth: CanvasWidth | null
  meta: ArcadeMeta
  codeMode: ArcadeCodeMode
}

export interface ArcadeInitMsg {
  type: 'init'
  canvasWidth: CanvasWidth | null
  codeMode: ArcadeCodeMode
  hookCode: string
  jsxCode: string
  meta: ArcadeMeta
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
  value: Cursor
}

export interface ArcadeSetJSXCodeMsg {
  type: 'setJSXCode'
  value: string
}

export interface ArcadeSetJSXCursorMsg {
  type: 'setJSXCursor'
  value: Cursor
}

export interface ArcadeSetMetaCodeMsg {
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
