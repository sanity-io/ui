import {ThemeColorName, ThemeColorSchemeKey} from './types'
import {ThemeProvider} from './themeProvider'
import {useRootTheme} from './useRootTheme'

/**
 * @public
 */
export interface ThemeColorProviderProps {
  children?: React.ReactNode
  scheme?: ThemeColorSchemeKey
  tone?: ThemeColorName
}

/**
 * @public
 */
export function ThemeColorProvider(props: ThemeColorProviderProps): React.ReactElement {
  const {children, scheme, tone} = props
  const root = useRootTheme()

  return (
    <ThemeProvider scheme={scheme || root.scheme} theme={root.theme} tone={tone}>
      {children}
    </ThemeProvider>
  )
}
