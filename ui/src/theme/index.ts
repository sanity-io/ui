import {ThemeProvider, useTheme as useStyledTheme} from 'styled-components'
import {Theme} from './types'

export * from './studioTheme'
export * from './types'

export function useTheme(): Theme {
  return useStyledTheme() as Theme
}

export {ThemeProvider}
