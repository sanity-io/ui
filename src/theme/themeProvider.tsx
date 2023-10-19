import {useContext, useMemo} from 'react'
import {ThemeProvider as StyledThemeProvider, createGlobalStyle} from 'styled-components'
import {DEFAULT_THEME_LAYER} from './defaults'
import {ThemeColorName, ThemeColorSchemeKey} from './lib/theme'
import {legacyColors} from './lib/theme/color/_legacy/legacyColor'
import {createCssVars} from './lib/theme/color/cssVariables'
import {cssObjectToCssString} from './lib/theme/color/cssVariables/utils'
import {ThemeContext} from './themeContext'
import {ToneProvider} from './toneContext/toneProvider'
import {RootTheme, Theme, ThemeContextValue} from './types'

const GlobalVariables = createGlobalStyle<{$vars?: string}>`
  :root {
    ${({$vars}) => $vars}
  }
`

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

    return {sanity: {...restTheme, layer, color: {...legacyColors, tones: restTheme.color.tones}}}
  }, [themeProp])

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

  const cssVariables = useMemo(() => {
    if (!themeProp?.color.tones) return

    return cssObjectToCssString(createCssVars(scheme, themeProp?.color.tones))
  }, [scheme, themeProp?.color.tones])

  if (!theme) {
    return <pre>ThemeProvider: no "theme" property provided</pre>
  }

  return (
    <ThemeContext.Provider value={value}>
      <GlobalVariables $vars={cssVariables} />
      <StyledThemeProvider theme={theme}>
        <ToneProvider tone={tone} scheme={scheme}>
          {children}
        </ToneProvider>
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
