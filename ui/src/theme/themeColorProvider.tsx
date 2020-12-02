import React from 'react'
import {useRootTheme} from './hooks'
import {ThemeColorName, ThemeColorSchemeKey} from './lib'
import {ThemeProvider} from './themeProvider'

interface ThemeColorProviderProps {
  children?: React.ReactNode
  scheme?: ThemeColorSchemeKey
  variant?: ThemeColorName
}

export function ThemeColorProvider(props: ThemeColorProviderProps) {
  const {children, ...restProps} = props
  const theme = useRootTheme()

  return (
    <ThemeProvider {...theme} {...restProps}>
      {children}
    </ThemeProvider>
  )
}
