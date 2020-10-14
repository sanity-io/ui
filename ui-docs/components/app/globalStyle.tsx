import {Theme} from '@sanity/ui'
import {createGlobalStyle, css} from 'styled-components'

export const GlobalStyle = createGlobalStyle<{themeMode: 'dark' | 'light'}>(
  (props: {theme: Theme; themeMode: 'dark' | 'light'}) => {
    const {theme, themeMode} = props
    const color = theme.color[themeMode]

    return css`
      html,
      body,
      #__next {
        height: 100%;
      }

      body {
        background-color: ${color.card.tones.transparent.enabled.bg};
        color: ${color.card.tones.transparent.enabled.fg};
        -webkit-font-smoothing: antialiased;
        margin: 0;
      }
    `
  }
)
