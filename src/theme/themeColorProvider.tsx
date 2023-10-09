import {ThemeColorName, ThemeColorSchemeKey} from './lib/theme'
import {ThemeProvider} from './themeProvider'
import {useRootTheme} from './useRootTheme'

/**
 * @public
 * @deprecated
 */
export interface ThemeColorProviderProps {
  children?: React.ReactNode
  scheme?: ThemeColorSchemeKey
  tone?: ThemeColorName
}

/**
 * @public
 * @deprecated Use `toneContext` instead.
 */
export function ThemeColorProvider(props: ThemeColorProviderProps): React.ReactElement {
  const {children, scheme, tone} = props
  const root = useRootTheme()

  return (
    <ThemeProvider scheme={scheme || root.scheme} tone={tone}>
      {children}
    </ThemeProvider>
  )
}
