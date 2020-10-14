import React, {useState} from 'react'
import {AppContext} from './context'

const PREFERS_DARK_MODE =
  typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false

export function AppProvider({children}: {children: React.ReactNode}) {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(PREFERS_DARK_MODE ? 'dark' : 'light')

  return <AppContext.Provider value={{setThemeMode, themeMode}}>{children}</AppContext.Provider>
}
