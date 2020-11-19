import {ThemeColorSchemeKey, Theme} from '@sanity/ui'
import {createGlobalStyle, css} from 'styled-components'

export const GlobalStyle = createGlobalStyle<{scheme: ThemeColorSchemeKey}>(
  (props: {scheme: ThemeColorSchemeKey; theme: Theme}) => {
    const {scheme, theme} = props
    const color = theme.color[scheme]

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
