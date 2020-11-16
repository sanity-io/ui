import {CardProvider, ThemeProvider} from '@sanity/ui'
import React from 'react'
import {GlobalStyle} from './globalStyle'
import {sanityTheme} from '$theme'

export function AppProvider({children}: {children: React.ReactNode}) {
  const colorScheme = 'light'

  return (
    <ThemeProvider theme={sanityTheme}>
      <GlobalStyle scheme={colorScheme} />
      <CardProvider scheme={colorScheme}>{children}</CardProvider>
    </ThemeProvider>
  )
}
