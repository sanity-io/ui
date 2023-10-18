import {useMemo} from 'react'
import {ThemeColorName, ThemeColorSchemeKey, useRootTheme} from '..'
import {ToneContext} from './toneContext'
import {ToneContextValue} from './types'

/**
 * @public
 */
export interface ToneProviderProps {
  children?: React.ReactNode
  scheme?: ThemeColorSchemeKey
  tone: ThemeColorName
}

/**
 * @public
 */
export function ToneProvider(props: ToneProviderProps): React.ReactElement {
  const {children, scheme, tone} = props
  const root = useRootTheme()
  const value: ToneContextValue = useMemo(
    () => ({
      version: 0.0,
      scheme: scheme || root.scheme,
      tone,
    }),
    [root.scheme, scheme, tone],
  )

  return <ToneContext.Provider value={value}>{children}</ToneContext.Provider>
}
