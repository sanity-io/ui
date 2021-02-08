import {Card, studioTheme, Text, TextInput, Theme, ThemeProvider} from '@sanity/ui'
import React, {useEffect, useState} from 'react'
import {createGlobalStyle, css} from 'styled-components'

export const GlobalStyle = createGlobalStyle(({theme}: {theme: Theme}) => {
  const {base} = theme.sanity.color

  return css`
    html,
    body,
    #root {
      height: 100%;
    }

    body {
      -webkit-font-smoothing: antialiased;
      background-color: ${base.bg};
      color: ${base.fg};
      margin: 0;
    }
  `
})

export function App() {
  const [path, setPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname
    }

    return '/'
  })

  useEffect(() => {
    window.addEventListener('popstate', () => {
      setPath(window.location.pathname)
    })
  }, [])

  return (
    <ThemeProvider theme={studioTheme} tone="transparent">
      <GlobalStyle />
      <Card padding={4}>
        {path === '/' && <Text data-test="text">App</Text>}
        {path === '/text-input' && <TextInput data-test="text-input" />}
      </Card>
    </ThemeProvider>
  )
}
