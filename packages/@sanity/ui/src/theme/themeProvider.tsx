import React, {useMemo} from 'react'
import {ThemeProvider as StyledThemeProvider} from 'styled-components'
import {DEFAULT_THEME_LAYER} from './defaults'
import {ThemeColorSchemeKey, ThemeColorName} from './lib/theme'
import {ThemeContext} from './themeContext'
import {RootTheme, Theme, ThemeContextValue} from './types'

/**
 * @public
 */
export interface ThemeProviderProps {
  children?: React.ReactNode
  scheme?: ThemeColorSchemeKey
  theme: RootTheme
  tone?: ThemeColorName
}

/**
 * @public
 */
export function ThemeProvider(props: ThemeProviderProps): React.ReactElement {
  const {children, scheme = 'light', theme: rootTheme, tone = 'default'} = props

  const theme: Theme = useMemo(() => {
    const {color: rootColor, layer: rootLayer, ...restTheme} = rootTheme
    const colorScheme = rootColor[scheme] || rootColor.light
    const color = colorScheme[tone] || colorScheme.default
    const layer = rootLayer || DEFAULT_THEME_LAYER

    return {sanity: {...restTheme, color, layer}}
  }, [rootTheme, scheme, tone])

  const value: ThemeContextValue = useMemo(
    () => ({
      version: 0.0,
      theme: rootTheme,
      scheme,
      tone,
    }),
    [rootTheme, scheme, tone]
  )

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
