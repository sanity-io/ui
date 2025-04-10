import {ThemeColorCardToneKey, ThemeColorSchemeKey} from '@sanity/ui/theme'
import {ReactElement, ReactNode} from 'react'

import {ThemeProvider} from './themeProvider'
import {useRootTheme} from './useRootTheme'

/**
 * @public
 */
export interface ThemeColorProviderProps {
  children?: ReactNode
  scheme?: ThemeColorSchemeKey
  tone?: ThemeColorCardToneKey
}

/**
 * @public
 */
export function ThemeColorProvider(props: ThemeColorProviderProps): ReactElement {
  const {children, scheme, tone} = props
  const root = useRootTheme()

  return (
    <ThemeProvider scheme={scheme || root.scheme} theme={root.theme} tone={tone}>
      {children}
    </ThemeProvider>
  )
}

ThemeColorProvider.displayName = 'ThemeColorProvider'
