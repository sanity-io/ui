import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  html,
  body,
  #__next {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
    margin: 0;
  }
`
