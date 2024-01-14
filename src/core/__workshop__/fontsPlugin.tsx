import {WorkshopPlugin} from '@sanity/ui-workshop'
import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: Inter;
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('https://studio-static.sanity.io/Inter-Regular.woff2') format('woff2');
  }
  @font-face {
    font-family: Inter;
    font-style: italic;
    font-weight: 400;
    font-display: swap;
    src: url('https://studio-static.sanity.io/Inter-Italic.woff2') format('woff2');
  }
  @font-face {
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url('https://studio-static.sanity.io/Inter-Medium.woff2') format('woff2');
  }
  @font-face {
    font-family: Inter;
    font-style: italic;
    font-weight: 500;
    font-display: swap;
    src: url('https://studio-static.sanity.io/Inter-MediumItalic.woff2') format('woff2');
  }
  @font-face {
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url('https://studio-static.sanity.io/Inter-SemiBold.woff2') format('woff2');
  }
  @font-face {
    font-family: Inter;
    font-style: italic;
    font-weight: 600;
    font-display: swap;
    src: url('https://studio-static.sanity.io/Inter-SemiBoldItalic.woff2') format('woff2');
  }
  @font-face {
    font-family: Inter;
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url('https://studio-static.sanity.io/Inter-Bold.woff2') format('woff2');
  }
  @font-face {
    font-family: Inter;
    font-style: italic;
    font-weight: 700;
    font-display: swap;
    src: url('https://studio-static.sanity.io/Inter-BoldItalic.woff2') format('woff2');
  }
`

export function fontsPlugin(): WorkshopPlugin {
  return {
    name: 'fonts',
    title: 'Fonts',
    provider: function FontsProvider({children}) {
      return (
        <>
          <GlobalStyle />
          {children}
        </>
      )
    },
  }
}
