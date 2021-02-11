import React from 'react'
import {ThemeColorName, ThemeColorSchemeKey} from './lib/theme'
import {ThemeProvider} from './themeProvider'
import {useRootTheme} from './useRootTheme'

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
