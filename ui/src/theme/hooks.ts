import {useContext} from 'react'
import {useTheme as useStyledTheme} from 'styled-components'
import {ThemeContext} from './themeContext'

import {Theme} from './types'

export function useTheme(): Theme {
  return useStyledTheme() as Theme
}

export function useRootTheme() {
  const rootTheme = useContext(ThemeContext)

  if (!rootTheme) {
    throw new Error('useRootTheme(): missing context value')
  }

  return rootTheme
}
