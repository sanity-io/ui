import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 100 900;
    font-display: swap;
    src: url('https://rsms.me/inter/font-files/Inter-roman.var.woff2?v=3.19') format('woff2');
    font-named-instance: 'Regular';
  }

  @font-face {
    font-family: 'Inter';
    font-style: italic;
    font-weight: 100 900;
    font-display: swap;
    src: url('https://rsms.me/inter/font-files/Inter-italic.var.woff2?v=3.19') format('woff2');
    font-named-instance: 'Italic';
  }

  body {
    background-color: ${({theme}) => theme.sanity.color.base.bg};
  }
`
