import {
  CardProvider,
  ColorSchemeKey,
  LayerProvider,
  studioTheme,
  ThemeProvider,
  usePrefersDark,
} from '@sanity/ui'
import React, {useEffect, useState} from 'react'
import {AppContext} from './context'
import {GlobalStyle} from './globalStyle'

export function AppProvider({children}: {children?: React.ReactNode}) {
  const prefersDark = usePrefersDark()
  const [colorScheme, setColorScheme] = useState<ColorSchemeKey>(prefersDark ? 'dark' : 'light')

  useEffect(() => setColorScheme(prefersDark ? 'dark' : 'light'), [prefersDark])

  return (
    <ThemeProvider theme={studioTheme}>
      <CardProvider scheme={colorScheme}>
        <GlobalStyle scheme={colorScheme} />
        <AppContext.Provider value={{colorScheme, setColorScheme}}>
          <LayerProvider id="root">{children}</LayerProvider>
        </AppContext.Provider>
      </CardProvider>
    </ThemeProvider>
  )
}
