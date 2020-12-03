import React from 'react'
import {ThemeProvider as StyledThemeProvider} from 'styled-components'
import {ThemeColorSchemeKey, ThemeColorName} from './lib'
import {ThemeContext} from './themeContext'
import {RootTheme, Theme} from './types'

export function ThemeProvider(props: {
  children?: React.ReactNode
  scheme?: ThemeColorSchemeKey
  theme: RootTheme
  tone?: ThemeColorName
}) {
  const {children, scheme = 'light', theme: rootTheme, tone = 'default'} = props
  const {color: rootColor, ...restTheme} = rootTheme
  const colorScheme = rootColor[scheme] || rootColor.light
  const color = colorScheme[tone] || colorScheme.default
  const theme: Theme = {sanity: {...restTheme, color}}

  return (
    <ThemeContext.Provider value={{theme: rootTheme, scheme, tone}}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
