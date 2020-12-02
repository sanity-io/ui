import {Theme} from '@sanity/ui'
import {createGlobalStyle, css} from 'styled-components'

export const GlobalStyle = createGlobalStyle((props: {theme: Theme}) => {
  const {theme} = props
  const color = theme.sanity.color.base

  return css`
    html,
    body,
    #__next {
      height: 100%;
    }

    body {
      background-color: ${color.bg};
      color: ${color.fg};
      -webkit-font-smoothing: antialiased;
      margin: 0;
    }
  `
})
