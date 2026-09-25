import {createContext, useContext} from 'react'

import {BuildThemeOptions} from '../theme/options'
import {ThemerEvent} from './machine'
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
      focusTitle: boolean
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
  /** Object URLs of the images themes took their palette from this session, by slug */
  images: Record<string, string>
  view: ThemerView
  /** Whether the themer sidebar is open */
  open: boolean
  /** Whether the Studio shows twice side by side, in light and dark */
  split: boolean
  /** Whether the Studio is on a small screen, where the sidebar covers it and the split preview stacks */
  mobile: boolean
  /** The height of the Studio navbar, which the sidebar's header matches — `null` until it has rendered */
  navbarHeight: number | null
  /** Sends an event to the themer machine */
  send: (event: ThemerEvent) => void
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
