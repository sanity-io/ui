import {Box, BoxProps, ColorSchemeKey, useCard} from '@sanity/ui'
import codemirror from 'codemirror'
import React, {useCallback, useEffect, useRef} from 'react'
import {UnControlled as CodeMirror} from 'react-codemirror2'
import styled from 'styled-components'
import 'codemirror/mode/jsx/jsx'
import 'codemirror/lib/codemirror.css'
import {codeEditor, codeEditorSyntax} from './styles'

interface CodeEditorProps {
  code: string
  cursor: {line: number; column: number}
  mode?: 'jsx'
  onCodeChange: (value: string) => void
  onCursorChange?: (line: number, column: number) => void
}

const Root = styled(Box)<{scheme: ColorSchemeKey}>(codeEditor, codeEditorSyntax)

export function CodeEditor(props: React.HTMLProps<HTMLDivElement> & BoxProps & CodeEditorProps) {
  const {code, cursor, mode = 'jsx', onCodeChange, onCursorChange, ...restProps} = props
  const editorRef = useRef<codemirror.Editor | null>(null)
  const codeRef = useRef(code)
  const card = useCard()
  const cursorRef = useRef(cursor)

  const handleCodeMirrorChange = useCallback(
    (editor: codemirror.Editor, change: codemirror.EditorChange, value: string) => {
      setTimeout(() => {
        codeRef.current = value
        onCodeChange(value)
      }, 100)
    },
    [onCodeChange]
  )

  const handleEditorDidMount = useCallback((editor: codemirror.Editor) => {
    editorRef.current = editor
    editor.setValue(codeRef.current)
  }, [])

  useEffect(() => {
    if (codeRef.current !== code && editorRef.current) {
      codeRef.current = code
      editorRef.current.setValue(code)
    }
  }, [code])

  useEffect(() => {
    if (!editorRef.current) return
    if (cursor.line !== cursorRef.current.line || cursor.column !== cursorRef.current.column) {
      editorRef.current.getDoc().setCursor({line: cursor.line, ch: cursor.column})
    }
  }, [cursor])

  const handleCursorActivity = useCallback(
    (editor: codemirror.Editor) => {
      const c = editor.getDoc().getCursor()
      if (onCursorChange) onCursorChange(c.line, c.ch)
      cursorRef.current = {line: c.line, column: c.ch}
    },
    [onCursorChange]
  )

  return (
    <Root {...restProps} scheme={card.scheme}>
      <CodeMirror
        editorDidMount={handleEditorDidMount}
        onChange={handleCodeMirrorChange}
        onCursorActivity={handleCursorActivity}
        options={{mode}}
      />
    </Root>
  )
}
