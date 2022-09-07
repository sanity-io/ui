import {studioTheme, ThemeProvider} from '@sanity/ui'
import {useState} from 'react'
import {App, AppContext, GlobalStyle} from './app'
import {LocationProvider} from './lib/location'

export function Root() {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light')

  return (
    <LocationProvider>
      <AppContext.Provider value={{setThemeMode, themeMode}}>
        <ThemeProvider theme={studioTheme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </AppContext.Provider>
    </LocationProvider>
  )
}
