import {createContext, useContext} from 'react'

import {BuildThemeOptions} from '../theme/options'

/** @internal */
export interface ThemerContextValue {
  /** The theme options the Studio's configured theme was generated from */
  baseOptions: BuildThemeOptions
  /** The draft options, or `null` when the configured theme is untouched */
  options: BuildThemeOptions | null
  setOptions: (options: BuildThemeOptions | null) => void
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
