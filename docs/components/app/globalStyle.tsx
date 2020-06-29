import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  html,
  body,
  #__next {
    height: 100%;
  }

  html {
    font: 100%/1.25 -apple-system, BlinkMacSystemFont, sans-serif;
  }

  body {
    margin: 0;
  }

  #__next {
    -webkit-font-smoothing: antialiased;
  }
`
