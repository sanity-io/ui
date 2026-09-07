import {useContext, useMemo} from 'react'
import {ThemeProvider as StyledThemeProvider} from 'styled-components'

import {getScopedTheme} from '../../theme/getScopedTheme'
import {
  type ThemeColorCardToneKey,
  type ThemeColorSchemeKey,
} from '../../theme/system/color/_system'
import {type RootTheme, type Theme} from '../../theme/system/theme'
import {ThemeContext} from './themeContext'
import {ThemeContextValue} from './types'

/**
 * @public
 */
export interface ThemeProviderProps {
  children?: React.ReactNode
  scheme?: ThemeColorSchemeKey
  theme?: RootTheme
  tone?: ThemeColorCardToneKey
}

/**
 * @public
 */
export function ThemeProvider(props: ThemeProviderProps): React.JSX.Element {
  const parentTheme = useContext(ThemeContext)
  const {children} = props
  const scheme = props.scheme ?? (parentTheme?.scheme || 'light')
  const rootTheme = props.theme ?? (parentTheme?.theme || null)
  const tone = props.tone ?? (parentTheme?.tone || 'default')

  const themeContext: ThemeContextValue | null = useMemo(() => {
    if (!rootTheme) return null

    return {
      version: 0.0,
      theme: rootTheme,
      scheme,
      tone,
    }
  }, [rootTheme, scheme, tone])

  const theme: Theme | null = useMemo(() => {
    if (!rootTheme) return null

    return getScopedTheme(rootTheme, scheme, tone)
  }, [scheme, rootTheme, tone])

  if (!theme) {
    return <pre>ThemeProvider: no "theme" property provided</pre>
  }

  return (
    <ThemeContext.Provider value={themeContext}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
