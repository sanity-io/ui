import {ThemeProvider} from '@sanity/ui'
import React from 'react'
import {GlobalStyle} from './globalStyle'
import {sanityTheme} from '$theme'

export function AppProvider({children}: {children: React.ReactNode}) {
  return (
    <ThemeProvider theme={sanityTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  )
}
