import {
  CardProvider,
  ThemeColorSchemeKey,
  LayerProvider,
  studioTheme,
  ThemeProvider,
  ToastProvider,
  usePrefersDark,
} from '@sanity/ui'
import React, {useEffect, useState} from 'react'
import {AppContext} from './context'
import {GlobalStyle} from './globalStyle'
import {AppFeatures} from './types'

export function AppProvider({
  children,
  features,
}: {
  children?: React.ReactNode
  features: AppFeatures
}) {
  const prefersDark = usePrefersDark()
  const [colorScheme, setColorScheme] = useState<ThemeColorSchemeKey>(
    prefersDark ? 'dark' : 'light'
  )

  useEffect(() => setColorScheme(prefersDark ? 'dark' : 'light'), [prefersDark])

  return (
    <ThemeProvider theme={studioTheme}>
      <CardProvider scheme={colorScheme}>
        <GlobalStyle scheme={colorScheme} />
        <AppContext.Provider value={{colorScheme, features, setColorScheme}}>
          <LayerProvider id="root">
            <ToastProvider>{children}</ToastProvider>
          </LayerProvider>
        </AppContext.Provider>
      </CardProvider>
    </ThemeProvider>
  )
}
