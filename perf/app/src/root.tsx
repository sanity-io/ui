import {studioTheme, Theme, ThemeProvider} from '@sanity/ui'
import React from 'react'
import {createGlobalStyle, css} from 'styled-components'
import {App} from './app'

const GlobalStyle = createGlobalStyle(({theme}: {theme: Theme}) => {
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

export function Root() {
  const themeMode = 'light'

  return (
    <ThemeProvider theme={studioTheme} scheme={themeMode}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  )
}
