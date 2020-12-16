import {Box, BoxProps} from '@sanity/ui'
import codemirror from 'codemirror'
import isHotkey from 'is-hotkey'
import React, {useCallback, useEffect, useRef} from 'react'
import {Controlled as CodeMirror} from 'react-codemirror2'
import styled from 'styled-components'
import 'codemirror/mode/jsx/jsx'
import 'codemirror/lib/codemirror.css'
import {getCursor, getCursorOffset} from '../helpers'
import {runPrettier} from './prettier'
import {codeEditorStyle, codeEditorSyntax} from './styles'

interface CodeEditorCursor {
  line: number
  column: number
}

interface CodeEditorProps extends BoxProps {
  code: string
  cursor: CodeEditorCursor
  fontSize?: number | number[]
  language?: 'javascript' | 'jsx'
  onCodeChange: (value: string) => void
  onCursorChange: (cursor: CodeEditorCursor) => void
}

const Root = styled(Box)(codeEditorStyle, codeEditorSyntax)

const isSaveHotkey = isHotkey('mod+s')

export default function CodeEditor(props: CodeEditorProps & React.HTMLProps<HTMLDivElement>) {
  const {
    code,
    cursor,
    fontSize = 2,
    language = 'jsx',
    onCodeChange,
    onCursorChange,
    ...restProps
  } = props
  const editorRef = useRef<codemirror.Editor | null>(null)
  const cursorRef = useRef(cursor)

  const handleCodeMirrorChange = useCallback(
    (editor: codemirror.Editor, change: codemirror.EditorChange, value: string) => {
      onCodeChange(value)
    },
    [onCodeChange]
  )

  const handleCursorActivity = useCallback(
    (editor: codemirror.Editor) => {
      const c = editor.getDoc().getCursor()
      const newCursor = {line: c.line, column: c.ch}
      if (onCursorChange) onCursorChange(newCursor)
      cursorRef.current = newCursor
    },
    [onCursorChange]
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (isSaveHotkey(event.nativeEvent)) {
        event.preventDefault()

        const cursorOffset = getCursorOffset(code, cursor)
        const result = runPrettier({code, cursorOffset})

        if (result) {
          let newVal = result.formatted
          let offset = result.cursorOffset

          if (newVal[0] === ';') {
            newVal = newVal.slice(1)
            offset -= 1
          }

          onCursorChange(getCursor(newVal, offset))
          onCodeChange(newVal)
        }
      }
    },
    [code, cursor, onCodeChange, onCursorChange]
  )

  useEffect(() => {
    if (!editorRef.current) return

    if (cursor.line !== cursorRef.current.line || cursor.column !== cursorRef.current.column) {
      editorRef.current.getDoc().setCursor({line: cursor.line, ch: cursor.column})
    }
  }, [cursor])

  return (
    <Root {...restProps} size={fontSize} onKeyDown={handleKeyDown}>
      <CodeMirror
        onBeforeChange={handleCodeMirrorChange}
        onCursorActivity={handleCursorActivity}
        options={{mode: language}}
        value={code}
      />
    </Root>
  )
}
