import {WorkshopPlugin} from '@sanity/ui-workshop'
import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 100 900;
    font-display: swap;
    src: url('https://rsms.me/inter/font-files/InterVariable.woff2?v=4.0') format('woff2');
    font-named-instance: 'Regular';
  }
  @font-face {
    font-family: 'Inter';
    font-style: italic;
    font-weight: 100 900;
    font-display: swap;
    src: url('https://rsms.me/inter/font-files/InterVariable-Italic.woff2?v=4.0') format('woff2');
    font-named-instance: 'Italic';
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
