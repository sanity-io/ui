import {createContext, useContext} from 'react'

import {CreateThemeOptions} from '../types'

/** @internal */
export interface ThemerContextValue {
  /** The colors the Studio's configured theme was generated from */
  baseColors: CreateThemeOptions
  /** The draft colors, or `null` when the configured theme is untouched */
  colors: CreateThemeOptions | null
  setColors: (colors: CreateThemeOptions | null) => void
  /** Whether the themer sidebar is open */
  open: boolean
  setOpen: (open: boolean) => void
}

/** @internal */
export const ThemerContext = createContext<ThemerContextValue | null>(null)

/** @internal */
export function useThemer(): ThemerContextValue {
  const context = useContext(ThemerContext)

  if (!context) {
    throw new Error('useThemer must be used within the `themerTool` plugin')
  }

  return context
}
