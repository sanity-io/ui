import {javascript} from '@codemirror/lang-javascript'
import {Card, CardProps, useRootTheme, useTheme_v2} from '@sanity/ui'
import {getTheme_v2} from '@sanity/ui/theme'
import CodeMirror, {EditorView, Statistics} from '@uiw/react-codemirror'
import {ReactElement, useCallback, useEffect, useMemo, useRef} from 'react'
import {css, styled} from 'styled-components'

import {isHotkey} from '@/lib/hotkey'

import {getEditorThemeExtension} from './editorTheme'
import {focusRingBorderStyle, focusRingStyle} from './focusRingStyle'
import {getFontSizeExtension} from './fontSize'
import {runPrettier} from './prettier'
import {getSyntaxTheme} from './syntaxTheme'
import {CodeEditorSelection} from './types'

export interface CodeEditorProps {
  focusRing?: boolean
  onChange: (value: string) => void
  onSelectionChange: (selection: CodeEditorSelection) => void
  selection: CodeEditorSelection
  value: string
}

const EditorContainer = styled(Card)<{$focusRing: boolean}>(({$focusRing, theme}) => {
  const {color, input} = getTheme_v2(theme)

  const border = {
    color: color.input.default.enabled.border,
    width: input.border.width,
  }

  return css`
    --input-box-shadow: ${$focusRing ? focusRingBorderStyle(border) : undefined};

    box-shadow: var(--input-box-shadow);
    overflow: hidden;
    position: relative;
    z-index: 0;
    min-height: 2em;

    & > .cm-theme {
      height: 100%;
    }

    &:focus-within {
      --input-box-shadow: ${$focusRing
        ? focusRingStyle({
            base: color,
            border,
            focusRing: input.text.focusRing,
          })
        : undefined};
    }
  `
})

const basicSetup = {
  highlightActiveLine: false,
}

export function CodeEditor(
  props: CodeEditorProps & Omit<CardProps, '__unstable_focusRing' | 'overflow'>,
): ReactElement {
  const {
    border = true,
    // cursor,
    focusRing = true,
    onChange,
    // onCursorChange,
    onSelectionChange,
    selection,
    value,
    ...restProps
  } = props

  const selectionRef = useRef(selection)

  const rootTheme = useRootTheme()
  const theme = useTheme_v2()

  const editorThemeExtension = useMemo(
    () =>
      getEditorThemeExtension({
        theme: rootTheme.theme.v2!,
        tone: rootTheme.tone,
      }),
    [rootTheme],
  )

  const fontSizeExtension = useMemo(
    () => getFontSizeExtension({fontSize: 1, theme: rootTheme.theme.v2!}),
    [rootTheme],
  )

  const javascriptExtension = useMemo(() => javascript({jsx: true}), [])

  const extensions = useMemo(
    () => [editorThemeExtension, fontSizeExtension, javascriptExtension],
    [editorThemeExtension, fontSizeExtension, javascriptExtension],
  )

  const codeMirrorTheme = useMemo(() => getSyntaxTheme({theme}), [theme])

  const viewRef = useRef<EditorView | null>(null)

  const handleCreateEditor = useCallback((view: EditorView) => {
    viewRef.current = view
  }, [])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (isHotkey(['mod', 's'], event.nativeEvent)) {
        event.preventDefault()

        // eslint-disable-next-line no-inner-declarations
        const run = async () => {
          const anchorResult = await runPrettier({
            code: value,
            cursorOffset: selection.anchor,
          })
          const focusResult = await runPrettier({
            code: value,
            cursorOffset: selection.focus,
          })

          if (anchorResult !== null && focusResult !== null) {
            let newVal = anchorResult.formatted
            let anchorOffset = anchorResult.cursorOffset
            let focusOffset = focusResult.cursorOffset

            if (newVal[0] === ';') {
              newVal = newVal.slice(1)
              anchorOffset -= 1
              focusOffset -= 1
            }

            const sel: CodeEditorSelection = {
              anchor: anchorOffset,
              focus: focusOffset,
            }

            onChange(newVal)
            onSelectionChange(sel)
          }
        }

        run().catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err)
        })
      }
    },
    [onChange, onSelectionChange, selection, value],
  )

  const handleStatistics = useCallback(
    (data: Statistics) => {
      const range = data.selectionAsSingle

      const sel: CodeEditorSelection = {
        anchor: range.anchor,
        focus: range.head,
      }

      selectionRef.current = sel

      onSelectionChange(sel)
    },
    [onSelectionChange],
  )

  useEffect(() => {
    if (JSON.stringify(selection) !== JSON.stringify(selectionRef.current)) {
      const view = viewRef.current

      if (view) {
        view.dispatch({
          selection: {
            anchor: selection.anchor,
            head: selection.focus,
          },
        })
      }

      selectionRef.current = selection
    }
  }, [selection])

  return (
    <EditorContainer {...restProps} $focusRing={focusRing} border={border} overflow="hidden">
      <CodeMirror
        basicSetup={basicSetup}
        extensions={extensions}
        onChange={onChange}
        onCreateEditor={handleCreateEditor}
        onKeyDown={handleKeyDown}
        onStatistics={handleStatistics}
        theme={codeMirrorTheme}
        value={value}
      />
    </EditorContainer>
  )
}
