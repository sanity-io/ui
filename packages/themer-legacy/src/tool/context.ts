import {createContext, useContext} from 'react'

import {Hues} from '../generator/types'

/**
 * How the Studio preview is laid out: the Studio once, following its own
 * appearance setting, or twice side by side in light and dark.
 *
 * @internal
 */
export type ThemerView = 'single' | 'split'

/** @internal */
export interface ThemerContextValue {
  /** The draft hues, or `null` when the configured theme is untouched */
  hues: Hues | null
  setHues: (hues: Hues | null) => void
  view: ThemerView
  setView: (view: ThemerView) => void
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
