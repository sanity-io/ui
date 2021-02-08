import {Card, studioTheme, Text, Theme, ThemeProvider} from '@sanity/ui'
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
  const [render, setRender] = useState(false)

  useEffect(() => setRender(true), [])

  useEffect(() => {
    if (render) {
      console.timeEnd('app')
    } else {
      console.time('app')
    }
  }, [render])

  if (!render) {
    return null
  }

  return (
    <ThemeProvider theme={studioTheme} tone="transparent">
      <GlobalStyle />
      <Card padding={4}>
        <Text data-test="text">App</Text>
      </Card>
    </ThemeProvider>
  )
}
