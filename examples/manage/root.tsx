import {CardProvider, studioTheme, ThemeProvider} from '@sanity/ui'
import React, {useState} from 'react'
import {hot} from 'react-hot-loader/root'
import {App, AppContext, GlobalStyle} from './app'
import {LocationProvider} from './lib/location'

function RootComponent() {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light')

  return (
    <LocationProvider>
      <AppContext.Provider value={{setThemeMode, themeMode}}>
        <CardProvider scheme={themeMode}>
          <ThemeProvider theme={studioTheme}>
            <GlobalStyle mode={themeMode} />
            <App />
          </ThemeProvider>
        </CardProvider>
      </AppContext.Provider>
    </LocationProvider>
  )
}

export const Root = hot(RootComponent)
