import {getTheme_v2} from '@sanity/ui/theme'
import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle((props) => {
  const {color, font} = getTheme_v2(props.theme)
  const textSize = font.text.sizes[2]

  return {
    'html, body': {
      height: '100%',
    },

    html: {
      font: `100%/${textSize.lineHeight / textSize.fontSize} ${font.text.family}`,
      WebkitTextSizeAdjust: '100%',
      MoxTextSizeAdjust: '100%',
      MsTextSizeAdjust: '100%',
      textSizeAdjust: '100%',
      WebkitTapHighlightColor: 'transparent',
    },

    body: {
      backgroundColor: color.bg,
      color: color.fg,
      colorScheme: color._dark ? 'dark' : 'light',
      margin: 0,
      WebkitFontSmoothing: 'antialiased',
      minWidth: 320,
    },

    a: {
      textDecoration: 'none',
    },
  }
})
