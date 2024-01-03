import {WorkshopPlugin} from '@sanity/ui-workshop'
import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 100 900;
    font-display: swap;
    src: url('https://studio-static.sanity.io/InterVariable.ttf') format('ttf');
    font-named-instance: 'Regular';
  }
  @font-face {
    font-family: 'Inter';
    font-style: italic;
    font-weight: 100 900;
    font-display: swap;
    src: url('https://studio-static.sanity.io/InterVariable-Italic.ttf') format('ttf');
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
