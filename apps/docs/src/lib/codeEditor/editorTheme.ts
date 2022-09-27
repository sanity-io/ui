import {rgba, RootTheme_v2, ThemeColorCardToneKey} from '@sanity/ui/theme'
import {EditorView, Extension} from '@uiw/react-codemirror'

export function getEditorThemeExtension(options: {
  theme: RootTheme_v2
  tone: ThemeColorCardToneKey
}): Extension {
  const {theme, tone} = options

  const dark = theme.color.dark[tone].selectable.default
  const light = theme.color.light[tone].selectable.default

  return EditorView.baseTheme({
    '&.cm-editor': {
      height: '100%',
    },
    '&.cm-editor.cm-focused': {
      outline: 'none',
    },

    // Matching brackets
    '&.cm-editor.cm-focused .cm-matchingBracket': {
      backgroundColor: 'transparent',
    },
    '&.cm-editor.cm-focused .cm-nonmatchingBracket': {
      backgroundColor: 'transparent',
    },
    '&dark.cm-editor.cm-focused .cm-matchingBracket': {
      outline: `1px solid ${dark.enabled.border}`,
    },
    '&dark.cm-editor.cm-focused .cm-nonmatchingBracket': {
      outline: `1px solid ${dark.enabled.border}`,
    },
    '&light.cm-editor.cm-focused .cm-matchingBracket': {
      outline: `1px solid ${light.enabled.border}`,
    },
    '&light.cm-editor.cm-focused .cm-nonmatchingBracket': {
      outline: `1px solid ${light.enabled.border}`,
    },

    // Size and padding of gutter
    '& .cm-lineNumbers .cm-gutterElement': {
      minWidth: `32px !important`,
      padding: `0 8px !important`,
    },
    '& .cm-gutter.cm-foldGutter': {
      width: `0px !important`,
    },

    // Color of gutter
    '&dark .cm-gutters': {
      // backgroundColor: 'transparent',
      color: `${rgba(dark.enabled.code.fg, 0.5)} !important`,
      borderRight: `1px solid ${rgba(dark.enabled.border, 0.5)}`,
    },
    '&light .cm-gutters': {
      // backgroundColor: 'transparent',
      color: `${rgba(light.enabled.code.fg, 0.5)} !important`,
      borderRight: `1px solid ${rgba(light.enabled.border, 0.5)}`,
    },
  })
}
