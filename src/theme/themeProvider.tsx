import {useContext, useEffect, useMemo} from 'react'
import {ThemeProvider as StyledThemeProvider} from 'styled-components'
import {DEFAULT_THEME_LAYER} from './defaults'
import {ThemeColorSchemeKey, ThemeColorName} from './lib/theme'
import {createVars} from './lib/theme/color/cssVars'
import {ThemeContext} from './themeContext'
import {RootTheme, Theme, ThemeContextValue} from './types'

/**
 * @public
 */
export interface ThemeProviderProps {
  children?: React.ReactNode
  scheme?: ThemeColorSchemeKey
  theme?: RootTheme
  tone?: ThemeColorName
}

/**
 * @public
 */
export function ThemeProvider(props: ThemeProviderProps): React.ReactElement {
  const parentTheme = useContext(ThemeContext)
  const {
    children,
    scheme = parentTheme?.scheme || 'light',
    theme: themeProp = parentTheme?.theme || null,
    tone = parentTheme?.tone || 'default',
  } = props

  const theme: Theme | null = useMemo(() => {
    if (!themeProp) return null

    const {color: rootColor, layer: rootLayer, ...restTheme} = themeProp
    const colorScheme = rootColor[scheme] || rootColor.light
    const color = colorScheme[tone] || colorScheme.default
    const layer = rootLayer || DEFAULT_THEME_LAYER

    return {sanity: {...restTheme, color, layer}, tones: themeProp?.color.tones, scheme: scheme}
  }, [scheme, themeProp, tone])

  useEffect(() => {
    if (!themeProp?.color.tones) return
    const cssVariables = createVars(scheme, themeProp?.color.tones)

    // Add the vars to the body
    const root = document.body

    cssVariables.forEach((varDef) => root.style.setProperty(varDef.name, varDef.value))

    // darkVars.forEach((varDef) => root.style.setProperty(varDef.name, varDef.value))
  }, [themeProp?.color.tones, scheme])

  const value: ThemeContextValue | null = useMemo(
    () =>
      themeProp && {
        version: 0.0,
        theme: themeProp,
        scheme,
        tone,
      },
    [themeProp, scheme, tone],
  )
  // Add vars to the body

  if (!theme) {
    return <pre>ThemeProvider: no "theme" property provided</pre>
  }

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
