import {useContext, useEffect, useMemo} from 'react'
import {ThemeProvider as StyledThemeProvider} from 'styled-components'
import {DEFAULT_THEME_LAYER} from './defaults'
import {ThemeColorSchemeKey, ThemeColorName} from './lib/theme'
import {createCssVars} from './lib/theme/color/cssVariables'
import {ThemeContext} from './themeContext'
import {ToneProvider} from './toneContext/toneProvider'
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

    const {layer: rootLayer, ...restTheme} = themeProp

    const layer = rootLayer || DEFAULT_THEME_LAYER

    return {sanity: {...restTheme, layer}, tones: themeProp?.color.tones, scheme: scheme}
  }, [scheme, themeProp])

  useEffect(() => {
    if (!themeProp?.color.tones) return
    const cssVariables = createCssVars(scheme, themeProp?.color.tones)

    // Add the vars to the body
    const root = document.body

    // Set the css variables to the root object TODO: Can this be done in a more performant way?
    Object.keys(cssVariables).forEach((key) => root.style.setProperty(key, cssVariables[key]))
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

  if (!theme) {
    return <pre>ThemeProvider: no "theme" property provided</pre>
  }

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={theme}>
        <ToneProvider tone={tone} scheme={scheme}>
          {children}
        </ToneProvider>
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
