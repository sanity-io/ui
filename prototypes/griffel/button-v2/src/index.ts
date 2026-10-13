// Everything here is client-only, like `@griffel/react` itself (`makeStyles`
// returns hooks). This is the same boundary styled-components imposes today.
'use client'

export {Button, BUTTON_VERSION, type ButtonProps} from './Button'
export {
  buttonModes,
  type ButtonMode,
  type ButtonTone,
  buttonTones,
  createThemeVars,
  darkTheme,
  defaultTheme,
  type Theme,
  type TokenName,
  tokens,
  type ToneColors,
} from './theme'
export {ThemeProvider, type ThemeProviderProps} from './ThemeProvider'
// Re-exported so a consumer can merge its own Griffel classes with the
// component's without depending on @griffel/react directly.
export {mergeClasses} from '@griffel/react'
