import {rem} from '@sanity/ui'
import {RootTheme_v2} from '@sanity/ui/theme'
import {EditorView, Extension} from '@uiw/react-codemirror'

export function getFontSizeExtension(options: {theme: RootTheme_v2; fontSize: number}): Extension {
  const {theme, fontSize: fontSizeProp} = options
  const {fontSize, lineHeight} = theme.font.code.sizes[fontSizeProp] || theme.font.code.sizes[2]

  return EditorView.baseTheme({
    '&': {
      fontSize: rem(fontSize),
    },

    '& .cm-scroller': {
      lineHeight: `${lineHeight / fontSize} !important`,
    },
  })
}
