import {vars} from '@sanity/ui/css'
import {EditorView, Extension} from '@uiw/react-codemirror'

export function getEditorThemeExtension(): Extension {
  return EditorView.baseTheme({
    '&.cm-editor': {
      height: '100%',
    },
    '&.cm-editor.cm-focused': {
      outline: 'none',
    },

    '& .cm-selectionLayer': {
      // width: '100%',
      // height: '100%',
      // outline: '1px solid red',
      // outlineOffset: '-1px',
    },

    // Selection background color
    '&.cm-editor.cm-focused .cm-selectionLayer .cm-selectionBackground': {
      backgroundColor: '#074',
    },

    // Matching brackets
    '&.cm-editor.cm-focused .cm-matchingBracket': {
      backgroundColor: 'transparent',
      outline: `1px solid ${vars.color.border}`,
    },
    '&.cm-editor.cm-focused .cm-nonmatchingBracket': {
      backgroundColor: 'transparent',
      outline: `1px solid ${vars.color.border}`,
    },

    // Size and padding of gutter
    '&.cm-editor .cm-lineNumbers .cm-gutterElement': {
      minWidth: `32px !important`,
      padding: `0 8px !important`,
    },
    '&.cm-editor .cm-gutter.cm-foldGutter': {
      width: `0px !important`,
    },

    // Color of gutter
    '&.cm-editor .cm-gutters': {
      color: `color-mix(in oklab, transparent, ${vars.color.tinted.default.fg[2]} 50%) !important`,
      borderRight: `1px solid color-mix(in oklab, transparent, ${vars.color.border} 50%)`,
    },
  })
}
