import {useContext} from 'react'
import {ThemeContext} from './themeContext'
import {ThemeContextValue} from './types'

/**
 * @public
 */
export function useRootTheme(): ThemeContextValue {
  const value = useContext(ThemeContext)

  if (!value) {
    throw new Error('useRootTheme(): missing context value')
  }

  return value as unknown as ThemeContextValue
}
