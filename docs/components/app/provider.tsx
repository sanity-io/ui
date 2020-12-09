import {
  LayerProvider,
  studioTheme,
  ThemeColorSchemeKey,
  ThemeProvider,
  ToastProvider,
  usePrefersDark,
} from '@sanity/ui'
import React, {useEffect, useState} from 'react'
import {AppContext} from './context'
import {GlobalStyle} from './globalStyle'
import {AppFeatures} from './types'

export function AppProvider(props: {
  children?: React.ReactNode
  features: AppFeatures
  nav: any
  node: any
  target: any
}) {
  const {children, features, nav, node, target} = props
  const prefersDark = usePrefersDark()
  const [colorScheme, setColorScheme] = useState<ThemeColorSchemeKey>(
    prefersDark ? 'dark' : 'light'
  )

  useEffect(() => setColorScheme(prefersDark ? 'dark' : 'light'), [prefersDark])

  return (
    <ThemeProvider scheme={colorScheme} theme={studioTheme}>
      <GlobalStyle />
      <AppContext.Provider value={{colorScheme, features, nav, node, setColorScheme, target}}>
        <LayerProvider>
          <ToastProvider>{children}</ToastProvider>
        </LayerProvider>
      </AppContext.Provider>
    </ThemeProvider>
  )
}
