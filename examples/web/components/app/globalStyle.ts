import {Theme} from '@sanity/ui'
import {createGlobalStyle, css} from 'styled-components'

export const GlobalStyle = createGlobalStyle((props: {theme: Theme}) => {
  const {theme} = props
  const color = theme.sanity.color.base

  return css`
    @font-face {
      font-family: 'Inter var';
      font-weight: 100 900;
      font-display: swap;
      font-style: normal;
      /* stylelint-disable-next-line */
      font-named-instance: 'Regular';
      src: url('/static/fonts/Inter.var-subset.woff2') format('woff2');
    }

    @font-face {
      font-family: 'Larsseit';
      font-weight: 700;
      font-style: normal;
      font-display: swap;
      src: url('/static/fonts/Larsseit-Bold.woff') format('woff');
    }

    @font-face {
      font-family: 'Roboto Mono';
      font-style: normal;
      font-weight: 500;
      font-display: swap;
      src: local('Roboto Mono Medium'), local('RobotoMono-Medium'),
        url(https://fonts.gstatic.com/s/robotomono/v7/L0xkDF4xlVMF-BfR8bXMIjC4iGqxf7-pAVU_.woff2)
          format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
        U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

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
