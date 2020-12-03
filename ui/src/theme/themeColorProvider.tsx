import React from 'react'
import {useRootTheme} from './hooks'
import {ThemeColorName, ThemeColorSchemeKey} from './lib'
import {ThemeProvider} from './themeProvider'

interface ThemeColorProviderProps {
  children?: React.ReactNode
  scheme?: ThemeColorSchemeKey
  tone?: ThemeColorName
}

export function ThemeColorProvider(props: ThemeColorProviderProps) {
  const {children, scheme, tone} = props
  const root = useRootTheme()

  return (
    <ThemeProvider scheme={scheme || root.scheme} theme={root.theme} tone={tone}>
      {children}
    </ThemeProvider>
  )
}
