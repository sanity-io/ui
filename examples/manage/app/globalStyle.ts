// import {Theme} from '@sanity/ui'
import {createGlobalStyle, css} from 'styled-components'

export const GlobalStyle = createGlobalStyle<{mode: 'light' | 'dark'}>(
  ({mode, theme}: {mode: 'light' | 'dark'; theme: any}) => {
    const tone = theme.color[mode].card.tones.transparent

    return css`
      html,
      body,
      #root {
        height: 100%;
      }

      body {
        -webkit-font-smoothing: antialiased;
        background-color: ${tone.bg};
        color: ${tone.fg};
        margin: 0;
      }
    `
  }
)
