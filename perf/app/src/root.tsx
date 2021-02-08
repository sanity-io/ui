import {studioTheme, Theme, ThemeProvider} from '@sanity/ui'
import React from 'react'
import {hot} from 'react-hot-loader/root'
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

function RootComponent() {
  const themeMode = 'light'

  return (
    <ThemeProvider theme={studioTheme} scheme={themeMode}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  )
}

export const Root = hot(RootComponent)
