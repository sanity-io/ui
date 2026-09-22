import {createContext, useContext} from 'react'

import {BuildThemeOptions} from '../theme/options'
import {ThemerTheme} from './themes'

/**
 * The flow the sidebar is in: picking a theme from the list, editing one of
 * the user's own themes, or restoring removed ones.
 *
 * @internal
 */
export type ThemerView =
  | {name: 'list'}
  | {
      name: 'edit'
      slug: string
      /** Whether the title input should take focus, for themes that were just created */
      focusTitle?: boolean
    }
  | {name: 'removed'}

/** @internal */
export interface ThemerContextValue {
  /** The theme options the Studio's configured theme was generated from */
  baseOptions: BuildThemeOptions
  /** The themes to pick from, in list order */
  themes: ThemerTheme[]
  /** The removed themes, which can be restored */
  removed: ThemerTheme[]
  /** The applied theme */
  active: ThemerTheme
  view: ThemerView
  setView: (view: ThemerView) => void
  /** Whether the themer sidebar is open */
  open: boolean
  setOpen: (open: boolean) => void
  /** Applies a theme to the whole Studio */
  pick: (slug: string) => void
  /** Adds a new theme based on the applied one, and opens it in the editor */
  addTheme: () => void
  /** Adds a copy of a theme, and opens it in the editor */
  duplicateTheme: (slug: string) => void
  /** Opens one of the user's own themes in the editor */
  editTheme: (slug: string) => void
  updateTheme: (slug: string, changes: {title?: string; options?: BuildThemeOptions}) => void
  /** Takes a theme out of the list — it can be restored until it is deleted */
  removeTheme: (slug: string) => void
  /** Puts a removed theme back in the list */
  restoreTheme: (slug: string) => void
  /** Deletes one of the user's own themes for good */
  deleteTheme: (slug: string) => void
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
