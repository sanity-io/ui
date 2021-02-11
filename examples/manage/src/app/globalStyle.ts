import {Theme} from '@sanity/ui'
import {createGlobalStyle, css} from 'styled-components'

export const GlobalStyle = createGlobalStyle(({theme}: {theme: Theme}) => {
  const color = theme.sanity.color.base

  return css`
    html,
    body,
    #root {
      height: 100%;
    }

    body {
      -webkit-font-smoothing: antialiased;
      background-color: ${color.bg};
      color: ${color.fg};
      margin: 0;
    }
  `
})
