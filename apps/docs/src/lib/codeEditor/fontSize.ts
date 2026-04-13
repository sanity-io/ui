import {vars} from '@sanity/ui/css'
import {FontCodeSize} from '@sanity/ui/tokens'
import {EditorView, Extension} from '@uiw/react-codemirror'

export function getFontSizeExtension(options: {fontSize: FontCodeSize}): Extension {
  return EditorView.baseTheme({
    '&': {
      fontSize: vars.font.code.scale[options.fontSize].fontSize,
      lineHeight: vars.font.code.scale[options.fontSize].lineHeight,
    },

    '& .cm-scroller': {
      lineHeight: vars.font.code.scale[options.fontSize].lineHeight,
    },
  })
}
